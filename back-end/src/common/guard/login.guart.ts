import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    console.log(result, 'result');
    const request = context.switchToHttp().getRequest();
    console.log(request, 'request');
    await super.logIn(request);
    console.log(result);
    return result;
  }
}
