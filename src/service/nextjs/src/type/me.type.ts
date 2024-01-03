import User from './user.type';

interface Me extends User {
	intraId: string;
	email2fa: string | undefined;
	use2fa: boolean;
}

export default Me;
