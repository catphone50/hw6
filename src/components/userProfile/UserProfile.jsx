import styles from "./UserProfile.module.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userNum, setUserNum] = useState(1);
  const [photo, setPhoto] = useState("");

  async function fetchUser() {
    try {
      setLoading(true);
      const [responseUser, responsePhoto] = await Promise.all([
        axios.get(`https://jsonplaceholder.typicode.com/users/${userNum}`),
        axios.get(`https://jsonplaceholder.typicode.com/photos/${userNum}`),
      ]);

      setUser(responseUser.data);
      setPhoto(responsePhoto.data.url);
    } catch (error) {
      console.error("Error fetching user data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [userNum]);

  function handleClick() {
    userNum < 10 ? setUserNum(userNum + 1) : setUserNum(1);
  }

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!user) {
    return <div className={styles.error}>Error loading user data.</div>;
  }

  return (
    <div className={styles.container}>
      <h2>User Profile</h2>
      <img src={photo} alt="photo" />
      <h2>Name: {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <button onClick={handleClick}>Load new user</button>
    </div>
  );
}

export default UserProfile;
