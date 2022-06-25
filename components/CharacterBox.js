import React from 'react';
import Image from 'next/image';

const CharacterBox = ({ data }) => {
  return (
    <div className='w-full h-20 bg-slate-200/50 shadow-sm rounded-md relative'>
      <div className='w-1/4 h-full absolute top-0 left-0'>
        <div className='w-full h-full relative top-0 left-0'>
          <Image
            className='rounded-l-md'
            layout='fill'
            src={data.node.image.medium}
            alt={data.node.name.userPreferred}
          />
        </div>
      </div>
      <div className='w-full h-full flex flex-col justify-center items-end pr-5'>
        <div className='font-medium'>{data.node.name.userPreferred}</div>
      </div>
    </div>
  );
};

export default CharacterBox;
