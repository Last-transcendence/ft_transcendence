import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export const multerOptions = {
    storage: diskStorage({
        destination: (req, file, callback) => {
            const uploadPath = join(__dirname, '..', `public`);
            // const uploadPath = 'public';

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