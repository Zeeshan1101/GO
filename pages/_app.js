import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import NavBar from '../components/Navbar';
import { AuthProvider } from './apollo-client';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <div className='bg-slate-300 h-[100vh]'>
          <AnimatePresence>
            <Component {...pageProps} />
          </AnimatePresence>
        </div>
      </AuthProvider>
    </>
  );
}

export default MyApp;
