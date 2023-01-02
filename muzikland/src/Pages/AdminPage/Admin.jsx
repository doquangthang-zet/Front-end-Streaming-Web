/*************************************************************** 
*Title: Admin Page
*Author: Luy Nguyen, Thang Do
*Date: 20 Dec 2022
*Code version: V1 
*Availability: https://github.com/doquangthang-zet/Front-end-Streaming-Web/tree/main/muzikland 
****************************************************************/ 
import Alert from './Alert'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header } from '../HeaderComponent/Header'
import { SideBar } from '../SideBarComponent/SideBar'
import AdminAlbums from './AdminAlbums'
import AdminHome from './AdminHome'
import AdminNewSong from './AdminNewSong'
import AdminSongs from './AdminSongs'
import AdminUsers from './AdminUsers'
import { useStateValue } from '../../context/StateProvider'
import AdminAlbumSongs from './AdminAlbumSongs'
import AdminNewAlbum from './AdminNewAlbum'

const Admin = () => {
  const [{alertType}, dispatch] = useStateValue();

  return (
    <div>
        <Header />
        <SideBar />
        
        <div className="pl-60">
          <Routes>
            <Route path='/home' element={<AdminHome />} />
            <Route path='/users' element={<AdminUsers />} />
            <Route path='/songs' element={<AdminSongs />} />
            {/* <Route path='/artists' element={<AdminArtists />} /> */}
            <Route path='/albums' element={<AdminAlbums />} />
            <Route path='/albumSongs' element={<AdminAlbumSongs />} />
            <Route path='/newSong' element={<AdminNewSong />} />
            <Route path='/newAlbum' element={<AdminNewAlbum />} />
          </Routes>
        </div>
        {alertType && (<Alert type={alertType} />)}
    </div>
  )
}

export default Admin