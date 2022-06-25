import { motion } from 'framer-motion';
import { gql } from '@apollo/client';
import client from './apollo-client';
import UserContext from '../lib/context';
import { useContext } from 'react';
import BoxList from '../components/BoxList';
export default function Home(props) {
  const { user } = useContext(UserContext);
  return (
    <motion.div
      className='h-full w-full overflow-x-hidden pt-2'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className='container w-full  mx-auto text-4xl font-semibold text-gray-600 flex items-center justify-center capitalize'>
        Welcome , {user ? `${user.user.name}` : '____________'}
      </div>
      <>
        <div className='container w-10/12 pt-3 mx-auto'>
          <div className='trending-content w-full'>
            <BoxList
              title='Trending Anime'
              data={props.trendingAnime.media}
              type='anime'
            />
          </div>
          <div className='popular-content w-full'>
            <BoxList
              title='Popular Anime'
              data={props.popularAnime.media}
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
              data={props.trendingManga.media}
              type='manga'
            />
          </div>
          <div className='popular-content w-full'>
            <BoxList
              title='Popular MANGA'
              data={props.popularManga.media}
              type='manga'
            />
          </div>
        </div>
      </>
    </motion.div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        trendingAnime: Page(page: 1, perPage: 6) {
          media(sort: [TRENDING_DESC], type: ANIME) {
            id
            coverImage {
              extraLarge
              large
              medium
              color
            }
            title {
              romaji
              english
              native
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
            coverImage {
              extraLarge
              large
              medium
              color
            }
            title {
              romaji
              english
              native
              userPreferred
            }
          }
        }
        trendingManga: Page(page: 1, perPage: 6) {
          media(sort: [TRENDING_DESC], type: MANGA) {
            id
            coverImage {
              extraLarge
              large
              medium
              color
            }
            title {
              romaji
              english
              native
              userPreferred
            }
          }
        }
        popularManga: Page(page: 1, perPage: 6) {
          media(sort: [POPULARITY_DESC], type: MANGA) {
            id
            coverImage {
              extraLarge
              large
              medium
              color
            }
            title {
              romaji
              english
              native
              userPreferred
            }
          }
        }
      }
    `,
  });

  return {
    props: data,
  };
}
