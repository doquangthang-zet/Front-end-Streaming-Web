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

const Admin = () => {
  const [{alertType}, dispatch] = useStateValue();

  return (
    <div>
        <Header />
        <SideBar />
        
        <div className='pl-64'>
          <Routes>
            <Route path='/home' element={<AdminHome />} />
            <Route path='/users' element={<AdminUsers />} />
            <Route path='/songs' element={<AdminSongs />} />
            {/* <Route path='/artists' element={<AdminArtists />} /> */}
            <Route path='/albums' element={<AdminAlbums />} />
            <Route path='/newSong' element={<AdminNewSong />} />
            <Route path='/newAlbum' element={<AdminNewSong />} />
          </Routes>
        </div>
        {alertType && (<Alert type={alertType} />)}
    </div>
  )
}

export default Admin