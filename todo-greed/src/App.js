import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Box, Flex } from 'reflexbox';
import { v4 as uuid } from 'uuid';

const tasks = [
  { id: uuid(), content: 'Task 1' },
  { id: uuid(), content: 'Task 2' },
  { id: uuid(), content: 'Task 3' },
  { id: uuid(), content: 'Task 4' },
  { id: uuid(), content: 'Task 5' },
];

const tasksColumns = {
  [uuid()]: {
    name: 'Tasks',
    items: tasks,
    duration: 30,
  },
  [uuid()]: {
    name: 'To do',
    items: [],
    duration: 60,
  },
  [uuid()]: {
    name: 'In Progress',
    items: [],
    duration: 80,
  },
  [uuid()]: {
    name: 'Done',
    items: [],
    duration: 20,
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function App() {
  const [columns, setColumns] = useState(tasksColumns);
  return (
    <Flex justifyContent="center" height="100%">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <Flex flexDirection="column" alignItems="center" key={columnId}>
              <h2>{column.name}</h2>
              <Box margin="10px">
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? '#fb6b4c'
                            : '#fd7d62',
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
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
                                      backgroundColor: snapshot.isDragging
                                        ? '#2b8b42'
                                        : '#157a2d',
                                      color: 'white',
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.content}
                                  </Box>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </Box>
            </Flex>
          );
        })}
      </DragDropContext>
    </Flex>
  );
}

export default App;
