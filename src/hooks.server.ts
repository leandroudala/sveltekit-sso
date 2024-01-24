import { getLoggedUser } from "$lib/utils/user.utils";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.user = getLoggedUser(event.cookies);

    const response = await resolve(event);

    return response;
}