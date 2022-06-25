import Box from './Box';

export default function BoxList({ title, data, type }) {
  return (
    <>
      <div className='text-gray-500 text-2xl uppercase font-semibold pb-2 overflow-hidden'>
        {title}
      </div>
      <div className='w-full grid md:grid-cols-6 grid-cols-2 gap-4 pb-10'>
        {data.map((series) => (
          <Box key={series.id} data={series} type={type} />
        ))}
      </div>
    </>
  );
}
