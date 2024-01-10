import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

export const multerOption = {
    storage: diskStorage({
        destination: join(__dirname, '..', 'upload'),
        filename: (req, file, cb) => {
            const randomName = randomUUID();
            const extension = extname(file.originalname);
            cb(null, `${randomName}${extension}`);
        },
    }),
};