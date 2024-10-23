import axios from 'axios';
import {getPostsByUserIdApi} from '@/api/postsApi';
export const postListModule = {
    state: () => ({
        isLoading: false,
        posts: [],
    }),
    getters: {

    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isLoading = bool;
        },
    },
    actions: {
    // Получение постов по id пользователя
    async getPostsByUserId({commit}, userId) {
        try {
            commit('setLoading', true)
            const posts = await getPostsByUserIdApi(userId);
            commit('setPosts', posts)
        } catch (err) {
            console.error(`store/postListModule.js: getPostsByUserId  => ${err}`);
        } finally {
            commit('setLoading', false);
        }
    }
    },
    namespaced: true,
}