import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { onValue, ref } from 'firebase/database';


const Posts = () => {

    const [posts, setPosts] = useState([]);
    var i = 0;
    const postsRef = ref(db, "posts/");

    function getPosts(){
        setPosts([]);
        if(posts.length > 0){
            console.log(">");
        }
        onValue(postsRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                setPosts(state => [...state, childSnapshot.val()]);
                console.log("adding: " + childSnapshot.val());
            })
            //aaaaa
        }, (error) =>{
            console.log(error);
        });
    };


    useEffect(() => {
        
        getPosts();
        
    }, []);

    if(posts[0] !== undefined){
        return (
            <>
                <ul className='list-group w-100 d-flex flex-column align-items-center'>
                    {posts.map((post) => 
                    <li key={i++} className='list-group-item w-100 d-flex flex-column align-items-center'>
                        <div className="card w-50">
                            <h5 className="card-title w-100 text-center">Card title</h5>
                            {post.contentImage !== undefined &&
                                <img src={post.contentImage} className="card-img-top" alt={post.contentImage}/>
                            }
                            <div className="card-body">
                                {post.contentText !== undefined &&
                                    <p className="card-text">{post.contentText}</p>
                                }
                                <button href="#" className="btn btn-primary">{post.likes}</button>
                                <button href="#" className="btn btn-primary">{post.dislikes}</button>
                            </div>
                        </div>
                    </li>
                    )}
                </ul>
            </>
    )
    }
    
    

    
}

export default Posts;
