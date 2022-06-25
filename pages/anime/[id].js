import { motion } from 'framer-motion';
import { gql } from '@apollo/client';
import client from '../apollo-client';
import Image from 'next/image';
import parse from 'html-react-parser';
import Description from '../../components/Description';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Tab from '../../components/Tab';
import Box from '../../components/Box';
import CharacterBox from '../../components/CharacterBox';
import Timer from '../../components/Timer';

export default function Anime(props) {
  const router = useRouter();
  const [CurrentTab, setCurrentTab] = useState('relations');
  if (router.isFallback) {
    return <div>Loading....</div>;
  }

  return (
    <motion.div
      className='h-full w-full overflow-x-hidden'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className='h-1/3 w-full absolute top-0 left-0 pt-2 '>
        <div className='h-full w-full absolute z-10 top-0 bg-slate-300 bg-opacity-40 font-bold'>
          {props.anime.nextAiringEpisode && (
            <Timer
              time={props.anime.nextAiringEpisode.airingAt}
              color={props.anime.coverImage.color || '#2F0882'}
            />
          )}
        </div>
        {props.anime.bannerImage && (
          <>
            <div className='h-full w-[99%] relative mx-auto'>
              <Image
                className='rounded-t-2xl'
                layout='fill'
                src={props.anime.bannerImage}
                alt={props.anime.title.userPreferred}
              />
            </div>
            <div className='w-full h-1/5 absolute blur-2xl bottom-[-10px] left-1/2 -translate-x-1/2'>
              <div
                className='w-full h-full relative '
                style={{
                  backgroundColor: props.anime.coverImage.color || '#2F0882',
                }}></div>
            </div>
          </>
        )}
      </div>
      <div className='h-[max-content] w-full absolute top-1/3 mt-48 bg-slate-300 pb-20'>
        <div className='container w-9/12 mx-auto'>
          <Description>{parse(props.anime.description)}</Description>

          <div
            className={`w-full flex absolute left-1/2 -translate-x-1/2 justify-evenly md:max-w-xl md:hidden pt-5 gap-y-1`}>
            {props.anime.genres.map((genre, id) => (
              <div
                key={id}
                className='px-4 py-2 rounded-xl text-sm'
                style={{
                  backgroundColor: props.anime.coverImage.color || '#2F0882',
                }}>
                {genre}
              </div>
            ))}
          </div>
          <Tab
            CurrentTab={CurrentTab}
            setCurrentTab={setCurrentTab}
            color={props.anime.coverImage.color || '#2F0882'}
          />
          {CurrentTab === 'relations' && (
            <div className='container grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 gap-y-10 mt-10'>
              {props.anime.relations.edges.map((anime) => (
                <Box key={anime.id} id={anime.id} data={anime.node} />
              ))}
            </div>
          )}
          {CurrentTab === 'character' && (
            <div className='container  grid  md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 gap-y-5 px-10 mt-10 md:px-0 '>
              {props.anime.characters.edges.map((character, id) => (
                <CharacterBox key={id} data={character} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className='h-[max-content] w-[max-content] relative top-1/3 mx-auto -translate-y-1/2 z-[100] md:grid md:grid-flow-col '>
        <div className='md:h-[21rem] md:w-[14rem] h-[18rem] w-[12rem] relative border-b-0 border-[4px] border-slate-300 mx-auto scale-80'>
          <Image
            layout='fill'
            src={props.anime.coverImage.extraLarge}
            alt={props.anime.title.userPreferred}
          />
        </div>
        <div className='w-[max-content] relative mx-auto '>
          <div className='w-[max-content] relative top-1/2 -translate-1/2 mx-2 md:text-left text-center'>
            <span
              className='w-[max-content] px-2 py-1 rounded-lg absolute -top-[40px] md:translate-x-0 -translate-x-1/2 '
              style={{
                backgroundColor: props.anime.coverImage.color || '#2F0882',
                color: props.anime.coverImage.color ? '' : 'white',
              }}>
              {props.anime.status.replace(/_/g, ' ')}
            </span>
            <div className='lg:text-5xl  sm:text-2xl text-lg font-semibold '>
              {props.anime.title.english || props.anime.title.userPreferred}
            </div>

            {(props.anime.episodes || props.anime.nextAiringEpisode) && (
              <div className=' lg:text-left'>
                {Boolean(props.anime.episodes) ? 'Total' : 'Next'} Episode:
                <span
                  className='font-bold text-xl'
                  style={{ color: props.anime.coverImage.color || '#2F0882' }}>
                  {(props.anime.nextAiringEpisode &&
                    props.anime.nextAiringEpisode.episode) ||
                    props.anime.episodes}
                </span>
              </div>
            )}
            <div className='container w-11/12 md:pt-4'>
              <div className='md:flex flex-wrap hidden gap-1 gap-y-1'>
                {props.anime.genres.map((genre, id) => (
                  <div
                    key={id}
                    className='px-3  rounded-xl'
                    style={{
                      backgroundColor:
                        props.anime.coverImage.color || '#2F0882',
                      color: props.anime.coverImage.color ? '' : 'white',
                    }}>
                    {genre}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: gql`
      query ($id: Int, $sort: [CharacterSort], $page: Int, $perPage: Int) {
        anime: Media(id: $id) {
          id
          title {
            english
            romaji
            userPreferred
          }
          bannerImage
          coverImage {
            extraLarge
            large
            medium
            color
          }
          description
          status
          episodes
          genres
          relations {
            edges {
              node {
                id
                coverImage {
                  extraLarge
                  large
                  medium
                  color
                }
                title {
                  english
                  userPreferred
                }
              }
              id
            }
          }
          characters(sort: $sort, page: $page, perPage: $perPage) {
            edges {
              id

              node {
                name {
                  userPreferred
                }
                image {
                  medium
                }
              }
              role
            }
          }

          nextAiringEpisode {
            episode
            timeUntilAiring
            airingAt
          }
        }
      }
    `,
    variables: {
      id: params.id,
      sort: 'ID',
    },
  });
  return {
    props: data,
  };
}
