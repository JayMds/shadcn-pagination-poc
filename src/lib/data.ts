export interface User {
    id: number;
    name: string;
    email: string;
}


export const users: User[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Utilisateur ${i + 1}`,
    email: `utilisateur${i + 1}@exemple.com`,
}));
