import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { PeopleModule } from '../src/people/people.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    PeopleModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.number().default(3600),
      }),
    }),
  ],
})
export class AppModule {}
