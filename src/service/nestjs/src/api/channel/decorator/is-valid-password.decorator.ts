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

					if (visibility === ChannelVisibility.PROTECTED) {
						return password.length === 6 && /^\d+$/.test(password);
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
				defaultMessage(args: ValidationArguments) {
					const object = args.object as any;
					if (object.visibility === ChannelVisibility.PROTECTED) {
						return 'Password must be a 6-digit number';
					} else if (
						object.visibility === ChannelVisibility.PUBLIC ||
						object.visibility === ChannelVisibility.PRIVATE
					) {
						return 'Password must be empty';
					} else {
						return 'When the visibility is set to PROTECTED, a 6-digit numeric password is required. If the visibility is either PUBLIC or PRIVATE, the password must be left empty.';
					}
				},
			},
		});
	};
}
