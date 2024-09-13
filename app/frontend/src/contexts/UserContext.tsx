import { createContext,useEffect, useState} from "react";
import axios from "axios";
export const UserContext = createContext({});

// USER CONTEXT FOR LATER

export function UserContextProvider(props: {children: React.ReactNode}){
  const [user,setUser] = useState(null);
  const [ready,setReady] = useState(false);
  useEffect(() => {
    if (!user){
      axios.get('/profile').then(({data}) => {
        setUser(data);
        setReady(true);
      });
    } 
   }, []);
  return(
    <UserContext.Provider value = {{user,setUser,ready}}>
      {props.children}
    </UserContext.Provider>   
  );
}