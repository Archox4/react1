import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { onValue, orderByChild, query, ref } from 'firebase/database';
import { MdDeleteForever } from "react-icons/md";

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [keys, setKeys] = useState([]);

    const [accRole, setAccRole] = useState('');
    var i = 0;
    var postIteration = 0;
    const postsRef = ref(db, "posts/");

    function getPosts(){
        setPosts([]);
        if(posts.length > 0){
        }
        onValue(postsRef,  (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                setPosts(state => [...state, childSnapshot.val()]);
                setKeys(state2 => [...state2, childSnapshot.key]);
            })
        }, (error) =>{
            console.log(error);
        });
    };

    function deletePost(postKey){
        console.log(postKey);
    }

    function userRole(){
        
        if(auth.currentUser != null){
            const accRef = ref(db, "users/" + auth.currentUser.uid);
            onValue(accRef, (snapshot) => {
                
                setAccRole(snapshot.val()['role']);
            }, (error) => {
                console.log(error);
            })
            
        }
    }
    //const mostViewedPosts = query(ref(db, 'posts'), orderByChild('metrics/views'));
    //https://firebase.google.com/docs/database/web/lists-of-data?hl=pl


    useEffect(() => {
        // const mostViewedPosts = query(ref(db, 'posts'), orderByChild('contentImage'));

        // onValue(mostViewedPosts, (snapshot) =>{
        //     console.log(snapshot.val());
        // });
        if(accRole === ""){
            userRole();
        }
        console.log("user role: " + accRole);
        getPosts();
        
        
    }, []);

    if(posts[0] !== undefined){
        return (
            <>
            {posts.map((post) =>
                <div key={i++} className='w-100 d-flex flex-column align-items-center pt-3'>
                    <a id='post_box' href={"post?" + keys[postIteration++]} className='w-50 border-3 border-black rounded' style={{textDecoration: "none"}}>
                        <div className="card rounded p-1">
                            <h5 className="card-title mt-1">{post.title}</h5>
                            {post.contentImage !== undefined &&
                                <img src={post.contentImage} className="card-img-top rounded" alt={post.contentImage}/>
                            }
                            {post.contentText !== undefined &&
                                <p className="card-text mt-2">{post.contentText}</p>
                            }
                            
                        </div>
                    </a>
                    {accRole === "admin" && 
                        <a href={"postDelete?" + keys[postIteration]} style={{textDecoration: "none"}} className='w-50 border-1 rounded mb-2 mt-1'>Delete post<MdDeleteForever></MdDeleteForever></a>
                    }
                </div>
            )}
            </>

    )
    } else {
        return (
            <>
                <div className='w-100 h-100 d-flex justify-content-center mt-4'>
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </>
        )
    }
    
    

    
}

export default Posts;
