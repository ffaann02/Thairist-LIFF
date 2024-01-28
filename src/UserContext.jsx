import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isOpenAR, setIsOpenAR] = useState(false);
  const [userLocation,setUserLocation] = useState({
    lat:0,
    long:0
  })
  const setUser = (profile) => {
    setUserProfile(profile);
  };

  return (
    <UserContext.Provider value={{ userProfile, setUser,isOpenAR,setIsOpenAR ,userLocation,setUserLocation}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
