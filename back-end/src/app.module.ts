import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PeopleModule } from '../src/people/people.module';
import { VoteModule } from './vote/vote.module';
import * as Joi from 'joi';

@Module({
  imports: [
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
  ],
})
export class AppModule {}
