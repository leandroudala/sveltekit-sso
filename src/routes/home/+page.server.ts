import { authenticated } from '$lib/utils/user.utils.js';

export function load({locals}) {
    const userData = authenticated(locals);

    return {
        props: {userData}
    };
}