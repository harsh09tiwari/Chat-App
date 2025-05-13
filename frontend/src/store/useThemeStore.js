import {create} from 'zustand';

export const useThemeStore = create((set) => ({   // create a store using zustand
    theme: localStorage.getItem("insta-theme") || "bumblebee",   //  store the theme in local storage so that it can be accessed later
    setTheme: (theme) => {  // set the theme in local storage and state
        localStorage.setItem("insta-theme", theme);   
        set({theme});  // 
    }
}));
