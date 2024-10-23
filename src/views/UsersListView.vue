<script>
import usersListComp from '@/components/usersListComp.vue';
import searchComp from '@/components/searchComp.vue';
import { useRouter } from 'vue-router';
import {mapState, mapActions, mapMutations} from 'vuex';
export default {
    components: {
        usersListComp,
        searchComp,
    },
    data() {
        return {
            router: useRouter(),
        }
    },
    methods: {
        ...mapMutations({
            setSearchQuery: 'users/setSearchQuery',
            setUsers: 'users/setUsers',
        }),
        ...mapActions({
            getUsers: 'users/getUsers',
        }),
        handlerOpenProfile(id) {
            this.router.push({ name: 'profile', params: { userId: id } });
        }
    },
    computed: {
        ...mapState({
            searchQuery: state => state.users.searchQuery,
        }),
    },
    mounted() {
        this.getUsers();
    }
}
</script>
<template>
    <div class="users-list-view">
        <!-- Компонент поиска -->
        <div class="users-list-view__search-container">
            <searchComp 
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            :icon="'mdi-magnify'"
            ></searchComp>
        </div>
        <!-- Компонент списка пользователей -->
        <v-card 
        class="mx-auto my-4"
        min-width="60%"
        max-height="100vh">
            <v-list-subheader class="users-list-view__list-title">
                Список пользователей
            </v-list-subheader>
            <v-list class="users-list-view__list-container" lines="three">
                <usersListComp 
                @open-profile="handlerOpenProfile"
                />
            </v-list>
        </v-card>
    </div>
</template>

<style scoped lang="scss">
@import '../styles/variables';
.users-list-view {
    width: 75%;
    &__search-container {
        width: 100%;
        margin-top: 2rem;
    }
    &__list-container {
        max-height: 100vh; 
        overflow: auto;
    }
    &__list-container::-webkit-scrollbar {
        display: none;
    }
    &__list-title {
        font-size: 1.5rem;
        padding-left: 1rem;
    }
    .v-list-subheader__text {
        overflow: none;
    }
}
</style>