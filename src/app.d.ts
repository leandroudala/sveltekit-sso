// See https://kit.svelte.dev/docs/types#app

import type { UserDataDTO } from "$lib/services/user.service";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: UserDataDTO | undefined
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
