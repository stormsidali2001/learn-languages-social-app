import { Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { join } from "path";
import { from, Observable, of, switchMap } from "rxjs";
import { AccessTokenJwtGuard } from "src/auth/guards/access-token-jwt-guard";
import { UserEntity } from "src/core/entities/user.entity";
import { UpdateResult } from "typeorm";
import { UserService } from "./user.service";
import { imageStorageConfig, isFileExtensionSafe, removeFile } from "./utils/image-storage.config";


@Controller('users')
export class UserController{
    constructor(
        private readonly userService:UserService
    ){}
    
    @Get()
    findAll():Observable<UserEntity[]>{
        return this.userService.findAll();
    }

    @UseGuards(AccessTokenJwtGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file',imageStorageConfig))
    uploadImage(@UploadedFile() file:Express.Multer.File,@Req() req):Observable<UpdateResult | {error:string}>{
        const fileName = file.filename;
        if(!fileName) return of({error:"file must be a png , jpg/jpeg"});

        const imageDirectoryPath = join(process.cwd(),'images');
        const fullImagePath = join(imageDirectoryPath+'/'+file.filename);
        return isFileExtensionSafe(fullImagePath).pipe(
            switchMap((safe:boolean)=>{
                if(safe){
                    const userId = req.user.sub;
                    return this.userService.updateProfileImage(userId,fullImagePath);
                }
                removeFile(fullImagePath);
                return of({error:'File content does not match extension'});
            })
        )
    }
}

