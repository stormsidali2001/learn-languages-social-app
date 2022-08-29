import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";


@Catch()
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const request = host.switchToHttp().getRequest<Request>();
        const response = host.switchToHttp().getResponse<Response>();
        const status = exception?.status? exception.status:500;
        const {url,method,body} = request;

        Logger.error(`request: ${method} ${url} ${exception.message} `)
        response.status(status).json({
            code:status,
            timestamp:new Date(),
            path:url,
            method,
            message:exception.message
        })
    }

}