import React, { useState } from 'react';

const Description = ({ children }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <div
        className={`${
          showMore ? 'line-clamp-none' : 'line-clamp-4'
        } transition-all duration-300`}>
        {children}
      </div>
      <button onClick={() => setShowMore(!showMore)}>
        {showMore ? 'Show Less' : 'Show More'}
      </button>
    </>
  );
};

export default Description;
