import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/user.service';
import { AuthDtoRefresh, LoginDto, RegisterDto } from './dto/auth.dto';
import {
  AccessTokenResponseDto,
  AccessAndRefreshTokenResponseDto,
  AuthRefreshResponseDto,
  AuthResponseDto,
} from './dto/auth-response.dto';

// auth.service.ts

const ACCESS_TOKEN_SECRET = 'dev-secret-key';
const REFRESH_TOKEN_SECRET = 'dev-refresh-secret-key';

const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '24h';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // הרשמה לאתר
  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const user = await this.usersService.createUser(registerDto);

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const tokens = await this.generateTokens(safeUser);

    return {
      user: safeUser,
      ...tokens,
    };
  }

  // התחברות לאתר
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findUserByEmailWithPassword(
      loginDto.email,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const tokens = await this.generateTokens(safeUser);

    return {
      user: safeUser,
      ...tokens,
    };
  }

  // יצירת accessToken + refreshToken אחרי login/register
  private async generateTokens(user: AuthDtoRefresh): Promise<AccessAndRefreshTokenResponseDto> {
    const payload = this.createJwtPayload(user);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: ACCESS_TOKEN_SECRET,
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      }),

      this.jwtService.signAsync(payload, {
        secret: REFRESH_TOKEN_SECRET,
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  // יצירת accessToken בלבד אחרי refresh
  private async generateAccessToken(user: AuthDtoRefresh): Promise<AccessTokenResponseDto> {
    const payload = this.createJwtPayload(user);

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: ACCESS_TOKEN_SECRET,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    return { accessToken };
  }

  // חידוש accessToken לפי refreshToken תקין
  async refresh(user: AuthDtoRefresh): Promise<AuthRefreshResponseDto> {
    const { accessToken } = await this.generateAccessToken(user);

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  // יצירת payload אחיד ל-JWT
  private createJwtPayload(user: AuthDtoRefresh): {
    sub: number;
    email: string;
    name: string;
  } {
    return {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
  }
}