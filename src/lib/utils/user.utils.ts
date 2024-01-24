import type { TokenDTO, UserDataDTO } from "$lib/services/user.service";
import type { Cookies } from "@sveltejs/kit";

export function getTokenData({ token }: TokenDTO): UserDataDTO {
    const encodedData = token.split('.')[1];
    return JSON.parse(atob(encodedData)) as UserDataDTO;
}

export function setLogonCookies(cookie: Cookies, tokenData: TokenDTO) {
    const tokenDecodedData = getTokenData(tokenData);
    const expiresInMilliseconds = tokenDecodedData.exp * 1000;

    cookie.set('authorization', tokenData.token, {
        path: '/',
        httpOnly: true,
        expires: new Date(expiresInMilliseconds)
    });
}