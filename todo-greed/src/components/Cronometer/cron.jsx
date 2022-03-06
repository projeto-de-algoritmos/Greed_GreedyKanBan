import { useEffect, useState } from 'react';
import { Flex } from 'reflexbox';

function Cronometer() {
  const [diff, setDiff] = useState(null);
  const [init, setInit] = useState(null);

  const tick = () => {
    setDiff(new Date(+new Date() - init));
  };

  const start = () => {
    setInit(+new Date());
  };

  useEffect(() => {
    if (init) {
      requestAnimationFrame(tick);
    }
  }, [init]);

  useEffect(() => {
    if (diff) {
      requestAnimationFrame(tick);
    }
  }, [diff]);

  return (
    <Flex onClick={start} alignItems="center" justifyContent="center">
      <Flex
        height="4rem"
        backgroundColor="#DCDCDC"
        padding="1rem"
        alignItems="center"
        justifyContent="center"
        style={{
          borderRadius: '7px',
        }}
      >
        <h1 style={{ textAlign: 'center', color: 'black', fontSize: '50px' }}>
          {timeFormat(diff)}
        </h1>
      </Flex>
    </Flex>
  );
}

const timeFormat = (date) => {
  if (!date) return '00:00:00';

  let min = date.getUTCMinutes();
  let sec = date.getSeconds();
  let msec = Math.round(date.getMilliseconds() / 10);

  min = min < 10 ? '0' + min : min;
  sec = sec < 10 ? '0' + sec : sec;
  msec = msec < 10 ? '0' + msec : msec;

  return `${min}:${sec}:${msec}`;
};

export default Cronometer;
