import axios from 'axios';


// const instance = axios.create({
//     httpsAgent: new https.Agent({ rejectUnauthorized: false }) // Ignore SSL certificate validation
// });


const API_URL = 'http://a83ab0f0e6671462c87d9c3980002854-1490594495.us-west-2.elb.amazonaws.com'; 


export const getAllUsers = async () => {
    
    return await axios.get(`${API_URL}/users`);


};

export const followUser = async (followerId, followeeId) => {
    const payload = { follower_id: followerId, followee_id: followeeId };
    return await axios.post(`${API_URL}/follow`, payload);
};

export const unfollowUser = async (followerId, followeeId) => {
    const payload = { follower_id: followerId, followee_id: followeeId };
    return await axios.post(`${API_URL}/unfollow`, payload);
};

export const deleteUser = async (userId) => {
    return await axios.delete(`${API_URL}/users/${userId}`);
};


export const getFollowers = async (userId) => {    
    return await axios.get(`${API_URL}/followers/${userId}`);
}

