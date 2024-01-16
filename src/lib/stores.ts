import { browser } from "$app/environment";
import { writable } from "svelte/store";

const defaultTheme = true;
const selectedTheme = browser ? (window.localStorage.getItem('theme') ?? defaultTheme) : defaultTheme;

export const theme = writable(selectedTheme);