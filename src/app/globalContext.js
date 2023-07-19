'use client'
// context/GlobalContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  // Your global state data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check if user is logged in (you can implement your own logic here)
    const userToken = localStorage.getItem('jwtToken');
    if (userToken) {
      // User is logged in, you can set isLoggedIn to true and fetch user data here
      setIsLoggedIn(true);
      // Fetch user data using Axios or any other method and set it to the state
      // For example:
      // axios.get('/users/profile')
      //   .then((response) => setUserData(response.data.userData))
      //   .catch((error) => console.log(error));
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ isLoggedIn, userData }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
