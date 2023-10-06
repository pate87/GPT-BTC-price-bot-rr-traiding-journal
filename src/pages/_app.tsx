import '@/styles/globals.css'
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }: AppProps) {

  const [theme, setTheme] = useState("light");

   // On initial load, set theme from local storage or system preference
   useEffect(() => {
    const initialTheme = localStorage.getItem('theme') || window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    // Update body class and local storage when theme changes
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

   // Toggle theme
   const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // return <Component {...pageProps} />
  return (
    <>
    <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
      {/* <button
        className="bg-gray-900 text-white dark:bg-gray-100 dark:text-black p-2 rounded-lg shadow-md"
        onClick={toggleTheme}
      >
        Toggle Theme
      </button> */}
      <Component {...pageProps} />
    </>
  );
}
