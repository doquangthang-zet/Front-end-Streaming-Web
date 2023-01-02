/*************************************************************** 
*Title: About Users Page
*Author: Luy Nguyen, Thang Do
*Date: 20 Dec 2022
*Code version: V1 
*Availability: https://github.com/doquangthang-zet/Front-end-Streaming-Web/tree/main/muzikland 
****************************************************************/ 
import React, {useState, useEffect} from 'react'
import { useStateValue } from '../../context/StateProvider'
import { motion } from 'framer-motion'
import moment from 'moment'
import { getAllUsers, removeUser, updateUserRole } from '../../api'
import { actionType } from '../../context/reducer'
import { MdDelete } from 'react-icons/md'

const AdminUsers = () => {
  const [{allUsers}, dispatch] = useStateValue();
  const [userFilter, setUserFilter] = useState("");
  const [focus, setfocus] = useState(false);
  
  useEffect(() => {
    getAllUsers().then((data) => {
      dispatch({
        type: actionType.SET_ALL_USERS,
        allUsers: data.users
      })
    })
  }, []);

  return (
    <div className='adminUsers p-6 w-full flex items-center justify-center flex-col'>
      {/* filter */}
      <div className='w-full flex justify-center gap-20 items-center'>
        <input 
          type="text" 
          className={`w-96 px-4 py-3 ${focus ? "border-gray-500 shadow-md" : "border-gray-300"} rounded-md bg-white outline-none duration-150 transition-all ease-in-out text-base}`} 
          placeholder='Search by name/email' 
          value={userFilter} 
          onChange={(e) => {setUserFilter(e.target.value)}}
          onBlur={() => {setfocus(false)}}
          onFocus={() => {setfocus(true)}}
        />
      </div>
      {/* tabular data form */}
      <div className="relative w-full py-16 min-h-[400px] overflow-x-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
        {/* total count of the users */}
        <div className='absolute top-4 left-4'>
          <p className='text-xl font-semibold text-yellow-50'>
            Count <span className='text-xl font-bold text-yellow-50'>{allUsers?.length}</span>
          </p>
        </div>

        {/* table data */}
        <div className='w-full min-w-[750px] flex items-center justify-between my-10'>
          <p className="text-sm text-yellow-50 font-semibold w-275 min-w-[160px] text-center">Image</p>
          <p className="text-sm text-yellow-50 font-semibold w-275 min-w-[160px] text-center">Name</p>
          <p className="text-sm text-yellow-50 font-semibold w-275 min-w-[160px] text-center">Email</p>
          <p className="text-sm text-yellow-50 font-semibold w-275 min-w-[160px] text-center">Verified</p>
          <p className="text-sm text-yellow-50 font-semibold w-275 min-w-[160px] text-center">Created</p>
          <p className="text-sm text-yellow-50 font-semibold w-275 min-w-[160px] text-center">Role</p>
        </div>

        {/* table body content */}
        {
          allUsers && 
            // allUsers?.map((data, i) => (
            //   <AdminUserCard data={data} index={i} />
            // ))
            userFilter ? 
              allUsers.filter((user) => user.name.toLowerCase().includes(userFilter.toLowerCase()) || user.email.toLowerCase().includes(userFilter.toLowerCase()))
              .map((user, i) =>
                (<AdminUserCard data={user} index={i} />)
              )
              : allUsers?.map((data, i) => (
                <AdminUserCard data={data} index={i} />
              ))
        }
      </div>
    </div>
  )
}

export const AdminUserCard = ({data, index}) => {
  const createdAt = moment(new Date(data.createdAt)).format('MMMM Do YYYY, h:mm:ss a');
  const [{user}, dispatch] = useStateValue();
  const [isUserRoleUpdate, setisUserRoleUpdate] = useState(false);
  const [isRemoveUser, setisRemoveUser] = useState(false);

  const changeUserRole = (userId, newRole) => {
    updateUserRole(userId, newRole).then((res) => {
      if(res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.users
          })
        })
      }
    });
    setisUserRoleUpdate(false);
  }

  const deleteUser = (userId) => {
    removeUser(userId).then((res) => {
      if(res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.users
          })
        })
      }
    });
    setisRemoveUser(false);
  }

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay"
    >
      {/* Delete button */}
      {
        data._id !== user?.user._id && (
          <motion.div
            whileTap={{scale: 0.75}}
            className='absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200 cursor-pointer'
            onClick={() => setisRemoveUser(true)}
          >
            <MdDelete className='text-xl text-red-400 hover:text-red-500' />
          </motion.div>
        )
      }
      {
        isRemoveUser && 
        <motion.div 
          initial={{opacity: 0, scale: 0.5}} 
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.5}}           
          className='absolute z-10 top-6 left-4 p-4 flex items-start flex-col bg-white gap-4 shadow-xl rounded-md'>
          <p className='text-textColor text-sm font-semibold'>Are you sure to delete this user??</p>
          <div className='flex items-center gap-4'>
            <motion.button whileTap={{scale: 0.75}} onClick={() => {deleteUser(data._id)}} className="outline-none border-none text-sm px-4 py-1 rounded-md bg-red-600 text-black hover:shadow-md">
              Yes
            </motion.button>

            <motion.button whileTap={{scale: 0.75}} onClick={() => setisRemoveUser(false)} className="outline-none border-none text-sm px-4 py-1 rounded-md bg-gray-200 text-black hover:shadow-md">
              No
            </motion.button>
          </div>
        </motion.div>
      }
    
      {/* users images */}
      <div className='w-275 min-w-[160px] flex items-center justify-center'>
        <img src={data.imageURL} alt='' className='w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md' referrerPolicy='no-referrer' />
      </div>

      {/* user names */}
      <p className='text-base text-orange-50 w-275 min-w-[160px] text-center'>{data.name}</p>

      {/* user emails */}
      <p className='text-base text-orange-50 w-275 min-w-[160px] text-center'>{data.email}</p>

      {/* user email verified */}
      <p className='text-base text-orange-50 w-275 min-w-[160px] text-center'>{data.email_verified ? "true" : "false"}</p>

      {/* user create time */}
      <p className='text-base text-orange-50 w-275 min-w-[160px] text-center'>{createdAt}</p>

      {/* user role */}
      <div className='w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative'>
        <p className='text-base text-orange-50 w-275 min-w-[160px] flex justify-center gap-2'>
          {data.role === "member" ? "Member" : "Admin"}
          {
            data._id !== user?.user._id && (
              <motion.p whileTap={{scale: 0.75}} onClick={() => setisUserRoleUpdate(true)} className='text-[10px] font-semibold text-textColor p-1 bg-purple-200 rounded-sm hover:shadow-md cursor-pointer'>
                {data.role === "admin" ? "Demote" : "Promote"}
              </motion.p>
            )
          }
        </p>
        
        {
          isUserRoleUpdate && 
          <motion.div 
            initial={{opacity: 0, scale: 0.5}} 
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.5}}           
            className='absolute z-10 top-6 right-4 p-4 flex items-start flex-col bg-white gap-4 shadow-xl rounded-md'>
            <p className='text-textColor text-sm font-semibold'>Are you sure to mark the user as {data.role === "admin" ? "member" : "admin"}??</p>
            <div className='flex items-center gap-4'>
              <motion.button whileTap={{scale: 0.75}} onClick={() => {changeUserRole(data._id, data.role === "admin" ? "member" : "admin")}} className="outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-black hover:shadow-md">
                Yes
              </motion.button>

              <motion.button whileTap={{scale: 0.75}} onClick={() => setisUserRoleUpdate(false)} className="outline-none border-none text-sm px-4 py-1 rounded-md bg-gray-200 text-black hover:shadow-md">
                No
              </motion.button>
            </div>
          </motion.div>
        }
        
      </div>
    </motion.div>
  )
}

export default AdminUsers