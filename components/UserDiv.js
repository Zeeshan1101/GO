import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { removeCookies } from 'cookies-next';
const UserDiv = ({ user }) => {
  console.log(user);
  const router = useRouter();
  const Click = () => {
    removeCookies('token');
    router.reload(window.location.pathname);
  };
  return (
    <div>
      {!Boolean(user) && (
        <Link href='https://anilist.co/api/v2/oauth/authorize?client_id=8618&redirect_uri=http://localhost:3000/api/login&response_type=code'>
          <a className='w-[3.5rem] h-[3.5rem] bg-slate-600 py-2 px-2 hover:shadow-[rgba(0,0,0,0.35)_0px_5px_15px] flex items-center justify-center font-bold  rounded-full'>
            <span className='material-symbols-outlined text-slate-300'>
              login
            </span>
          </a>
        </Link>
      )}
      {Boolean(user) && (
        <>
          <div className=' w-[3.5rem] h-[3.5rem] relative group'>
            <div className='avatar w-full h-full relative'>
              {user.avatar.large ? (
                <Image
                  layout='fill'
                  className='rounded-full'
                  src={user.user.avatar.large}
                  alt=''
                />
              ) : (
                <div className='bg-neutral-focus text-neutral-content rounded-full w-24'>
                  <span>{user.name.slice(0, 1)}</span>
                </div>
              )}
            </div>
            <div className='w-[max-content] h-[max-content] absolute -bottom-[2rem] px-[0.8rem] pt-6 pb-2   -z-10 left-1/2 -translate-x-1/2 bg-slate-300 text-slate-500 rounded-t-lg rounded-b-full shadow-xl flex flex-col gap-1 align-middle items-center justify-center opacity-0 group-hover:opacity-100 group-hover:-bottom-[290%]  transition-all duration-500'>
              <Link href='/'>
                <a>
                  <span className='material-symbols-rounded'>home</span>
                </a>
              </Link>
              <Link href='/anime'>
                <a>
                  <span className='material-symbols-rounded'>
                    smart_display
                  </span>
                </a>
              </Link>
              <Link href='/'>
                <a>
                  <span className='material-symbols-rounded'>
                    import_contacts
                  </span>
                </a>
              </Link>
              <button onClick={Click}>
                <span className='material-symbols-outlined pb-5'>logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDiv;
