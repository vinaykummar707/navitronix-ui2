import React, { createContext, useContext, useEffect, useState } from "react";

const LanguageConfigContext = createContext<any[]>([]);

export const LanguageConfigProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [configs, setConfigs] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.navitronix.in/navitranix/api/languages/all")
      .then(res => res.json())
      .then(data => setConfigs(data))
      .catch(() => setConfigs([]));
  }, []);

  return (
    <LanguageConfigContext.Provider value={configs}>
      {children}
    </LanguageConfigContext.Provider>
  );
};

export const useLanguageConfigs = () => useContext(LanguageConfigContext);