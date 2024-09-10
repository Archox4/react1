import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { onValue, ref } from 'firebase/database';

const Posts = () => {

    var posts = [];
    const [test, settest] = useState([]);
    var i = 0;

    useEffect(() => {
        const username = ref(db, 'posts/');
        onValue(username, (snapshot) => {
            const childKey = snapshot.key;
            const childData = snapshot.val();
            settest(childData);
            console.log(posts);
        }, {
            onlyOnce: true
        });
    }, []);

    return (
            <>
                <ul className='list-group w-100 d-flex flex-column align-items-center'>
                    {test.map((post) => 
                    <li key={i++} className='list-group-item w-100 d-flex flex-column align-items-center'>
                        <div className="card w-50">
                            <h5 className="card-title w-100 text-center">Card title</h5>
                            <img src={post.contentImage} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <p className="card-text">{post.contentText}</p>
                                <a href="#" className="btn btn-primary">{post.likes}</a>
                                <a href="#" className="btn btn-primary">{post.dislikes}</a>
                            </div>
                        </div>
                    </li>
                    )}
                </ul>
            </>
    )
    

    
}

export default Posts;
