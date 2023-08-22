import React, { createContext, useState } from "react";

// Create the context
export const MyContext = createContext();

// Create a provider component
export const MyContextProvider = ({ children }) => {
  const [step, setStep] = useState(2);

  return (
    <MyContext.Provider value={{ step, setStep }}>
      {children}
    </MyContext.Provider>
  );
};
