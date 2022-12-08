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