import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { UserEntity } from '../core/entities/user.entity';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenJwtStrategy } from './passport-strategies/access-token-jwt-strategy';
import { AccessTokenJwtGuard } from './guards/access-token-jwt-guard';

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity]),
             JwtModule.register({})
            ],
    providers:[AuthService,AccessTokenJwtStrategy,AccessTokenJwtGuard],
    controllers:[AuthController]
})
export class AuthModule {}
