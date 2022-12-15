import React, {useState} from 'react'
import {motion} from 'framer-motion'
import { IoTrash } from 'react-icons/io5'
import { deleteAlbumById, deleteSongById, getAllAlbum, getAllSongs } from '../../api';
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../../config/firebase.config';

const SongCard = ({data, index, type}) => {
    const [isDelete, setIsDelete] = useState(false);
    const [{alertType, allSongs, allAlbums, songIndex, isSongPlaying}, dispatch] = useStateValue();

    const deleteCard = (data) => {
        if(type === "song") {

            const deleteRef = ref(storage, data.imageURL);
            deleteObject(deleteRef).then(() => {})

            deleteSongById(data._id).then((res) => {
                if(res.data) {
                    dispatch({
                        type: actionType.SET_ALERT_TYPE,
                        alertType: "success",
                    })

                    setInterval(() => {
                        dispatch({
                            type: actionType.SET_ALERT_TYPE,
                            alertType: null,
                        })
                    }, 4000)

                    getAllSongs().then((songs) => {
                        dispatch({
                          type: actionType.SET_ALL_SONGS,
                          allSongs: songs.song,
                        })
                    })
                } else {
                    dispatch({
                        type: actionType.SET_ALERT_TYPE,
                        alertType: "danger",
                    })

                    setInterval(() => {
                        dispatch({
                            type: actionType.SET_ALERT_TYPE,
                            alertType: null,
                        })
                    }, 4000)
                }
            })
        } 
        if(type === "album") {
            const deleteRef = ref(storage, data.imageURL);
            deleteObject(deleteRef).then(() => {})

            deleteAlbumById(data._id).then((res) => {
                if(res.data) {
                    dispatch({
                        type: actionType.SET_ALERT_TYPE,
                        alertType: "success",
                    })

                    setInterval(() => {
                        dispatch({
                            type: actionType.SET_ALERT_TYPE,
                            alertType: null,
                        })
                    }, 4000)

                    getAllAlbum().then((albums) => {
                        dispatch({
                          type: actionType.SET_ALL_ALBUMS,
                          allAlbums: albums.album,
                        })
                    })
                } else {
                    dispatch({
                        type: actionType.SET_ALERT_TYPE,
                        alertType: "danger",
                    })

                    setInterval(() => {
                        dispatch({
                            type: actionType.SET_ALERT_TYPE,
                            alertType: null,
                        })
                    }, 4000)
                }
            })
        }
    }

    const addToContext = () => {
        if(!isSongPlaying) {
            dispatch({
                type: actionType.SET_ISSONG_PLAYING,
                isSongPlaying: true,
            })
        }

        // if(!songIndex) {
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: data._id,
            })
        // }
    }

    return (
        <motion.div 
            className='relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card
            bg-gray-100 shadow-md rounded-lg flex flex-col items-center'
            onClick={type === "song" && addToContext}
        >
            <div className='h-40 min-h-[160px] w-40 min-w-[160px] rounded-lg drop-shadow-lg relative overflow-hidden'>
                <motion.img
                whileHover={{scale: 1.05}}
                    src={data.imageURL}
                    className='w-full h-full rounded-lg object-cover'
                />
            </div>

            <p className='text-base text-headingColor font-semibold my-2'>
                {data.name.length > 20 ? `${data.name.slice(0, 20)}...` : data.name}
                {data.artist && (<span className='block text-sm text-gray-400 my-1'>{data.artist.length > 20 ? `${data.artist.slice(0, 20)}..` : data.artist}</span>)}
            </p>

            <div className='w-full absolute bottom-3 flex items-center justify-evenly px-4'>
                <motion.i whileTap={{scale: 0.75}} className='text-base text-red-400 drop-shadow-md hover:text-red-600' onClick={() => {setIsDelete(true)}}>
                    <IoTrash />
                </motion.i>
            </div>

            {isDelete && 
            <motion.div className='absolute inset-0 backdrop:blur-md bg-cardOverlay flex flex-col px-4 py-2 gap-0 items-center justify-center'>
                <p className='text-xl font-semibold text-center text-headingColor'>Do you want to delete this card?</p>
                <div className='flex items-center gap-4'>
                    <motion.button 
                        className='px-2 py-2 text-sm uppercase bg-red-300 rounded-md hover:bg-red-500 cursor-pointer'
                        whileTap={{scale: 0.7}}   
                        onClick={() => deleteCard(data)} 
                    >
                        Yes
                    </motion.button>
                    <motion.button 
                        className='px-2 py-2 text-sm uppercase bg-green-300 rounded-md hover:bg-green-500 cursor-pointer'
                        whileTap={{scale: 0.7}}  
                        onClick={() => {setIsDelete(false)}}  
                    >
                        No
                    </motion.button>
                </div>
            </motion.div>
            }
            
        </motion.div>
    )
}

export default SongCard