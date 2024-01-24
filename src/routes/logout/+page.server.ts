import { logoff } from '$lib/utils/user.utils.js';
import { redirect } from '@sveltejs/kit';


export async function load({cookies}) {
    logoff(cookies);
    throw redirect(303, '/');
}