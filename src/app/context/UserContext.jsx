import React, { createContext, useState } from "react";

export const UserContext = createContext("");

export const UserProvider = ({ children, user }) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
