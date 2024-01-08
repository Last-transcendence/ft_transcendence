import { ChannelVisibility } from '@prisma/client';
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsValidPassword(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'IsValidPassword',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					const object = args.object as any;
					const visibility = object.visibility;
					const password = value;

					if (visibility === ChannelVisibility.PROTECTED && password.length === 6) {
						if (/^\d+$/.test(password)) {
							return true;
						}
					} else if (
						visibility === ChannelVisibility.PUBLIC ||
						visibility === ChannelVisibility.PRIVATE
					) {
						if (password.length === 0) {
							return true;
						}
					}
					return false;
				},
			},
		});
	};
}
