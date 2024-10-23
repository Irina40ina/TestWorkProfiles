import axios from 'axios';
import {getUsersApi} from '@/api/usersApi';
export const usersListModule = {
    state: () => ({
        searchQuery: '',
        users: [],
    }),
    getters: {
        filteredUsers(state) {
            if (state.searchQuery.trim() === '') {
                return state.users;
            }
            return state.users.filter(user => 
                user.username.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
        }
        
    },
    mutations: {
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
        setUsers(state, users) {
            state.users = users;
        }
    },
    actions: {
        // Получение пользователей
    async getUsers({commit}) {
        try {
            const users = await getUsersApi();
            commit('setUsers', users);
        } catch (err) {
            console.error(`store/usersListModule.js: getUsers  => ${err}`);
        }
    }
    },
    namespaced: true,
}