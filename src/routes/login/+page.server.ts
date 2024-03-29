import UserService from '$lib/services/user.service.js';
import { anonymous, setLogonCookies } from '$lib/utils/user.utils';
import { fail, type Actions } from '@sveltejs/kit';

export function load({locals}) {
    anonymous(locals);
}

export const actions: Actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = data.get('username') as string;
        const password = data.get('pass') as string;

        if (!username) {
            return fail(400, {username, missing: true});
        }

        if (!password) {
            return fail(400, {username, missingPassword: true});
        }

        const service = new UserService();
        const logonResponse = await service.logon({login: username, password});

        if (!('token' in logonResponse)) {
            console.error('Could not login', {...logonResponse});
            return fail(400, {username, invalidCredentials: true});
        }

        setLogonCookies(cookies, logonResponse);

        return { success: true };
    }
}