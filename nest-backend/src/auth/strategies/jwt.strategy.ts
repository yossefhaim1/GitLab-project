import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../Type.nestJs';

// jwt.strategy.ts
// הדף הזה מכיל את האסטרטגיה של JWT (json web token) לאימות משתמשים. 
// הדף מגדיר את האסטרטגיה של JWT באמצעות ספריית Passport
// ספריית Passport היא ספרייה פופולרית לניהול אימות משתמשים ביישומי Node.js
// מספק פונקציה validate שמאמתת את הטוקן ומחזירה את המידע של המשתמש אם הוא תקין.
@Injectable()
  // PassportStrategy הוא מחלקה שמספקת את הפונקציונליות של Passport.
  // מקבלת שני פרמטרים 1 זה Strategy שמייצג את האסטרטגיה של JWT, 2 זה שם האסטרטגיה
  // Strategy היא מחלקה שמספקת את הפונקציונליות של JWT.
  export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      // מגדיר את האופציה jwtFromRequest כדי להגדיר מאיפה נשלף הטוקן מהבקשה. במקרה זה, הטוקן נשלף מהכותרת Authorization של הבקשה.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        // מגדיר את האופציה ignoreExpiration כ-false כדי שהטוקן ייחשב כלא תקין אם הוא פג תוקף
      ignoreExpiration: false,
        // מגדיר את המפתח הסודי שבו נשתמש לאימות הטוקן
      secretOrKey: 'dev-secret-key',
    });
  }
  // פונקציה זו מאמתת את הטוקן ומחזירה את המידע של המשתמש אם הוא תקין.
  validate(payload: JwtPayload) {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}