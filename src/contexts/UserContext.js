import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // obten el item que esta guardado en el localstorage llamado user
    const savedUser = localStorage.getItem("USER");
    //  si existe el item, quiero que actualices el user de mi contexto
    savedUser && setUser(JSON.parse(savedUser));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
