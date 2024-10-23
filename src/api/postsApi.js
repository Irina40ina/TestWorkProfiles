import axios from 'axios';
import { hostname } from '@/api/index';

// Получение постов по id пользователя
export async function getPostsByUserIdApi(userId) {
    try {
        const response = await axios.get(`${hostname}/posts`, {
            params: {
                userId: userId,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        return response.data;
    } catch (err) {
        console.error(`api/postsApi.js: getPostsByUserIdApi  => ${err}`);
    } 
}