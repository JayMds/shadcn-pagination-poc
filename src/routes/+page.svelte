<script lang="ts">
    import * as Pagination from '$lib/components/ui/pagination';
    import { users, type User } from '$lib/data';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    const perPage = 10;
    const totalCount = users.length;

    // Store page actuelle
    const currentPage = writable(1);

    // Store pour les utilisateurs affichés
    const paginatedUsers = writable<User[]>([]);

    /**
     * Ex page 1 perpage 10: slice(0, 10) renvoi les 10 elements du tableau
     * Ex page 3 perpage 10: slice(20, 30) renvoi les 10 elements du tableau de 20 a 30
     * @param page
     */
    function getPaginatedUsers(page: number): User[] {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return users.slice(start, end);
    }

    /**
     * Quand le numéro de page change, on set paginated user avec le numéro de page
     */
    currentPage.subscribe((page) => {
        paginatedUsers.set(getPaginatedUsers(page));
    });

    function update() {

    }

    // Initialiser les utilisateurs affichés
    onMount(() => {
        currentPage.set(1);
    });
</script>

<style>
    /* Styles de base pour la liste */
    .user-list {
        list-style: none;
        padding: 0;
    }

    .user-item {
        padding: 0.5rem;
        border-bottom: 1px solid #eaeaea;
    }

    .pagination-container {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
    }
</style>

<h1>Liste des Utilisateurs</h1>

<ul class="user-list">
    {#each $paginatedUsers as user}
        <li class="user-item">
            <strong>{user.name}</strong> - {user.email}
        </li>
    {/each}
</ul>

<div class="pagination-container">
    <Pagination.Root count={totalCount} perPage={perPage} let:pages let:currentPage onPageChange={(page) => {paginatedUsers.set(getPaginatedUsers(page))}}>
        <Pagination.Content>
            <Pagination.Item>
                <Pagination.PrevButton />
            </Pagination.Item>
            {#each pages as page (page.key)}
                {#if page.type === 'ellipsis'}
                    <Pagination.Item>
                        <Pagination.Ellipsis />
                    </Pagination.Item>
                {:else}
                    <Pagination.Item >
                        <Pagination.Link {page} isActive={currentPage === page.value}>
                            {page.value}
                        </Pagination.Link>
                    </Pagination.Item>
                {/if}
            {/each}
            <Pagination.Item>
                <Pagination.NextButton />
            </Pagination.Item>
        </Pagination.Content>
    </Pagination.Root>
</div>
