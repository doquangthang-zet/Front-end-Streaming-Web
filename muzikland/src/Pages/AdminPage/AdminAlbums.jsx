import React, {useEffect} from 'react'
import { AiOutlineClear } from 'react-icons/ai';
import { IoAdd } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { getAllAlbum } from '../../api';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import SongCard from './SongCard';

function AdminAlbums() {
  const [{allAlbums}, dispatch] = useStateValue();

  useEffect(() => {
    if(!allAlbums) {
      getAllAlbum().then((res) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: res.album,
        })
      })
    }
  }, []);

  return (
    <div className=' left-64 p-4 flex items-center justify-center flex-col bg-black'>
      <div className='w-full flex justify-center gap-20 items-center'>
        <NavLink to={"/dashboard/newAlbum"} className="flex items-center justify-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer">
          <IoAdd />
        </NavLink>
        {/* <input 
          type="text" 
          className={`w-52 px-4 py-3 ${focus ? "border-gray-500 shadow-md" : "border-gray-300"} rounded-md bg-white outline-none duration-150 transition-all ease-in-out text-base}`} 
          placeholder='Search here' 
          value={songFilter} 
          onChange={(e) => {setSongFilter(e.target.value)}}
          onBlur={() => {setfocus(false)}}
          onFocus={() => {setfocus(true)}}
        /> */}
        <i>
          <AiOutlineClear className='text-3xl text-textColor cursor-pointer' />
        </i>
      </div>

      {/* Main container */}
      <div className='relative w-full my-4 py-16 border border-gray-300 rounded-md'> 
        {/* Count */}
        <div className='absolute top-4 left-4'>
          <p className='text-xl font-bold text-yellow-50'>
            <span className='text-xl font-semibold'>Count: </span>
            {allAlbums && allAlbums?.length}
          </p>
        </div>

        <AlbumContainer data={allAlbums} />
      </div>
    </div>
  )
}

export const AlbumContainer = ({data}) => {
  return (
    <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
      {data && data.map((song, i) => (
        <SongCard key={song._id} data={song} index={i} type="album" />
      ))}
    </div>
  )
}

export default AdminAlbums