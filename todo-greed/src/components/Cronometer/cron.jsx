import { Button } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Flex } from 'reflexbox';

function Cronometer({ time }) {
  return (
    <Flex alignItems="center" justifyContent="center">
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
          {moment().hour(0).minute(0).second(time).format('HH : mm : ss A')}
        </h1>
      </Flex>
    </Flex>
  );
}

export default Cronometer;
