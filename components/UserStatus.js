import { useQuery, gql, useMutation } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../pages/apollo-client';
import invert from 'invert-color';
import { motion, AnimatePresence } from 'framer-motion';
const UserStatus = ({ color, id, media }) => {
  const { user } = useAuth();
  const ref = useRef();
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  });
  const { data, loading } = useQuery(
    UserQuery,
    {
      variables: {
        userId: user.id,
        id: id,
      },
    },
    []
  );
  const [statusCompleted] = useMutation(StatusMutation, {
    variables: {
      mediaId: id,
      status: 'COMPLETED',
    },
    onCompleted: (data) => {
      console.log(data);
      setShow(!show);
      setLoad(false);
    },
  });

  const [statusPlan] = useMutation(StatusMutation, {
    variables: {
      mediaId: id,
      status: 'PLANNING',
    },
    onCompleted: (data) => {
      console.log(data);
      setShow(!show);
      setLoad(false);
    },
  });

  const [statusWatching] = useMutation(StatusMutation, {
    variables: {
      mediaId: id,
      status: 'CURRENT',
    },
    onCompleted: (data) => {
      console.log(data);
      setShow(!show);
      setLoad(false);
    },
  });

  const [statusDrop] = useMutation(StatusMutation, {
    variables: {
      mediaId: id,
      status: 'DROPPED',
    },
    onCompleted: (data) => {
      console.log(data);
      setShow(!show);
      setLoad(false);
    },
  });
  if (loading) {
    return <div></div>;
  }
  const styles = {
    backgroundColor: color || '#2F0882',
    color: invert(color || '#2F0882', {
      black: '#475569',
      white: '#F1F5F9',
    }),
  };
  return (
    <>
      <div ref={ref} className='relative w-full'>
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, animationDelay: '0.3s' }}
              exit={{ opacity: 0 }}
              className='btn-group-vertical absolute -translate-y-full w-full text-center  pb-1 item-group '>
              <button
                className={`btn w-full -z-10 no-animation border-none xyz`}
                onClick={() => {
                  statusCompleted();
                  setLoad(true);
                }}
                style={styles}>
                Completed
              </button>
              <button
                className={`btn w-full -z-10 no-animation border-none `}
                onClick={statusWatching}
                style={styles}>
                {media === 'anime' ? 'Watching' : 'Reading'}
              </button>
              <button
                className={`btn w-full -z-10 no-animation border-none `}
                onClick={statusPlan}
                style={styles}>
                PLan to {media === 'anime' ? 'Watch' : 'Read'}
              </button>
              <button
                className={`btn w-full -z-10 no-animation border-none `}
                onClick={statusDrop}
                style={styles}>
                Drop
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          className={`w-44 px-3 h-4 max-h-1 min-h-[2rem] md:mx-0 mx-auto  flex items-center z-20 justify-center rounded-lg uppercase btn border-none no-animation ${
            load ? 'loading' : ''
          }`}
          onClick={() => setShow(!show)}
          style={styles}>
          {data ? displayStatus(data.status.status, media) : 'Add To List'}
          <span
            className={`material-symbols-rounded -rotate-90 transition-all ${
              show ? '-rotate-180' : ''
            }`}>
            expand_more
          </span>
        </button>
      </div>
    </>
  );
};
const displayStatus = (status, media) => {
  switch (status) {
    case 'CURRENT':
      return media === 'anime' ? 'Watching' : 'Reading';
    case 'PLANNING':
      return `Plan To ${media === 'anime' ? 'Watch' : 'Read'}`;
    case 'COMPLETED':
      return 'completed';
    case 'DROPPED':
      return 'Dropped';
    case 'REPEATING':
      return 'Rewatching';
    default:
      return '';
  }
};

const UserQuery = gql`
  query ($id: Int, $userId: Int) {
    status: MediaList(mediaId: $id, userId: $userId) {
      id
      status
    }
  }
`;
const StatusMutation = gql`
  mutation SaveMediaListEntry($mediaId: Int, $status: MediaListStatus) {
    SaveMediaListEntry(mediaId: $mediaId, status: $status) {
      id
      status
    }
  }
`;
export default UserStatus;
