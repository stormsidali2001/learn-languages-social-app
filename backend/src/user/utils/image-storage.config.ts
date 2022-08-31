import { diskStorage } from "multer";
import {v4 as uuidv4} from 'uuid';

const fs = require('fs');
const FileType = require('file-type');

import path  = require('path');
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { from, Observable, switchMap } from "rxjs";

type ValidFileExtension = 'png' | 'jpg' | 'jpeg';
type ValidMimeType = `image/${ValidFileExtension}`;

const validFileExtension:ValidFileExtension[] =['png','jpg','jpeg'];
const validMimeType:ValidMimeType[] =[
    'image/png',
    'image/jpg',
    'image/jpeg'
];

export const imageStorageConfig:MulterOptions = {
    storage:diskStorage({
        destination:'./images',
        filename:(req,file,cb)=>{
            const fileExtension:string = path.extname(file.originalname);
            const fileName:string = uuidv4() + fileExtension;
            cb(null,fileName);
        },
    }),
    fileFilter:(req,file,cb)=>{
        const allowedMimeTypes:ValidMimeType[] = validMimeType;
        //accept the file if its mime type is included in the allowedMimeTypes array else reject it
        allowedMimeTypes.includes(file.mimetype as ValidMimeType) ? cb(null,true) :cb(null,false)

    }
    
}

export const isFileExtensionSafe =(path):Observable<boolean>=>{
    return from<boolean>(FileType.fromFile(path)).pipe(
        switchMap(
            (fileExtAndMimeType)=>{
                
            }
        )
    )
}