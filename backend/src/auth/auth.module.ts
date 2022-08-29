import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenJwtStrategy } from './passport-strategies/access-token-jwt-strategy';
import { AccessTokenJwtGuard } from './guards/access-token-jwt-guard';
import { UserModule } from '../user/user.module';
import { RolesGuard } from './guards/Roles.guard';
@Module({
    imports:[
             UserModule,
             JwtModule.register({}),
            ],
    providers:[AuthService,AccessTokenJwtStrategy,AccessTokenJwtGuard,RolesGuard],
    controllers:[AuthController],
    exports:[UserModule],
})
export class AuthModule {}
