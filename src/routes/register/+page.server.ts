import type { LoginFormDTO, UserFormDTO } from '$lib/services/user.service';
import UserService from '$lib/services/user.service';
import { setLogonCookies } from '$lib/utils/user.utils.js';
import { fail } from '@sveltejs/kit';

const REQUIRED_FIELDS = ['name', 'email', 'username', 'password'];

class MissingFieldsError extends Error {
    fields: string[];
    constructor(fields: Array<string>) {
        super('Could not create account: missing inputs');
        this.fields = fields;
    }
}

function checkRequiredFields(formData: FormData) {
    const missingValues = REQUIRED_FIELDS.filter(key => !formData.has(key));
    if (missingValues.length) {
        throw new MissingFieldsError(missingValues);
    }
}

function validateForm(formData: FormData): UserFormDTO {
    checkRequiredFields(formData);
    return {
        name: formData.get('name'),
        email: formData.get('email'),
        username: formData.get('username'),
        password: formData.get('password')
    } as UserFormDTO;
}

export const actions = {
    create: async ({ cookies, request }) => {
        const formData = await request.formData();

        let userData: UserFormDTO;
        
        try {
            userData = validateForm(formData);
        } catch (error) {
            if (error instanceof MissingFieldsError) {
                const errorData = {message: error.message, fields: error.fields};
                console.error(errorData);
                return fail(400, errorData);
            }

            console.error(error);
            return fail(400, {message: 'Unknown error', error})
        }
        
        const service = new UserService();

        // creating user
        const user = await service.createUser(userData);

        // performing auto logon after creating account
        const loginForm = {
            login: userData.username, 
            password: userData.password
        } as LoginFormDTO;

        const logonResponse = await service.logon(loginForm);

        // check if there's any logon error
        if (!('token' in logonResponse)) {
            console.error('Could not perform auto logon.', logonResponse);
            return fail(400, { message: 'Could not perform auto logon.'});
        }

        setLogonCookies(cookies, logonResponse);

        return { success: true, user};
    }
}