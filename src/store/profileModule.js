import axios from 'axios';
import { getAlbumsByUserIdApi } from '@/api/albumApi';
import { getUserByIdApi } from '@/api/usersApi';

export const profileModule = {
    state: () => ({
        userData: {
            id: 0,
            name: '',
            username: '',
            email: '',
            address: {
                street: '',
                suite: '',
                city: '',
                zipcode: '',
                geo: {
                    lat: '',
                    lng: ''
                }
            },
            phone: '',
            website: '',
            company: {
                name: '',
                catchPhrase: '',
                bs: ''
            }
        },
        albums: [],
        isLoading: false,
        isLoadingAlbums: false,
    }),
    getters: {

    },
    mutations: {
        setUserData(state, userData) {
            state.userData = userData;
        },
        setName(state, name) {
            state.userData.name = name;
        },
        setUsername(state, username) {
            state.userData.username = username;
        },
        setUserId(state, userId) {
            state.userData.id = userId;
        },
        setCompanyName(state, companyName) {
            state.userData.company.name = companyName;
        },
        setAlbums(state, albums) {
            state.albums = albums;
        },
        setLoading(state, bool) {
            state.isLoading = bool;
        },
        setLoadingAlbums(state, bool) {
            state.isLoadingAlbums = bool;
        },
    },
    actions: {
        // Получение данных пользователя по id
        async getUserById({commit, state}, id) {
            try {
                commit('setLoading', true)
                const data = await getUserByIdApi(id);
                commit('setUserData', data)
            } catch (err) {
                console.error(`store/profileModule.js: getUserById  => ${err}`);
            } finally {
                commit('setLoading', false);
            }
        },
        // Получение альбомов по id пользователя
        async getAlbumsByUserId({ commit }, userId) {
            try {
                commit('setLoadingAlbums', true)
                const albums = await getAlbumsByUserIdApi(userId);
                commit('setAlbums', albums);
            } catch (err) {
                console.error(`store/profileModule.js: getAlbumsByUserId  => ${err}`);
            } finally {
                commit('setLoadingAlbums', false);
            }
        }
    },
    namespaced: true,
}