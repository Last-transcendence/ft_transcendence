import { Cookies } from 'react-cookie';
import { CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option?: CookieSetOptions | undefined) => {
	cookies.set(name, value, option);
};

export const getCookie = (name: string) => {
	return cookies.get(name);
};

export const removeCookie = (name: string, option?: CookieSetOptions | undefined) => {
	cookies.remove(name, option);
};
