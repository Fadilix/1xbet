import React, { createContext, useContext, useState } from 'react';

const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  const setRole = (role) => {
    setUserRole(role);
  };

  return (
    <UserRoleContext.Provider value={{ userRole, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  return useContext(UserRoleContext);
};
