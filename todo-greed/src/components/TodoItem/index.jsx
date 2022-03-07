import { Typography } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { Flex } from 'reflexbox';
import { Box } from 'reflexbox';

const TodoItem = ({ data, index }) => {
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided, snapshot) => {
        return (
          <Box
            style={{
              borderRadius: '7px',
              backgroundImage:
                'linear-gradient( 132.6deg,  rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7% )',
            }}
            marginBottom="2rem"
          >
            <Box
              style={{
                userSelect: 'none',
                minHeight: '40px',
                padding: '0.5rem',
                color: 'white',
                borderRadius: '7px',
                ...provided.draggableProps.style,
              }}
            >
              <Typography color="white" fontWeight="600">
                {' '}
                {data.content}
              </Typography>
            </Box>
            <Flex
              justifyContent="space-between"
              padding="0.5rem 0.5rem 0 0.5rem"
              style={{
                borderBottomLeftRadius: '7px',
                borderBottomRightRadius: '7px',
                borderTop: '1px solid #a5ceca',
              }}
            >
              <Typography color="white">{data.startTime}</Typography>-
              <Typography color="white">{data.endTime}</Typography>
            </Flex>
          </Box>
        );
      }}
    </Draggable>
  );
};

export default TodoItem;
