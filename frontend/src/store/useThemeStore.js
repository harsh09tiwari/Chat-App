import {create} from 'zustand';

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("insta-theme") || "bumblebee",
    setTheme: (theme) => {
        localStorage.setItem("insta-theme", theme);
        set({theme});
    }
}));
