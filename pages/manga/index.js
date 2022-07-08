import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Formik, Field } from "formik";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Box from "../../components/Box";
import Head from "next/head";

const MyInput = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};

export default function Page(props) {
  const router = useRouter();
  return (
    <motion.div
      className="h-full w-full overflow-x-hidden pt-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Head>
        <title>Manga</title>
      </Head>
      <div className="container w-10/12 mx-auto mt-4">
        <Formik
          initialValues={{ search: "", genre: "" }}
          onSubmit={(values) => {
            const valueToSend = values;
            for (let i in valueToSend) {
              if (valueToSend[i] === "") {
                delete valueToSend[i];
              }
            }
            router.push({
              pathname: "/manga",
              query: { ...valueToSend },
            });
          }}>
          {({ values, handleSubmit }) => (
            <form
              method="post"
              onSubmit={handleSubmit}
              className="flex justify-center items-end gap-3">
              <div className="grid">
                <label htmlFor="search">Search</label>
                <Field
                  id="search"
                  name="search"
                  type="text"
                  className="input"
                  placeholder="Search for manga"
                  value={values.search}
                  component={MyInput}
                />
              </div>
              <div className="grid">
                <label htmlFor="genre">Genre</label>
                <Field
                  id="genre"
                  name="genre"
                  type="select"
                  className="select"
                  as="select"
                  value={values.genre}>
                  <option>Genre</option>
                  {props.genre.map((genre, id) => {
                    return (
                      <option key={id} className="capitalize" value={genre}>
                        {genre}
                      </option>
                    );
                  })}
                </Field>
              </div>
              <div className="h-full">
                <button type="submit" className="btn h-full">
                  Search
                </button>
              </div>
            </form>
          )}
        </Formik>

        <div className="mt-5 mb-10 grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5 gap-y-10">
          {props.anime.media.map((anime, id) => (
            <Box key={id} data={anime} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export async function getServerSideProps({ query }) {
  const { data } = await client.query({
    query: SearchQuery,
    variables: {
      ...query,
      sort: "FAVOURITES_DESC",
      isAdult: false,
      type: "MANGA",
      page: 1,
      perPage: 18,
    },
  });
  return {
    props: data,
  };
}

const SearchQuery = gql`
  query (
    $search: String
    $sort: [MediaSort]
    $genre: String
    $isAdult: Boolean
    $type: MediaType
    $page: Int
    $perPage: Int
  ) {
    genre: GenreCollection
    anime: Page(page: $page, perPage: $perPage) {
      media(
        search: $search
        genre: $genre
        sort: $sort
        isAdult: $isAdult
        type: $type
      ) {
        type
        title {
          english
          userPreferred
        }
        id
        coverImage {
          color
          extraLarge
        }
      }
    }
  }
`;
