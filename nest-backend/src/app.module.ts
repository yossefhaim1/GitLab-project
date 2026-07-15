import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssigneeModule } from './assignee/assignee.module';
import { BoardsModule } from './boards/boards.module';
import { ColumnsModule } from './columns/columns.module';
import { ItemsModule } from './items/items.module';
import { ItemTagModule } from './Item_tag/item-tag.module';
import { TagsModule } from './tags/tags.module';
import { PrioritiesModule } from './priorities/priority.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // לא מומלץ בסביבת ייצור, רק לפיתוח
    }),
    AssigneeModule,
    BoardsModule,
    ColumnsModule,
    ItemsModule,
    ItemTagModule,
    TagsModule,
    PrioritiesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
