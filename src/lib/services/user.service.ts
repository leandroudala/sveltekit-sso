import { PUBLIC_HOST } from "$env/static/public";

export interface CheckAvailabilityResponseDTO {
    emailAvailable: boolean;
    usernameAvailable: boolean;
}

export default class UserService {
    private url = PUBLIC_HOST;

    constructor() {
        this.url += "/users";
    }

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
}