import React, {useState} from 'react'
import { useStateValue } from '../../context/StateProvider';
import { motion } from "framer-motion";
import { RiPlayListFill } from "react-icons/ri";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useEffect } from 'react';
import { getAllSongs } from "../../api";
import { actionType } from '../../context/reducer';
import { IoArrowRedo, IoClose, IoMusicalNote } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';

const MusicPlayer = () => {

    const [{allSongs, songIndex, isSongPlaying, miniPlayer}, dispatch] = useStateValue();
    const [isSongList, setIsSongList] = useState(false);

    const closePlayer = () => {
        dispatch({
            type: actionType.SET_ISSONG_PLAYING,
            isSongPlaying: false,
        })
        dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex: "",
        })
    }

    const togglePlayer = () => {
        if (miniPlayer) {
          dispatch({
            type: actionType.SET_MINI_PLAYER,
            miniPlayer: false,
          });
        } else {
          dispatch({
            type: actionType.SET_MINI_PLAYER,
            miniPlayer: true,
          });
        }
    };

    let idx;
    allSongs.forEach((element, i) => {
        if(element._id == songIndex) {
            idx = i;
        }
    });

    const nextTrack = () => {
        if (idx == allSongs.length-1) {
          dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex: allSongs[0]._id,
          });
        } else {
          dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex: allSongs[idx+1]._id,
          });
        }
    };

    const previousTrack = () => {
        if (idx == 0) {
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: allSongs[0]._id,
            });
        } else {
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: allSongs[idx-1]._id,
            });
        }
    };

    useEffect(() => {
        if (idx > allSongs.length) {
          dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex: allSongs[0]._id,
          });
        }
    }, [songIndex]);

return (
        <div className='w-full flex items-center gap-3 ml-60'>
        <div className={`w-full full items-center gap-3 p-4 ${
          miniPlayer ? "absolute top-40" : "flex relative"
        }`}>
            <img src={allSongs.filter((song) => song._id == songIndex)[0].imageURL} alt="" className='w-40 h-20 object-cover rounded-md' />

            <div className="flex items-start flex-col">
                <p className="text-xl text-headingColor font-semibold">
                    {`${
                    allSongs.filter((song) => song._id == songIndex)[0].name.length > 20
                        ? allSongs.filter((song) => song._id == songIndex)[0].name.slice(0, 20)
                        : allSongs.filter((song) => song._id == songIndex)[0].name
                    }`}{".. "}
                    {allSongs.filter((song) => song._id == songIndex)[0].album && <span className="text-base">({allSongs.filter((song) => song._id == songIndex)[0].album})</span>}
                </p>
                <p className="text-textColor">
                    {allSongs.filter((song) => song._id == songIndex)[0].artist}{" "}
                    <span className="text-sm text-textColor font-semibold">
                    ({allSongs.filter((song) => song._id == songIndex)[0].category})
                    </span>
                </p>

                <motion.i
                    whileTap={{ scale: 0.8 }}
                    onClick={() => setIsSongList(!isSongList)}
                >
                    <RiPlayListFill className="text-textColor hover:text-headingColor text-3xl cursor-pointer" />
                </motion.i>
            </div>

            <div className="flex-1">
                <AudioPlayer 
                    src={allSongs.filter((song) => song._id == songIndex)[0].songURL}
                    onPlay={() => {console.log("is playing")}}
                    autoPlay={true}
                    showSkipControls={true}
                    onClickNext={nextTrack}
                    onClickPrevious={previousTrack}
                />
            </div>

            {isSongList && <PlaylistCard />}

            <div className="h-full flex items-center justify-center flex-col gap-3">
                <motion.i whileTap={{ scale: 0.8 }} onClick={closePlayer}>
                    <IoMdClose className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
                </motion.i>
                <motion.i whileTap={{ scale: 0.8 }} onClick={togglePlayer}>
                    <IoArrowRedo className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
                </motion.i>
            </div>


            {miniPlayer && (
                <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed right-2 bottom-2 "
                >
                <div className="w-40 h-40 rounded-full flex items-center justify-center  relative ">
                    <div className="absolute inset-0 rounded-full bg-[#663399] blur-xl animate-pulse"></div>
                    <img
                    onClick={togglePlayer}
                    src={allSongs.filter((song) => song._id == songIndex)[0].imageURL}
                    className="z-50 w-32 h-32 rounded-full object-cover cursor-pointer"
                    alt=""
                    />
                </div>
                </motion.div>
            )}
        </div>
    </div>
    
)
}

export const PlaylistCard = () => {
    const [{allSongs, songIndex, isSongPlaying}, dispatch] = useStateValue();

    useEffect(() => {
        if(!allSongs) {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.song,
                })
            })
        }
    }, []);

    const setCurrentPlaySong = (songindex) => {
        if (!isSongPlaying) {
          dispatch({
            type: actionType.SET_ISSONG_PLAYING,
            isSongPlaying: true,
          });
        }

        if (songIndex !== songindex) {
          dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex: songindex,
          });
        }
    };

    return (
        <div className='absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-purple-100'>
            {allSongs.length > 0 ? (
                allSongs.map((song, index) => (
                    <motion.div
                        // initial={{ opacity: 0, translateX: -50 }}
                        // animate={{ opacity: 1, translateX: 0 }}
                        // transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer ${
                            song?._id == songIndex ? "bg-card" : "bg-transparent"
                          }`}
                        onClick={() => setCurrentPlaySong(song._id)}
                        key={index}
                    >
                         <IoMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />

                         <div className="flex items-start flex-col">
                            <p className="text-lg text-headingColor font-semibold">
                                {`${
                                song?.name.length > 20
                                    ? song?.name.slice(0, 20)
                                    : song?.name
                                }`}{" "}
                                <span className="text-base">({song?.album})</span>
                            </p>
                            <p className="text-textColor">
                                {song?.artist}{" "}
                                <span className="text-sm text-textColor font-semibold">
                                ({song?.category})
                                </span>
                            </p>
                        </div>
                    </motion.div>
                ))
            ) : <></>}
        </div>
    )
}

export default MusicPlayer