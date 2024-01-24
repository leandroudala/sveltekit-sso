import { getLoggedUser } from "$lib/utils/user.utils";
import { redirect } from "@sveltejs/kit";

export async function load({cookies, url}) {
    const tokenData = getLoggedUser(cookies);

    if (!url.pathname.startsWith('/home') && !url.pathname.startsWith('/logout') && tokenData) {
        throw redirect(303, '/home');
    }
}