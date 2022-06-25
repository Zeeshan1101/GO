import '../styles/globals.css';
import UserContext from '../lib/context';
import { useState } from 'react';
import { useAuth } from '../lib/hooks';
import { AnimatePresence } from 'framer-motion';
import NavBar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();

  useAuth().then((data) => setUser(data));

  return (
    <>
      <UserContext.Provider value={{ user: user }}>
        <NavBar />
        <div className='bg-slate-300 h-[100vh]'>
          <AnimatePresence>
            <Component {...pageProps} />
          </AnimatePresence>
        </div>
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
