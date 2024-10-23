import axios from 'axios';
import { hostname } from '@/api/index';

// Получение пользователей
export async function getUsersApi() {
    try {
        const response = await axios.get(`${hostname}/users`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        return response.data;
    } catch (err) {
        console.error(`api/usersApi.js: getUsersApi  => ${err}`);
    }
}
// Получение данных пользователя по id
export async function getUserByIdApi(id) {
    try {
        const response = await axios.get(`${hostname}/users`, {
            params: {
                id: id,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        const data = response.data;
        if (Array.isArray(data)) {
            return data[0]; 
        }
        return data;
    } catch (err) {
        console.error(`api/.js: getUserByIdApi  => ${err}`);
    }
}