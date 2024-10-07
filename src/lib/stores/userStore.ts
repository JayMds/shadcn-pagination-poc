// src/lib/stores/userStore.ts
import { writable, derived } from 'svelte/store';
import { users, type User } from '../data';

// Nombre d'éléments par page
export const perPage = 10;

// Store pour la page actuelle
export const currentPage = writable(1);

// Store pour le total des utilisateurs
export const totalCount = writable(users.length);

/**
 * Users affiché sur la page
 * Ex page 1 perpage 10: slice(0, 10) renvoi les 10 elements du tableau
 * Ex page 3 perpage 10: slice(20, 30) renvoi les 10 elements du tableau de 20 a 30
 * @param page
 */
export const paginatedUsers = derived(
    currentPage,
    ($currentPage) => {
        const start = ($currentPage - 1) * perPage;
        const end = start + perPage;
        return users.slice(start, end);
    }
);

// Fonction pour changer de page avec validation
export function changePage(page: number) {
    const maxPage = Math.ceil(users.length / perPage);
    if (page >= 1 && page <= maxPage) {
        currentPage.set(page);
    }
}

// Optionnel : Fonction pour initialiser la pagination
export function initializePagination() {
    currentPage.set(1);
}