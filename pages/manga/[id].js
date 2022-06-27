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
import invert from 'invert-color';
import { useQuery } from '@apollo/client/react';
import Loader from '../../components/Loader';
import Head from 'next/head';
import Link from 'next/link';

export default function Manga(props) {
  const { query } = useRouter();
  const [CurrentTab, setCurrentTab] = useState('relations');
  const { data, loading } = useQuery(MangaQuery, {
    variables: {
      id: query.id,
      sort: 'ID',
    },
  });
  if (loading) {
    return <Loader />;
  }
  const { manga } = data;
  console.log(manga);
  return (
    <motion.div
      className='h-full w-full overflow-x-hidden'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Head>
        <title>{manga.title.english || manga.title.userPreferred}</title>
      </Head>
      <div className='h-1/3 w-full absolute top-0 left-0 pt-2 px-1'>
        <div className='h-full w-full absolute z-10 top-0 bg-slate-300 bg-opacity-40 font-bold'></div>
        {manga.bannerImage && (
          <>
            <div className='h-full w-[99%] relative mx-auto'>
              <Image
                priority
                className='rounded-t-2xl'
                layout='fill'
                src={manga.bannerImage}
                alt={manga.title.userPreferred}
              />
            </div>
            <div className='w-full h-1/5 absolute blur-2xl bottom-[-10px] left-1/2 -translate-x-1/2'>
              <div
                className='w-full h-full relative '
                style={{
                  backgroundColor: manga.coverImage.color || '#2F0882',
                }}></div>
            </div>
          </>
        )}
      </div>
      <div className='h-[max-content] w-full absolute top-1/3 mt-48 bg-slate-300 pb-20'>
        <div className='container w-9/12 mx-auto'>
          <Description>{parse(manga.description)}</Description>

          <div
            className={`w-full flex relative left-1/2 -translate-x-1/2 justify-evenly flex-wrap md:max-w-xl md:hidden pt-5 gap-y-1`}>
            {manga.genres.map((genre, id) => (
              <Link key={id} href={`/manga?genre=${genre}`}>
                <a>
                  <div
                    className='px-4 py-2 rounded-xl text-sm'
                    style={{
                      backgroundColor: manga.coverImage.color || '#2F0882',
                      color: invert(manga.coverImage.color || '#2F0882', {
                        black: '#475569',
                        white: '#F1F5F9',
                      }),
                    }}>
                    {genre}
                  </div>
                </a>
              </Link>
            ))}
          </div>
          <Tab
            CurrentTab={CurrentTab}
            setCurrentTab={setCurrentTab}
            color={manga.coverImage.color || '#2F0882'}
          />

          {CurrentTab === 'relations' && (
            <div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='container grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 gap-y-10 mt-10'>
              {manga.relations.edges.slice(0, 12).map((manga) => (
                <Box key={manga.id} id={manga.id} data={manga.node} />
              ))}
            </div>
          )}
          {CurrentTab === 'character' && (
            <div className='container  grid  md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 gap-y-5 px-10 mt-10 md:px-0 '>
              {manga.characters.edges.map((character, id) => (
                <CharacterBox key={id} data={character} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className='h-[max-content] w-[max-content] relative top-1/3 mx-auto -translate-y-1/2 z-[100] md:grid md:grid-flow-col '>
        <div className='md:h-[21rem] md:w-[14rem] h-[18rem] w-[12rem] relative border-b-0 border-[4px] border-slate-300 mx-auto scale-80'>
          <Image
            priority
            layout='fill'
            src={manga.coverImage.extraLarge}
            alt={manga.title.userPreferred}
          />
        </div>
        <div className='w-[max-content] relative mx-auto '>
          <div className='w-[max-content] relative top-1/2 -translate-1/2 mx-2 md:text-left text-center'>
            <span
              className='w-[max-content] px-2 py-1 rounded-lg absolute -top-[40px] md:translate-x-0 -translate-x-1/2 '
              style={{
                backgroundColor: manga.coverImage.color || '#2F0882',
                color: invert(manga.coverImage.color || '#2F0882', {
                  black: '#475569',
                  white: '#F1F5F9',
                }),
              }}>
              {manga.status.replace(/_/g, ' ')}
            </span>
            <div className='lg:text-5xl md:text-4xl sm:text-3xl text-lg font-semibold '>
              {manga.title.english || manga.title.userPreferred}
            </div>

            {manga.chapters && (
              <div className=' lg:text-left'>
                Total Chapters :
                <span
                  className='font-bold text-xl'
                  style={{ color: manga.coverImage.color || '#2F0882' }}>
                  {manga.chapters}
                </span>
              </div>
            )}
            <div className='container w-11/12 md:pt-4'>
              <div className='md:flex flex-wrap hidden gap-1 gap-y-1'>
                {manga.genres.map((genre, id) => (
                  <Link key={id} href={`/manga?genre=${genre}`}>
                    <a>
                      <div
                        key={id}
                        className='px-3  rounded-xl'
                        style={{
                          backgroundColor: manga.coverImage.color || '#2F0882',
                          color: invert(manga.coverImage.color || '#2F0882', {
                            black: '#475569',
                            white: '#F1F5F9',
                          }),
                        }}>
                        {genre}
                      </div>
                    </a>
                  </Link>
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
    query: MangaQuery,
    variables: {
      id: params.id,
      sort: 'ID',
    },
  });
  return {
    props: data,
  };
}

const MangaQuery = gql`
  query ($id: Int, $sort: [CharacterSort], $page: Int, $perPage: Int) {
    manga: Media(id: $id, type: MANGA) {
      id
      title {
        english
        userPreferred
      }
      bannerImage
      coverImage {
        extraLarge
        color
      }
      description
      status
      chapters
      genres
      relations {
        edges {
          node {
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
    }
  }
`;
