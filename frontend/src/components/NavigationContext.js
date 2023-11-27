// NavigationContext.js
import React, { createContext, useState, useContext } from 'react';
import { defaultRegion } from './constants';

const NavigationContext = createContext();

export const useNavigation = () => {
  return useContext(NavigationContext);
};

export const NavigationProvider = ({ children }) => {
  const [selectedRegion, setSelectedRegion] = useState(defaultRegion);

  const [selectedHierarchy, setSelectedHierarchy] = useState({
    hierarchyId: 1,
  });

  return (
    <NavigationContext.Provider
      value={{
        selectedRegion,
        setSelectedRegion,
        selectedHierarchy,
        setSelectedHierarchy,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
