import { motion } from 'framer-motion';
import { gql } from '@apollo/client';
import client from './apollo-client';
import { useAuth } from './apollo-client';
import BoxList from '../components/BoxList';
import { useQuery } from '@apollo/client/react';
import Loader from '../components/Loader';
export default function Home(props) {
  const { user } = useAuth();
  const { data, loading } = useQuery(HomePageQuery);
  if (loading) {
    return <Loader />;
  }
  return (
    <motion.div
      className='h-full w-full overflow-x-hidden pt-2'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className='container w-full  mx-auto text-4xl font-semibold text-gray-600 flex items-center justify-center capitalize'>
        Welcome , {user ? `${user.name}` : '____________'}
      </div>
      <>
        <div className='container w-10/12 pt-3 mx-auto'>
          <div className='trending-content w-full'>
            <BoxList
              title='Trending Anime'
              data={data.trendingAnime.media}
              type='anime'
            />
          </div>
          <div className='popular-content w-full'>
            <BoxList
              title='Popular Anime'
              data={data.popularAnime.media}
              type='anime'
            />
          </div>
        </div>
      </>
      <>
        <div className='container w-10/12 pt-3 mx-auto'>
          <div className='trending-content w-full'>
            <BoxList
              title='Trending MANGA'
              data={data.trendingManga.media}
              type='manga'
            />
          </div>
          <div className='popular-content w-full'>
            <BoxList
              title='Popular MANGA'
              data={data.popularManga.media}
              type='manga'
            />
          </div>
        </div>
      </>
    </motion.div>
  );
}

const HomePageQuery = gql`
  query {
    trendingAnime: Page(page: 1, perPage: 6) {
      media(sort: [TRENDING_DESC], type: ANIME) {
        id
        type
        coverImage {
          extraLarge
          color
        }
        title {
          english
          userPreferred
        }
      }
    }
    popularAnime: Page(page: 1, perPage: 6) {
      media(
        sort: [POPULARITY_DESC]
        type: ANIME
        seasonYear: 2022
        season: SUMMER
        status: NOT_YET_RELEASED
      ) {
        id
        type
        coverImage {
          extraLarge
          color
        }
        title {
          english
          userPreferred
        }
      }
    }
    trendingManga: Page(page: 1, perPage: 6) {
      media(sort: [TRENDING_DESC], type: MANGA) {
        id
        type
        coverImage {
          extraLarge

          color
        }
        title {
          english
          userPreferred
        }
      }
    }
    popularManga: Page(page: 1, perPage: 6) {
      media(sort: [POPULARITY_DESC], type: MANGA) {
        id
        type
        coverImage {
          extraLarge

          color
        }
        title {
          english
          userPreferred
        }
      }
    }
  }
`;
