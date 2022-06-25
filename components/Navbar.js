import UserContext from '../lib/context';
import { useEffect, useRef, useContext } from 'react';
import UserDiv from './UserDiv';
const NavBar = (props) => {
  const user = useContext(UserContext);

  return (
    <div className='fixed top-2 right-5 z-[1000000] transition-all'>
      <UserDiv user={user.user} />
    </div>
  );
};

export default NavBar;
