import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { UserEntity } from '../core/entities/user.entity';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity]),
             JwtModule.register({})
            ],
    providers:[AuthService],
    controllers:[AuthController]
})
export class AuthModule {}
