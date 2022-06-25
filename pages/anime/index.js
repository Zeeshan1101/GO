import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Formik, Field } from 'formik';
import { gql } from '@apollo/client';
import client from '../apollo-client';
import Box from '../../components/Box';

const MyInput = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};

export default function Page(props) {
  console.log(props);
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <motion.div
      className='h-full w-full overflow-x-hidden pt-2'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className='container w-10/12 mx-auto mt-4'>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={(value) => {
            router.push({
              pathname: '/anime',
              query: { ...value },
            });
          }}>
          {({ values, handleSubmit }) => (
            <form
              method='post'
              onSubmit={handleSubmit}
              className='grid grid-cols-4'>
              <div className='grid'>
                <label htmlFor='search'>Search</label>
                <Field
                  id='search'
                  name='search'
                  type='text'
                  className='input'
                  placeholder='Search for anime'
                  value={values.search}
                  components={MyInput}
                />
              </div>
            </form>
          )}
        </Formik>

        <div className='mt-5 mb-10 grid grid-cols-6 gap-5 gap-y-10'>
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
    query: gql`
      query (
        $search: String
        $sort: [MediaSort]
        $isAdult: Boolean
        $type: MediaType
        $page: Int
        $perPage: Int
      ) {
        anime: Page(page: $page, perPage: $perPage) {
          media(search: $search, sort: $sort, isAdult: $isAdult, type: $type) {
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
    `,
    variables: {
      ...query,
      sort: 'FAVOURITES_DESC',
      isAdult: false,
      type: 'ANIME',
      page: 1,
      perPage: 18,
    },
  });
  return {
    props: data,
  };
}
