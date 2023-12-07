import React, { useState, useEffect } from 'react';
import { getAllUsers, getFollowers, followUser, unfollowUser } from '../services/userService';
import './UserList.css';

const UserList = ({ user }) => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const userId = user.ID; // The ID of the current user

    useEffect(() => {
        getAllUsers().then(response => {
            setUsers(response.data);
        }, err => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        getFollowers(userId).then(response => {
            const followerIds = response.data.followers;
            setUsers(prevUsers => prevUsers.map(user => ({
                ...user,
                isFollowing: followerIds.includes(user.ID)
            })));
        }, err => {
            console.log(err);
        });
    }, []);

    const handleFollowToggle = async (followeeId) => {
        const isFollowing = users.find(user => user.ID === followeeId).isFollowing;
        if (isFollowing) {
            await unfollowUser(userId, followeeId);
        } else {
            await followUser(userId, followeeId);
        }

        // Refresh the followers list
        getFollowers(userId).then(response => {
            const followerIds = response.data.followers;
            setUsers(prevUsers => prevUsers.map(user => ({
                ...user,
                isFollowing: followerIds.includes(user.ID)
            })));
        });
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredUsers = users.filter(user => {
        const regex = new RegExp(searchQuery, 'i');
        return regex.test(user.Username);
    });

    return (
        <div className="userlist-container">
            <input
                type="text"
                placeholder="Search by username..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="userlist-searchbar"
            />

            {filteredUsers.map(user => (
                <div key={user.ID} className="user-card">
                    <h3>{user.Username}</h3>
                    <button 
                        type='button' 
                        className='btn btn-primary'
                        onClick={() => handleFollowToggle(user.ID)}
                    >
                        {user.isFollowing ? 'Unfollow' : 'Follow me'}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default UserList;
