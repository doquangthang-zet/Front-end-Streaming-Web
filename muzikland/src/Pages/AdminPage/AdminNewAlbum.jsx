/*************************************************************** 
*Title: Admin New Albums Page
*Author: Luy Nguyen, Thang Do
*Date: 20 Dec 2022
*Code version: V1 
*Availability: https://github.com/doquangthang-zet/Front-end-Streaming-Web/tree/main/muzikland 
****************************************************************/ 
import React, {useState} from 'react'
import { useEffect } from 'react';
import { getAllAlbum, saveNewAlbum } from '../../api';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {storage} from "../../config/firebase.config";
import {motion} from 'framer-motion';

const AdminNewAlbum = () => {
  // Album states
  const [albumImageCover, setAlbumImageCover] = useState(null);
  const [albumUploadingProgress, setAlbumUploadingProgress] = useState(0);
  const [isAlbumLoding, setIsAlbumLoding] = useState(false);
  const [albumName, setAlbumName] = useState("");
  const [albumCategory, setAlbumCategory] = useState("")

  const [{allArtists, allAlbums, allSongs, artistFilter, albumFilter, filterTerm, languageFilter, alertType}, dispatch] = useStateValue();

  useEffect(() => {
    if(!allAlbums) {
      getAllAlbum().then(data => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album,
        })
      })
    }
  }, []);

  const deleteFileObject = (url, isImage) => {
    if(isImage) {
      setIsAlbumLoding(true);
    }

    const deleteRef = ref(storage, url);
    deleteObject(deleteRef)
    .then(() => {
      setAlbumImageCover(null);

      setIsAlbumLoding(false);
    })
  };

  const saveAlbum = () => {
    if(!albumImageCover || !albumName) {
      // Throw alert 
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      })

      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        })
      }, 5000);
    } else {
      // Save the album
      setIsAlbumLoding(true);
      
      const data = {
        name: albumName,
        imageURL: albumImageCover,
        category: albumCategory,
      };

      saveNewAlbum(data).then(res => {
        getAllAlbum().then((albums) => {
          dispatch({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums: albums.album,
          })
        })
      });

      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      })

      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        })
      }, 5000);

      setAlbumName("");
      setAlbumCategory("");
      setIsAlbumLoding(false);
      setAlbumImageCover(null);
    }
  };

  return (
    <div className='adminNewAlbums flex flex-col items-center justify-center p-4 border border-gray-300 gap-4 pt-5'>
        {/* Album uploading */}
        <p className='text-3xl font-semibold text-yellow-300'>Album uploading section</p>
        <div className='bg-card backdrop:blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer flex justify-center items-center mb-4'>
            {isAlbumLoding && <ImageLoader progress={albumUploadingProgress} />}
            {!isAlbumLoding && (
            <>
                {!albumImageCover ? (
                <FileUploader updateState={setAlbumImageCover} setProgress={setAlbumUploadingProgress} isLoading={setIsAlbumLoding} isImage={true} />
                ) : (
                <div className='relative w-full h-full overflow-hidden rounded-md'>
                    <img src={albumImageCover} className="w-full h-full object-cover" alt="" />
                    <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl 
                    cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                    onClick={() => {deleteFileObject(albumImageCover, true)}}>
                    <MdDelete className='text-white' />
                    </button>
                </div>
                )}
            </>
            )}
        </div>

        <input 
            type="text" 
            placeholder='Type album name'
            className='p-3 w-full rounded-md text-base font-semibold text-yellow-50 outline-none
            shadow-sm border border-gray-300 bg-transparent'
            value={albumName}
            onChange={(e) => {setAlbumName(e.target.value)}}
        />

        <input 
            type="text" 
            placeholder='Type album category'
            className='p-3 w-full rounded-md text-base font-semibold text-yellow-50 outline-none
            shadow-sm border border-gray-300 bg-transparent'
            value={albumCategory}
            onChange={(e) => {setAlbumCategory(e.target.value)}}
        />

        {/* Save album button */}
        <div className='flex items-center justify-center w-60 p-4'>
            {isAlbumLoding ? (
            <DisableButton />
            ) : (
            <motion.div onClick={saveAlbum} className='px-8 py-2 rounded-md w-full text-white text-center cursor-pointer bg-purple-800 hover:text-lg hover:bg-yellow-500' whileTap={{scale: 0.75}}>
                Save Album
            </motion.div>
            )}
        </div>
    </div>
  )
}

export const ImageLoader = (progress) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-xl font-semibold text-yellow-200 z-10">
        {Math.round(progress) >= 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className="w-20 h-20 min-w-[40px] bg-red-600  animate-ping  rounded-full flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full bg-red-600 blur-xl "></div>
      </div>
    </div>
  )
}

export const FileUploader = ({updateState, setProgress, isLoading, isImage}) => {
  const uploadFile = (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];
    const storageRef = ref(storage, `${isImage ? "images" : "audios"}/${Date.now()}-${uploadedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    uploadTask.on("state_changed", (snapshot) => {
      // console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    },
    (err) => {
      console.log(err);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        updateState(downloadURL);
        isLoading(false);
      })
    })
  }
  return (
    <label>
      <div className='flex items-center justify-center flex-col h-full'>
        <div className='flex flex-col items-center justify-center cursor-pointer'>
          <p className='font-bold text-2xl'>
            <BiCloudUpload />
          </p>

          <p className='text-lg'>Click to upload {isImage ? "an image." : "an audio."}</p>
        </div>
      </div>

      <input type="file" className='w-0 h-0' onChange={uploadFile} name='upload-file' accept={`${isImage ? "image/*" : "audio/*"}`} />
    </label>
  )
}

export const DisableButton = () => {
  return (
    <button disabled type="button" class="text-white bg-purple-800 hover:bg-purple-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
      <svg role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
      </svg>
      Saving...
    </button>
  )
}

export default AdminNewAlbum