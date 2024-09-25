import React, { useState, useEffect } from 'react';
import NavControl from './NavControl';
import { db, auth, storage } from '../firebase';
import { ref , listAll, uploadBytes, getDownloadURL   } from "firebase/storage";
import {  ref as dbRef, set, push } from 'firebase/database';

import {  useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const navigate = useNavigate(); 
    const charactersTab = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','0','1','2',
        '2','3','4','5','6','7','8','9'];
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [contentImage, setContentImage] = useState("");
    const [image, setImage] = useState();
    const listRef = ref(storage, 'images');
  


    function cancel(){
        navigate('/');
    }

    function generateName(){
        var name = "";
        for(var i = 0; i < charactersTab.length; i++){
            name += charactersTab[Math.floor(Math.random() * charactersTab.length)];
        }
        return name;
    }
    async function imageNameExists(imageName){
        var nameExists = false;

        await listAll(listRef).then((res) => {
            res.prefixes.forEach((folderRef) => {
                console.log(folderRef);
            });
            res.items.forEach((itemRef) => {
                if(itemRef.name === imageName){
                    nameExists = true;
                }
            });
            
        });

        return Promise.resolve(nameExists);
    }

    function getFileExtension(filename){
        let arr = filename.split("");
        let start = 0;
        let extension = "";
        let x = false;
        for(let i = 0; i < arr.length; i++){
            if(arr[i] === '.'){
                start = i;
                x = true;
            }
            if(x){
                extension += arr[i];
            }
        }
        
        return extension;
    }

    async function handleSubmit(){
       var x = true;
       var name = generateName();

       while(x === true){
        
        var y = await imageNameExists(name);
            if(y === false){
                x = false;
                if(title.length > 0 && text.length > 0){
                    let fullImageName = name + getFileExtension(image.name);
                    setContentImage(fullImageName);
                    const metadata = {name: fullImageName};
                    
                    const imageRef = ref(storage, 'images/' + fullImageName);
                    const postsRef = dbRef(db, "posts");
                    // sending image
                    const uploadTask = uploadBytes(imageRef, image, metadata).then((e) => {
                        // getting image url
                        getDownloadURL(imageRef).then((url) => {
                            let date = new Date(Date.now());
                            
                            push(postsRef, {
                                    contentImage: url,
                                    contentText: text,
                                    dislikes: 0,
                                    likes: 0,
                                    title: title,
                                    uid: auth.currentUser.uid,
                                    views: 0,
                                    createdDate: date.toLocaleString()
                                });

                        });
                    }) ;   

                }
            } else{
                console.log("image name exists: " + name);
                name = generateName();
            }
            
       }
        
        
    }

    useEffect(() => {
        auth.onAuthStateChanged(() => {
            navigate(window.location.pathname);
        });
    }, [])

    if(auth.currentUser != null){
        return (
            <>
            <NavControl/>
            
            <div className='w-100 d-flex justify-content-center flex-column align-items-center mt-4'>
                <h2>New Post</h2>
                <div className='w-50 mt-3'>
                    <div className="input-group mb-3">
                        <span className="input-group-text bg-secondary" id="inputGroup-sizing-default">Title</span>
                        <input type="text bg-secondary" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text bg-secondary" id="inputGroup-sizing-default">Image</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control"/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text bg-secondary">Text</span>
                        <textarea className="form-control" value={text} onChange={(e) => setText(e.target.value)} aria-label="With textarea" rows="5" maxLength="260"></textarea>
                    </div>
                    <div className="input-group d-flex justify-content-end mt-2">
                        <button className='btn btn-danger me-2' onClick={cancel}>Cancel</button>
                        <button className='btn btn-primary' onClick={handleSubmit}>Create post</button>
                    </div>
                </div>
            </div>
                
            </>
        )

    } else{
        return (
            <p className='w-100 text-center mt-4'>To create post you have to be signed in <a className='link-underline-primary' href='/login'>click to sign in</a></p>
        )
        
    }
 
}

export default CreatePost;
