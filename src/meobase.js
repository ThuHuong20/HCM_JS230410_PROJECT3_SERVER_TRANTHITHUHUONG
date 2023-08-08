import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXtg7RW9hqp3rLApDuWAO9D1VEG25yOq8",
  authDomain: "bvlgari-23072.firebaseapp.com",
  projectId: "bvlgari-23072",
  storageBucket: "bvlgari-23072.appspot.com",
  messagingSenderId: "701399627867",
  appId: "1:701399627867:web:c7edca21b43ad2eb18e77e",
  measurementId: "G-K0V040VQ5Y"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// tạo ra storage
export const storage = getStorage(app);


/* 
  1st params: your file, 2nd params: folder you need 
  return 
    if failed => false
    if success => url file
*/
export async function uploadFileToStorage(fileUploads, folderName, bufferData) {
  // nếu file là null thì không làm gì hết
  if (!fileUploads) {
    return false
  }

  let fileRef;
  let metadata;
  if (!bufferData) {
    // tên file trên file base
    fileRef = ref(storage, `${folderName}/` + fileUploads.name);
  } else {
    // tên file trên file base
    fileRef = ref(storage, `${folderName}/` + fileUploads.filename);
    metadata = {
      contentType: fileUploads.mimetype,
    };
  }
  let url;
  if (bufferData) {
    // upload file lên fire storage
    url = await uploadBytes(fileRef, bufferData, metadata).then(async res => {
      // khi up thành công thì tìm URL
      return await getDownloadURL(res.ref)
        .then(url => url)
        .catch(er => false)
    })
  } else {
    // upload file lên fire storage
    url = await uploadBytes(fileRef, fileUploads).then(async res => {
      // khi up thành công thì tìm URL
      return await getDownloadURL(res.ref)
        .then(url => url)
        .catch(er => false)
    })
  }


  return url
}

/* 
  only params: folder name
  return 
    if failed => false
    if success => array url link
*/
export async function getFileInFolder(folderName) {
  const listRef = ref(storage, folderName);

  return await listAll(listRef).then(async (res) => {
    let result = []; // tạo array trống

    for (let i in res.items) {
      let url = await getDownloadURL(res.items[i])
        .then(url => url)
        .catch(er => false)
      if (!url) {
        return false
      }
      result.push(url)
    }

    return result
  })
} 