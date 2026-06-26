import { writable } from 'svelte/store';

export type ThemeMode = 'light' | 'dark' | 'system';

function getStoredTheme(): ThemeMode {
	if (typeof window === 'undefined') return 'system';
	return (localStorage.getItem('theme') as ThemeMode) ?? 'system';
}

function applyTheme(mode: ThemeMode) {
	if (typeof window === 'undefined') return;
	const isDark =
		mode === 'dark' ||
		(mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
	document.documentElement.classList.toggle('dark', isDark);
}

export const theme = writable<ThemeMode>(getStoredTheme());

theme.subscribe((value) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('theme', value);
	}
	applyTheme(value);
});

if (typeof window !== 'undefined') {
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
		theme.update((mode) => {
			if (mode === 'system') applyTheme('system');
			return mode;
		});
	});
}
