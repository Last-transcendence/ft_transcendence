import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import * as Dto from '../../api/user/dto';

export function ApiFile(fieldName: string) {
    return applyDecorators(
	    ApiConsumes('multipart/form-data'),
        UseInterceptors(FileInterceptor(fieldName)),
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    [fieldName]: {
                        type:'string',
                        format: 'binary'
                    },
                    updateData: {
                        type: 'object',
                        properties: {
                            intraId: {
                                type: 'string',
                            },
                            nickname: {
                                type: 'string',
                            },
                            use2fa: {
                                type: 'boolean',
                            },
                            email2fa: {
                                type: 'string',
                                format: 'email',
                            },
                            profileImageURI: {
                                type: 'string',
                            },
                        },
                    },
                },
            },
        }),
    );
}