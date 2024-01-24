import { anonymous } from '$lib/utils/user.utils.js';

export function load({locals}) {
    anonymous(locals);
}