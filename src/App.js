// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Feed from './Feed';
import MyPosts from './components/MyPosts';
import './App.css';
import UserList from './components/UserList';


const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Feed</Link>
            </li>
            <li>
              <Link to="/myposts">My Posts</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/myposts" element={<MyPosts />} />
          <Route path="/" element={<Feed userId={1} />} /> {/* Example user ID */}
          <Route path="/users" element={<UserList user={1} />} /> {/* Example user ID */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
