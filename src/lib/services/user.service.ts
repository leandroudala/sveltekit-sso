import { PUBLIC_HOST } from "$env/static/public";

export interface CheckAvailabilityResponseDTO {
    emailAvailable: boolean;
    usernameAvailable: boolean;
}

export interface LoginFormDTO {
    login: string;
    password: string;
}

export interface ErrorDTO {
    message: string;
    statusCode: number;
}

export interface TokenDTO {
    token: string;
    type: string;
}

export default class UserService {
    private url = PUBLIC_HOST + '/users';
    private authUrl = PUBLIC_HOST + '/auth'


    async checkAvailability(user: string): Promise<CheckAvailabilityResponseDTO> {
        if (!user) {
            throw new Error("Please provide an email or username");
        }

        const params = new URLSearchParams();
        const param = user.indexOf('@') !== -1 ? 'email' : 'username';
        params.set(param, user);

        const path = "/check-availability"
        const url = this.url + path + '?' + params.toString()
        return fetch(url)
        .then(res => res.json());
    }

    async logon(credentials: LoginFormDTO): Promise<ErrorDTO | TokenDTO> {
        return fetch(this.authUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        }).then(res => res.json());
    }
}
