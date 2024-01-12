import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { multerOption } from '../user/multer.options';

export function ApiFile(fieldName: string = 'file') {
    return applyDecorators(
        UseInterceptors(FileInterceptor(fieldName, multerOption)),
        ApiConsumes('multipart/form-data'),
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    [fieldName]: {
                        type:'string',
                        format: 'binary'
                    },
                },
            },
        }),
    );
}