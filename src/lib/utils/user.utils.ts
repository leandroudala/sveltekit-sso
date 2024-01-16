import type { TokenDTO, UserDataDTO } from "$lib/services/user.service";

export function getTokenData({ token }: TokenDTO): UserDataDTO {
    const encodedData = token.split('.')[1];
    return JSON.parse(atob(encodedData)) as UserDataDTO;
}