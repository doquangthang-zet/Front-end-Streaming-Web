import React from 'react'
import { useStateValue } from '../../context/StateProvider';
import { motion } from "framer-motion";
import { RiPlayListFill } from "react-icons/ri";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const MusicPlayer = () => {
    const [{allSongs, songIndex, isSongPlaying}, dispatch] = useStateValue();
return (
    <div className='w-full full flex items-center gap-3 overflow-hidden'>
        <div className='w-full full items-center gap-3 p-4'>
            <img src={allSongs[songIndex]?.imageURL} alt="" className='w-40 h-20 object-cover rounded-md' />

            <div className="flex items-start flex-col">
                <p className="text-xl text-headingColor font-semibold">
                    {`${
                    allSongs[songIndex]?.name.length > 20
                        ? allSongs[songIndex]?.name.slice(0, 20)
                        : allSongs[songIndex]?.name
                    }`}{" "}
                    <span className="text-base">({allSongs[songIndex]?.album})</span>
                </p>
                <p className="text-textColor">
                    {allSongs[songIndex]?.artist}{" "}
                    <span className="text-sm text-textColor font-semibold">
                    ({allSongs[songIndex]?.category})
                    </span>
                </p>

                <motion.i
                    whileTap={{ scale: 0.8 }}
                    // onClick={() => setIsPlayList(!isPlayList)}
                >
                    <RiPlayListFill className="text-textColor hover:text-headingColor text-3xl cursor-pointer" />
                </motion.i>
            </div>

            <div className="flex-1">
                <AudioPlayer 
                    src={allSongs[songIndex]?.songURL}
                    onPlay={() => {console.log("is playing")}}
                    autoPlay={true}
                    showSkipControls={true}
                />
            </div>
        </div>
    </div>
)
}

export default MusicPlayer