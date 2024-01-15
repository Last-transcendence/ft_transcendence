import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { multerOption } from './multer.options';

export function ApiFile(fieldName: string = 'file') {
    return applyDecorators(
        ApiConsumes('multipart/form-data'),
        UseInterceptors(FileInterceptor(fieldName, multerOption)),
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