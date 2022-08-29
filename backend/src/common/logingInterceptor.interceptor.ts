import {CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor} from '@nestjs/common'
import { Request } from 'express';
import { Observable, tap } from 'rxjs';


@Injectable()
export class LogginInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest<Request>();
        const {body,url,method} = request;
        const then = Date.now();
        return next.handle().pipe(
            tap(
               ()=>Logger.log(`request: ${method} ${url} ${body} ${Date.now() - then}ms`,context.getClass().name+'/'+context.getHandler().name)
            )
        )
        

    }

}