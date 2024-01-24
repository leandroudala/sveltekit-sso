import type { TokenDTO, UserDataDTO } from "$lib/services/user.service";
import { redirect, type Cookies } from "@sveltejs/kit";

const COOKIE_AUTH_NAME = 'authorization';

export function getTokenData({ token }: TokenDTO): UserDataDTO {
    const encodedData = token.split('.')[1];
    return JSON.parse(atob(encodedData)) as UserDataDTO;
}

export function setLogonCookies(cookie: Cookies, tokenData: TokenDTO) {
    const tokenDecodedData = getTokenData(tokenData);
    const expiresInMilliseconds = tokenDecodedData.exp * 1000;

    cookie.set(COOKIE_AUTH_NAME, tokenData.token, {
        path: '/',
        httpOnly: true,
        expires: new Date(expiresInMilliseconds)
    });
}

/**
 * Get logged user data
 * @param cookie - Server cookie
 * @returns `undefined` when not logged in.
 */
export function getLoggedUser(cookie: Cookies): UserDataDTO | undefined {
    const cookieData = cookie.get(COOKIE_AUTH_NAME);
    if (!cookieData) {
        return undefined;
    }

    return getTokenData({token: cookieData} as TokenDTO);
}

export function logoff(cookie: Cookies) {
    cookie.delete(COOKIE_AUTH_NAME, {
        path: '/',
        httpOnly: true
    });
}

/**
 * Check if user is logged in. Redirects to '/home' when logged in.
 * @param locals - Locals
 */
export function anonymous(locals: App.Locals) {
    if (locals.user) {
        throw redirect(303, '/home');
    }
}

/**
 * Check if user is logged in. Redirects to '/' when not logged in.
 * @param locals - Locals
 * @returns - Info of logged user
 */
export function authenticated(locals: App.Locals) {
    if (!locals.user) {
        throw redirect(303, '/');
    }

    return locals.user;
}