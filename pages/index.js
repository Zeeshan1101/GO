import { motion } from "framer-motion";
import { gql } from "@apollo/client";
import BoxList from "../components/BoxList";
import { useQuery } from "@apollo/client/react";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import Head from "next/head";

export default function Home() {
  const { data, loading } = useQuery(HomePageQuery);
  if (loading) {
    return <Loader />;
  }
  return (
    <motion.div
      className="h-full w-full overflow-x-hidden pt-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Head>
        <title>Home</title>
      </Head>
      <div className="container md:w-1/4 sm:w-2/4  w-3/6 mx-auto text-4xl font-semibold text-gray-600 flex items-center justify-center capitalize relative">
        <SearchBar />
      </div>
      <>
        <div className="container w-10/12 pt-1 mx-auto">
          <div className="trending-content w-full">
            <BoxList
              title="Trending Anime"
              data={data.trendingAnime.media}
              type="anime"
            />
          </div>
          <div className="popular-content w-full">
            <BoxList
              title="Popular Anime"
              data={data.popularAnime.media}
              type="anime"
            />
          </div>
        </div>
      </>
      <>
        <div className="container w-10/12 pt-3 mx-auto">
          <div className="trending-content w-full">
            <BoxList
              title="Trending MANGA"
              data={data.trendingManga.media}
              type="manga"
            />
          </div>
          <div className="popular-content w-full">
            <BoxList
              title="Popular MANGA"
              data={data.popularManga.media}
              type="manga"
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
      media(sort: [POPULARITY_DESC], type: ANIME) {
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
