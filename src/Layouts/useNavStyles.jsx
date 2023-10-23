import { useCallback } from "react";

export const useNavStyles = () => {

    const getItemStyle = useCallback( (to, location) => {

        const isActive = path => {
            return location.pathname === path;
          };

        return `
            block py-2 pl-3 pr-4
            rounded 
            bg-blue-50
            md:bg-white
            md:p-0 
            dark:text-white 
            md:dark:text-blue-500 
            ${isActive(to) 
                ? 'text-blue-800' 
                : 'bg-gray-50 text-gray-500 hover:bg-blue-50 md:hover:bg-transparent md:hover:text-blue-500'
            }`
    }, [])

    return { getItemStyle }
}