import React from 'react';

const Tab = ({ CurrentTab, setCurrentTab, color }) => {
  return (
    <>
      <div className='w-[max-content] mx-auto md:mt-10 mt-20'>
        <div className='tabs tabs-boxed w-full bg-slate-300 '>
          <a
            className={`tab ${CurrentTab === 'relations' ? 'tab-active' : ''}`}
            onClick={() => setCurrentTab('relations')}
            style={{
              backgroundColor: CurrentTab === 'relations' ? color : '',
            }}>
            Relations
          </a>
          <a
            className={`tab ${CurrentTab === 'character' ? 'tab-active' : ''}`}
            onClick={() => setCurrentTab('character')}
            style={{
              backgroundColor: CurrentTab === 'character' ? color : '',
            }}>
            Character
          </a>
          <a
            className={`tab ${CurrentTab === 'staff' ? 'tab-active' : ''}`}
            onClick={() => setCurrentTab('staff')}
            style={{
              backgroundColor: CurrentTab === 'staff' ? color : '',
            }}>
            Staff
          </a>
        </div>
      </div>
    </>
  );
};

export default Tab;
