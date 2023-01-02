/*************************************************************** 
*Title: Alert
*Author: Luy Nguyen, Thang Do
*Date: 20 Dec 2022
*Code version: V1 
*Availability: https://github.com/doquangthang-zet/Front-end-Streaming-Web/tree/main/muzikland 
****************************************************************/ 
import React from 'react'
import {} from "react-icons/io"
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5'
import { MdOutlineSmsFailed } from "react-icons/md"
import {motion} from 'framer-motion'

const Alert = ({type}) => {
  return (
    <motion.div 
        className={`fixed z-20 top-10 right-11 p-4 rounded-md backdrop:blur-md flex items-center justify-center shadow-md ${type === "success" && "bg-green-400"} ${type === "danger" && " bg-red-500"}`}
        initial={{translateX: 100, opacity: 0}}
        animate={{translateX: 0, opacity: 1}}
        exit={{translateX: 100, opacity: 0}}
    >
        {type === "success" && (
            <div className='flex justify-center gap-3'>
                <IoCheckmarkDoneCircleOutline className='text-3xl text-white' />
                <p className='font-semibold text-white text-xl'>Data saved</p>
            </div>
        )}

        {type === "danger" && (
            <div className='flex justify-center gap-3'>
                <MdOutlineSmsFailed className='text-3xl text-white' />
                <p className='font-semibold text-white text-xl'>You may missing something. Please try again!</p>
            </div>
        )}
    </motion.div>
  )
}

export default Alert