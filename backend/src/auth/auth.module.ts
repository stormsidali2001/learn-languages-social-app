import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { UserEntity } from '../core/entities/user.entity';
import { AuthService } from './services/auth.service';

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    providers:[AuthService],
    controllers:[AuthController]
})
export class AuthModule {}
