/*************************************************************** 
*Title: Admin Album Song Page
*Author: Luy Nguyen, Thang Do
*Date: 20 Dec 2022
*Code version: V1 
*Availability: https://github.com/doquangthang-zet/Front-end-Streaming-Web/tree/main/muzikland 
****************************************************************/ 
import React, {useState} from 'react'
import { useEffect } from 'react';
import { useStateValue } from '../../context/StateProvider';
import { getAllSongs } from '../../api';
import { actionType } from '../../context/reducer';
import SongCard from './SongCard';

const AdminAlbumSongs = () => {
  const [songFilter, setSongFilter] = useState("");
  const [focus, setfocus] = useState(false);
  const [{allSongs}, dispatch] = useStateValue();

  useEffect(() => {
    if(!allSongs) {
      getAllSongs().then((res) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: res.song,
        })
      })
    }
  }, []);

  return (
    <div className='adminNewSongs left-64 p-4 flex items-center justify-center flex-col'>
      <div className='w-full flex justify-center gap-20 items-center'>
        <input 
          type="text" 
          className={`w-52 px-4 py-3 ${focus ? "border-gray-500 shadow-md" : "border-gray-300"} rounded-md bg-white outline-none duration-150 transition-all ease-in-out text-base}`} 
          placeholder='Search song by name' 
          value={songFilter} 
          onChange={(e) => {setSongFilter(e.target.value)}}
          onBlur={() => {setfocus(false)}}
          onFocus={() => {setfocus(true)}}
        />
      </div>

      {/* Main container */}
      <div className='relative w-full my-4 py-16 border border-gray-300 rounded-md'> 
        {/* Count */}
        {/* <div className='absolute top-4 left-4'>
          <p className='text-xl font-bold text-yellow-50'>
            <span className='text-xl font-semibold'>Count: </span>
            {allSongs && allSongs?.length}
          </p>
        </div> */}

        <SongContainer data={allSongs} songFilter={songFilter} />
      </div>
    </div>
  )
}

export const SongContainer = ({data, songFilter}) => {
    const [{currentAlbum}, dispatch] = useStateValue();

  return (
    <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
      {data && songFilter ? 
      data.filter(s => s.album === currentAlbum.name)
      .filter((song) => song.name.toLowerCase().includes(songFilter.toLowerCase()))
      .map((song, i) =>
      (<SongCard key={song._id} data={song} index={i} type="song" />))
      : data.filter(s => s.album === currentAlbum.name)
      .map((song, i) => 
      (
        <SongCard key={song._id} data={song} index={i} type="song" />
      ))}
    </div>
  )
}

export default AdminAlbumSongs