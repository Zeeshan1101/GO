import React from 'react';
import { useRouter } from 'next/router';
import { Formik, Field } from 'formik';

const MyInput = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};

const SearchBar = () => {
  const router = useRouter();
  return (
    <>
      <Formik
        initialValues={{ search: '', type: 'anime' }}
        onSubmit={(values) => {
          router.push({
            pathname: `/${values.type}`,
            query: { search: values.search },
          });
        }}>
        {({ values, handleSubmit }) => (
          <form method='post' className='w-full' onSubmit={handleSubmit}>
            <Field
              id='type'
              name='type'
              type='select'
              className='select rounded-full absolute left-0 bottom-0 focus:outline-0'
              placeholder='Search for anime'
              as='select'
              value={values.type}>
              <option value='anime'>Anime</option>
              <option value='manga'>Manga</option>
            </Field>
            <Field
              id='search'
              name='search'
              type='text'
              className='input w-full rounded-full pl-28'
              placeholder={`Search for ${values.type}`}
              value={values.search}
              component={MyInput}
            />
          </form>
        )}
      </Formik>
    </>
  );
};

export default SearchBar;
