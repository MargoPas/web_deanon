import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PeopleModule } from '../src/people/people.module';
import { VoteModule } from './vote/vote.module';
import * as Joi from 'joi';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from './file/file.module';
import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'Photo'),
    }),
    TypeOrmModule.forRoot(),
    PeopleModule,
    VoteModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.number().default(3600),
      }),
    }),
    FileModule,
  ],
})
export class AppModule {}
