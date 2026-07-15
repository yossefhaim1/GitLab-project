import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// jwt-auth.guard.ts
@Injectable()
// JwtAuthGuard הוא מחלקה שמרחיבה את AuthGuard של Passport ומגדירה את האסטרטגיה של JWT (json web token) לאימות משתמשים.
export class JwtAuthGuard extends AuthGuard('jwt') {}
// אני משתמש במחלקה הזאת כ-Guard בכל מקום שבו אני רוצה להגן על Route עם JWT.
// // לפני הקריאה ל CONTROLLER אני אצטרך להוסיף את ה GUARD הזה כדי לאמת את המשתמש.