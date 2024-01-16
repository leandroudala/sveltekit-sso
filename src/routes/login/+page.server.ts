import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const user = data.get('user');
        const password = data.get('pass');

        if (!user) {
            return fail(400, {user, missing: true});
        }

        if (!password) {
            return fail(400, {user, missingPassword: true});
        }

        console.log({ user, password });
        return { success: false}
    }
}