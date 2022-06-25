import React, { useEffect, useState } from 'react';
import moment from 'moment';

const Timer = ({ time, color }) => {
  const t = moment.unix(time);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      const date = moment.now();
      var ms = moment(t).diff(moment(date));
      var d = moment.duration(ms);
      setDays(Math.floor(d.asDays()));
      setHours(moment.utc(ms).get('hours'));
      setMinutes(moment.utc(ms).get('minutes'));
    }, 1000);
    return () => clearInterval(id);
  });
  return (
    <div className='absolute right-5 bottom-2'>
      <div className='tooltip' data-tip={moment(t).calendar()}>
        <span
          className='countdown font-mono sm:text-2xl text-lg'
          style={{ color: color }}>
          <span style={{ '--value': days }}></span>d
          <span style={{ '--value': hours }}></span>h
          <span style={{ '--value': minutes }}></span>m
        </span>
      </div>
    </div>
  );
};

export default Timer;
