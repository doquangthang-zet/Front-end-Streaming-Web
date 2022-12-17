import { async } from "@firebase/util";
import axios from "axios";

const baseUrl = "http://localhost:4000/";

export const validateUser = async (token) => {
    try{
        const res = await axios.get(`${baseUrl}api/users/login`, {
            headers : {
                Authorization: "Bearer " + token,
            }
        })
        return res.data;
    } catch (err) {
        return null;
    }
};

export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${baseUrl}api/users/getUsers`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export const getAllSongs = async () => {
    try {
        const res = await axios.get(`${baseUrl}api/songs/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export const getAllArtists = async () => {
    try {
        const res = await axios.get(`${baseUrl}api/artists/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export const getAllPlaylist = async () => {
    try {
        const res = await axios.get(`${baseUrl}api/playlists/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export const getAllAlbum = async () => {
    try {
        const res = await axios.get(`${baseUrl}api/albums/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export const updateUserRole = async (userId, role) => {
    try {
        const res = axios.put(`${baseUrl}api/users/updateRole/${userId}`, {data: {role: role}});
        return res;
    } catch (error) {
        return null;
    }
}

export const removeUser = async (userId) => {
    try {
        const res = axios.delete(`${baseUrl}api/users/delete/${userId}`);
        return res;
    } catch (error) {
        return null;
    }
}

export const saveNewSong = async (data) => {
    try {
        const res = axios.post(`${baseUrl}api/songs/save`, {...data});
        return (await res).data.savedSong;
    } catch (error) {
        return null;
    }
}

export const getUserPlaylist = async (userId) => {
    try {
        const res = await axios.get(`${baseUrl}api/playlists/getUserPlaylist/${userId}`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export const saveNewPlaylist = async (data) => {
    try {
        const res = axios.post(`${baseUrl}api/playlists/save`, {...data});
        return (await res).data.savedPlaylist;
    } catch (error) {
        return null;
    }
}

export const saveNewAlbum = async (data) => {
    try {
        const res = axios.post(`${baseUrl}api/albums/save`, {...data});
        return (await res).data.savedAlbum;
    } catch (error) {
        return null;
    }
}

export const deleteSongById = async (id) => {
    try {
        const res = axios.delete(`${baseUrl}api/songs/delete/${id}`);
        return res
    } catch (error) {
        return null;
    }
}

export const deleteAlbumById = async (id) => {
    try {
        const res = axios.delete(`${baseUrl}api/albums/delete/${id}`);
        return res
    } catch (error) {
        return null;
    }
}

export const updatePlaylist = async (playlistId, songId) => {
    try {
        const res = axios.put(`${baseUrl}api/playlists/updateSongs/${playlistId}/${songId}`);
        return res;
    } catch (error) {
        return null;
    }
}

export const updateLikedSongs = async (userId, songId) => {
    try {
        const res = axios.put(`${baseUrl}api/users/updateLikedSongs/${userId}/${songId}`);
        return res;
    } catch (error) {
        return null;
    }
}