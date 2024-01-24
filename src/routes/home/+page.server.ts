import { getLoggedUser } from "$lib/utils/user.utils";
import { redirect } from "@sveltejs/kit";

export function load({cookies}) {
    const userData = getLoggedUser(cookies);

    if (!userData) {
        // user not logged in
        throw redirect(303, '/');
    }

    return {
        props: {userData}
    };
}