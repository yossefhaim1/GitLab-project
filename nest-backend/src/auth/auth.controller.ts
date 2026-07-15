import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';
import { AuthDtoRefresh, LoginDto, RegisterDto } from './dto/auth.dto';
import {
  AuthRefreshResponseDto,
  AuthResponseDto,
} from './dto/auth-response.dto';

// auth.controller.ts

type RequestWithUser = {
  user: AuthDtoRefresh;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // הרשמה
  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  // התחברות
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  // חידוש accessToken בעזרת refreshToken
  @Post('refresh')
  @UseGuards(RefreshJwtAuthGuard)
  refresh(@Req() req: RequestWithUser): Promise<AuthRefreshResponseDto> {
    return this.authService.refresh(req.user);
  }
}