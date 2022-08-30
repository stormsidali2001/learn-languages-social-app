import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class AccessTokenJwtStrategy extends PassportStrategy(Strategy,'access_token-jwt'){
    constructor(private configService:ConfigService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:configService.get('JWT_SECRET')
        })
    }
    async validate(payload){
        return payload.user;
    }
}