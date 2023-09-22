import '@/styles/globals.css'
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {

  const [darkMode, setDarkMode] = useState(false);

  // Update the dark mode class on initial render and whenever darkMode changes
  useEffect(() => {
    const className = 'dark';
    const element = window.document.body;
    if (darkMode) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }, [darkMode]);

  // return <Component {...pageProps} />
  return (
    <>
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>
      <Component {...pageProps} />
    </>
  );
}
