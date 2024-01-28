
import { writable } from 'svelte/store';
import type { OpeningHours } from './types';
export const openingHours = writable<OpeningHours>();