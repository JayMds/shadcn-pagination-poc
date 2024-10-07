# Structure  

```
src/
├── lib/
│   ├── components/
│   │   └── ui/
│   │       └── pagination/
│   │           └── index.svelte
│   ├── data.ts
│   └── stores/
│       └── userStore.ts
└── routes/
└── +page.svelte
```

# Store Structure 

```ts
// src/lib/stores/userStore.ts
import { writable, derived } from 'svelte/store';
import { users, type User } from '../data';

// Nombre d'éléments par page
const perPage = 10;

// Store pour la page actuelle
export const currentPage = writable(1);

// Store pour le total des utilisateurs
export const totalCount = writable(users.length);

// Store dérivé pour obtenir les utilisateurs paginés
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

```

currentPage : Un store writable qui garde la trace de la page actuelle.
totalCount : Un store writable qui stocke le nombre total d'utilisateurs.
paginatedUsers : Un store dérivé qui calcule les utilisateurs à afficher en fonction de la page actuelle.
changePage : Une fonction pour changer de page tout en s'assurant que la nouvelle page est valide.
initializePagination : (Optionnel) Une fonction pour initialiser la pagination, par exemple au montage du composant.

Voir branche ext store