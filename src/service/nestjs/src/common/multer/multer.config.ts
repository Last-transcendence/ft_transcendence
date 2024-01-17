import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
import * as fs from 'fs';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    dirPath: string;
    constructor() {
        this.dirPath = join(process.cwd(), 'upload');
        this.mkdir();
    }

    mkdir() {
            fs.readdirSync(this.dirPath);
        } catch (error) {
            fs.mkdirSync(this.dirPath);
    }

    createMulterOptions() {
        const dirPath = this.dirPath;
        const option = {
            storage: diskStorage({
                destination(req, file, done) {
                    done(null, dirPath);
                },
                filename(req, file, done) {
                    const randomName = randomUUID();
                    const extension = extname(file.originalname);
                    done(null, `${randomName}${extension}`);
                },
            }),
            limits: { fileSize: 1024 * 1024 * 10 },
            };
        return option;
    }
}