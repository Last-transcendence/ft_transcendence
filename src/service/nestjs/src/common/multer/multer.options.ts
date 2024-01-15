import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export const multerOption = {
    storage: diskStorage({
        destination: (req, file, callback) => {
            // const uploadPath = join(__dirname, '..', `uploads`);
            const uploadPath = `../uploads`;

            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath, { recursive: true });
            }
            callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
            const randomName = randomUUID();
            const extension = extname(file.originalname);
            callback(null, `${randomName}${extension}`);
        },
    }),
};

