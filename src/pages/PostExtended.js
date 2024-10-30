import React, { useState, useEffect } from 'react';
import  NavControl  from './NavControl';
import { db } from '../firebase';
import { child, get, ref } from 'firebase/database';

const PostExtended = () => {

    const [postData, setPostData] = useState([]);

    useEffect(()=>{
        var href = window.location.href;
        var tab = href.split("?");
        if(tab[1] !== undefined){
            var postRef = ref(db, "posts/" + tab[1]);
            get(postRef).then((snapshot) => {
                if(snapshot.exists()){
                    setPostData(snapshot.val());
                } else{

                }
                //console.log(snapshot.val());
                
            });
        }
    }, [])

    if(postData.title !== undefined){
        return (
            <>        
                <NavControl/>
                <div className='w-100 d-flex justify-content-center text-light mt-4 flex-column align-items-center'>
                    <div className='w-50 d-flex flex-column justify-content-center align-items-center'>
                        <h1>{postData.title}</h1>
                        {postData.contentImage !== undefined &&
                            <img src={postData.contentImage} className="card-img-top"/>
                        }
                        {
                            postData.contentText !== undefined && 
                            <p className="text-light mt-2">{postData.contentText}</p>
                        }
                    </div>
                </div>
            </>
          )
    } else{
        return(
            <>        
                <NavControl/>
                <div className='w-100 d-flex justify-content-center text-light mt-4 flex-column align-items-center'>
                    <div className='w-50 d-flex flex-column justify-content-center align-items-center'>
                        <h2></h2>
                    </div>
                </div>
            </>
        )
        
    }
  
}

export default PostExtended