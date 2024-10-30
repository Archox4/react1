import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import PostExtended from './pages/PostExtended';


function App() {
  return (
    <Router>
      <div>
        <section>                              
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/newPost" element={<CreatePost/>}/>
              <Route path="/post" element={<PostExtended/>}/>
            </Routes>                    
        </section>
        
      </div>
    </Router>
  );
}

export default App;
