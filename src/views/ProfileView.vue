<script>
import { useRoute, useRouter } from 'vue-router';
import albumComp from '@/components/albumComp.vue';
import postsListComp from '@/components/postsListComp.vue';
import {mapState, mapActions, mapMutations} from 'vuex';
export default {
    components: {
        albumComp,
        postsListComp,
    },
    data() {
        return {
            route: useRoute(),
            router: useRouter(),
        }
    },
    methods: {
        ...mapMutations({
            setAlbums: 'profile/setAlbums',
            setLoading: 'profile/setLoading',
        }),
        ...mapActions({
            getUserById: 'profile/getUserById',
            getAlbumsByUserId: 'profile/getAlbumsByUserId',
        }),
        backToUsersList() {
            this.$router.push({name: 'users'});
        }
    },
    computed: {
        ...mapState({
            username: state => state.profile.userData.username,
            isLoading: state => state.profile.isLoading,
            isLoadingAlbums: state => state.profile.isLoadingAlbums,
            albums: state => state.profile.albums,
        }),
    },
   async mounted() {
        await this.getUserById(this.route.params.userId);
        console.log(this.userData, this.isLoading)
        await this.getAlbumsByUserId(this.route.params.userId);
    }
}
</script>
<template>
    <div class="profile-view">
        <!-- Шапка -->
        <div 
        v-if="!isLoading"
        class="profile-view__header d-flex space-between text-h4 my-4 pa-4" 
        variant="elevated">
            <!-- Имя пользователя -->
            <div :disabled="true">
                {{ username }}
            </div>
            <!-- Кнопка перехода к списку пользователей -->
            <v-btn
            color="indigo-darken-1"
            icon="mdi-arrow-left"
            @click="backToUsersList"
            ></v-btn>
        </div>

        <!-- Список постов -->
        <div class="profile-view__post-container">
            <h3 class="profile-view__post-container--title">Посты пользователя</h3>
            <div class="loading-container elevation-3 rounded"
            v-if="isLoading">
            </div>
            <postsListComp v-else/>
        </div>

        <!-- Список альбомов -->
        <div class="profile-view__albums-list">
            <h3 class="profile-view__albums-list--title">Альбомы</h3>
            <div class="profile-view__albums-wrapper">
                <div 
                class="profile-view__albums-wrapper--loading-container elevation-3 rounded"
                v-if="isLoadingAlbums">
                </div>
                <albumComp 
                    v-else
                    v-for="alb in albums" 
                    :key="alb.id" 
                    :alb-data="alb"
                    > 
                </albumComp>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.profile-view {
    width: 80%;
    height: 100vh;
    display: grid;
    grid-template-columns: 2fr 1fr; 
    grid-template-rows: auto 1fr; 
    
    &__header {
        border-radius: 5px;
        grid-column: 1 / 3;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #c5cae9;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }
    &__post-container--title, 
    &__albums-list--title {
        font-family: var(--basic-font);
        color: var(--basic-fg);
    }
    &__post-container {
        width: 100%;
        max-height: 800px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
        padding: .5rem 0;
    }
    &__post-container::-webkit-scrollbar {
        display: none;
    }
    &__albums-list {
        width: 90%;
        max-height: 800px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
        padding: .5rem 0;
    }
    &__albums-wrapper {
        max-width: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
    }
    &__albums-wrapper::-webkit-scrollbar {
        display: none;
    }
}
</style>