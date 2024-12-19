import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext =createContext();

const ThemeProvider = ({children})=>{
const [isDarkMode,setIsDarkMode] =useState(false)
  

const changeTheme =()=>{

    setIsDarkMode((Mode)=>!Mode)

}
const data ={isDarkMode,changeTheme};


useEffect(()=>{

},[isDarkMode])

    return(
        <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>
    )
}

export const useThemeContext = ()=>{
   const context = useContext(ThemeContext)
   return context
}

export {ThemeProvider};
export default ThemeContext;