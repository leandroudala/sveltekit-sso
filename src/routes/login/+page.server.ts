import UserService from '$lib/services/user.service.js';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
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

        cookies.set('authorization', logonResponse.token, {
            path: '/',
            httpOnly: true
        });

        return { success: true };
    }
}