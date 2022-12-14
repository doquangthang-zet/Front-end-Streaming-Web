/*************************************************************** 
*Title: About Songs Page
*Author: Luy Nguyen, Thang Do
*Date: 20 Dec 2022
*Code version: V1 
*Availability: https://github.com/doquangthang-zet/Front-end-Streaming-Web/tree/main/muzikland 
****************************************************************/ 
import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { useEffect } from 'react';
import { useStateValue } from '../../context/StateProvider';
import { getAllSongs } from '../../api';
import { actionType } from '../../context/reducer';
import SongCard from './SongCard';

const AdminSongs = () => {
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
    <div className='adminSongs left-64 p-4 flex items-center justify-center flex-col'>
      <div className='w-full flex justify-center gap-20 items-center'>
        <NavLink to={"/dashboard/newSong"} className="flex items-center justify-center p-3 border rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer">
          <IoAdd className='text-2xl' />
        </NavLink>
        <input 
          type="text" 
          className={`w-52 px-4 py-3 ${focus ? "border-gray-500 shadow-md" : "border-gray-300"} rounded-md bg-white outline-none duration-150 transition-all ease-in-out text-base}`} 
          placeholder='Search song by name' 
          value={songFilter} 
          onChange={(e) => {setSongFilter(e.target.value)}}
          onBlur={() => {setfocus(false)}}
          onFocus={() => {setfocus(true)}}
        />
        <i>
          {/* <AiOutlineClear className='text-3xl text-textColor cursor-pointer' /> */}
        </i>
      </div>

      {/* Main container */}
      <div className='relative w-full my-4 py-16 border border-gray-300 rounded-md'> 
        {/* Count */}
        <div className='absolute top-4 left-4'>
          <p className='text-xl font-bold text-yellow-50'>
            <span className='text-xl font-semibold'>Count: </span>
            {allSongs && allSongs?.length}
          </p>
        </div>

        <SongContainer data={allSongs} songFilter={songFilter} />
      </div>
    </div>
  )
}

export const SongContainer = ({data, songFilter}) => {
  return (
    <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
      {data && songFilter ? 
      data.filter((song) => song.name.toLowerCase().includes(songFilter.toLowerCase()))
      .map((song, i) =>
      (<SongCard key={song._id} data={song} index={i} type="song" />))
      : data.map((song, i) => 
      (
        <SongCard key={song._id} data={song} index={i} type="song" />
      ))}
    </div>
  )
}

export default AdminSongs