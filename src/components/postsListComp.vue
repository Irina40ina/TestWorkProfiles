<script>
import {mapState, mapActions, mapMutations} from 'vuex';
export default {
    methods: {
        ...mapMutations({
            setPosts: 'posts/setPosts',
            setLoading: 'posts/setLoading',
        }),
        ...mapActions({
            getPostsByUserId: 'posts/getPostsByUserId',
        }),
    },
    computed: {
        ...mapState({
            isLoading: state => state.posts.isLoading,
            posts: state => state.posts.posts,
            userId: state => state.profile.userData.id,
        }),
    },
    async mounted() {
        this.getPostsByUserId(this.userId);
    }
}
</script>
<template>
    <!-- loader -->
    <div class="loading-container elevation-3 rounded"
    v-if="isLoading">
        <v-skeleton-loader type="article"></v-skeleton-loader>
    </div>
    <!-- Список постов -->
    <v-list-item
    v-else
    v-for="post in posts"
    :key="post.id"
    rounded="shaped"
    density="compact"
    >
        <v-list-item-title>{{ post.title }}</v-list-item-title>
        <v-list-item-subtitle> {{ post.body }}</v-list-item-subtitle>
    </v-list-item>
</template>
<style scoped>
.v-list-item  {
    gap: 2rem;
}


</style>