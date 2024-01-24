import { getLoggedUser } from "$lib/utils/user.utils";
import { redirect } from "@sveltejs/kit";

const ALLOWED_ANONYMOUS_PATH = new Set(['/', '/login', '/register']);

export async function load({cookies, url}) {
    const tokenData = getLoggedUser(cookies);

    if (ALLOWED_ANONYMOUS_PATH.has(url.pathname) && tokenData) {
        // redirecting to home page if user is logged in
        throw redirect(303, '/home');
    }

    if (!ALLOWED_ANONYMOUS_PATH.has(url.pathname) && !tokenData) {
        // redirecting to login page if user is not logged in 
        throw redirect(303, '/');
    }
}