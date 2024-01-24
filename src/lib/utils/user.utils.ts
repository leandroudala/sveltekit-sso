import type { TokenDTO, UserDataDTO } from "$lib/services/user.service";
import type { Cookies } from "@sveltejs/kit";

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
        return;
    }

    return getTokenData({token: cookieData} as TokenDTO);
}