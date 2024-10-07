<script lang="ts">
    import * as Pagination from '$lib/components/ui/pagination';
    import { paginatedUsers, totalCount, initializePagination, currentPage, perPage } from '$lib/stores/userStore';
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
    <Pagination.Root count={$totalCount} perPage={perPage} let:pages let:currentPage onPageChange={(page) => {currentPage.set(page)}}>
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
