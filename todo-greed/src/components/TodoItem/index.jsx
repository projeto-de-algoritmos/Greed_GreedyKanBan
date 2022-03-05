import { Draggable } from 'react-beautiful-dnd';
import { Box } from 'reflexbox';

const TodoItem = ({ data, index }) => {
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided, snapshot) => {
        return (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: 'none',
              padding: 16,
              margin: '0 0 8px 0',
              minHeight: '40px',
              backgroundColor: snapshot.isDragging ? '#2b8b42' : '#157a2d',
              color: 'white',
              borderRadius: '7px',
              ...provided.draggableProps.style,
            }}
          >
            {data.content}
          </Box>
        );
      }}
    </Draggable>
  );
};

export default TodoItem;
