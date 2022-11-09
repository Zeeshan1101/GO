import Box from "./Box";

export default function BoxList({ title, data, type }) {
  return (
    <>
      <div className="text-gray-500 text-2xl uppercase font-semibold pb-2 overflow-hidden">
        {title}
      </div>
      {data && (
        <div className="w-full grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 pb-10">
          {data.map((series, i) => (
            <Box key={i} data={series} type={type} />
          ))}
        </div>
      )}
    </>
  );
}
