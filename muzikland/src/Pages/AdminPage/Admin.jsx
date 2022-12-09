import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header } from '../HeaderComponent/Header'
import { SideBar } from '../SideBarComponent/SideBar'
import AdminAlbums from './AdminAlbums'
import AdminArtists from './AdminArtists'
import AdminHome from './AdminHome'
import AdminNewSong from './AdminNewSong'
import AdminSongs from './AdminSongs'
import AdminUsers from './AdminUsers'

const Admin = () => {
  return (
    <div>
        <Header />
        <SideBar />
        
        <div className='pl-64'>
          <Routes>
            <Route path='/home' element={<AdminHome />} />
            <Route path='/users' element={<AdminUsers />} />
            <Route path='/songs' element={<AdminSongs />} />
            <Route path='/artists' element={<AdminArtists />} />
            <Route path='/albums' element={<AdminAlbums />} />
            <Route path='/newSong' element={<AdminNewSong />} />
          </Routes>
        </div>
    </div>
  )
}

export default Admin