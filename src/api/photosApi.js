import axios from 'axios';
import { hostname } from '@/api/index';

export async function getPhotosByAlbumIdApi(albumId, limit = 5) {
    try {
        const response = await axios.get(`${hostname}/photos`, {
            params: {
                albumId: albumId,
                _limit: limit,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        return response.data;
    } catch (err) {
        console.error(`api/index.js: getPhotosByAlbumId  => ${err}`);
    } 
}