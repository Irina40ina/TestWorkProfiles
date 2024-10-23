import axios from 'axios';
import { hostname } from '@/api/index';
import { getPhotosByAlbumIdApi } from '@/api/photosApi';

export async function getAlbumsByUserIdApi(userId) {
    try {
        const response = await axios.get(`${hostname}/albums`, {
            params: {
                userId: userId,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        let albums = response.data;
        if (Array.isArray(albums)) {
            albums = albums.map(async (album) => {
                album.photos = await getPhotosByAlbumIdApi(album.id);
                return album;
            });
        }
        return await Promise.all(albums);
    } catch (err) {
        console.error(`store/index.js: getAlbumsByUserId  => ${err}`);
    }
}







