import { Button, TextField } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Box, Flex } from 'reflexbox';
import { v4 as uuid } from 'uuid';
import TodoItem from './components/TodoItem';

function App() {
  const tasks = useMemo(
    () => [
      { id: '0', content: 'Task 1' },
      { id: '1', content: 'Task 2' },
      { id: '2', content: 'Task 3' },
      { id: '3', content: 'Task 4' },
      { id: '4', content: 'Task 5' },
    ],
    []
  );

  const tasksColumns = useMemo(
    () => [
      {
        name: 'Tasks',
        items: tasks,
      },
      {
        name: 'To do',
        items: [],
      },
      {
        name: 'In Progress',
        items: [],
      },
      {
        name: 'Done',
        items: [],
      },
    ],
    [tasks]
  );
  const [columns, setColumns] = useState(tasksColumns);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;
    let newBoardData = columns;
    var dragItem =
      newBoardData[parseInt(source.droppableId)].items[source.index];
    newBoardData[parseInt(source.droppableId)].items.splice(source.index, 1);
    newBoardData[parseInt(destination.droppableId)].items.splice(
      destination.index,
      0,
      dragItem
    );
    setColumns(newBoardData);
  };

  const handleMoveTask = useCallback(() => {
    const newColumns = columns;
    newColumns['3'].items.push({
      id: '6',
      content: 'Task teste',
    });
    setColumns([...newColumns]);
  }, [columns]);
  const onTextAreaKeyPress = (e) => {
    if (e.keyCode === 13) {
      const boardId = e.target.attributes['id'].value;
      const item = { id: '33', content: 'Task 5' };
      let newBoardData = columns;
      newBoardData[boardId].items.push(item);
      setColumns([...newBoardData]);
      e.target.value = '';
    }
  };
  return (
    <Flex justifyContent="center" height="100%">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column, bIndex) => {
          return (
            <Flex flexDirection="column" alignItems="center">
              <h2>{column.name}</h2>
              <Box margin="10px">
                <Droppable droppableId={bIndex.toString()}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? '#D3D3D3'
                            : '#C0C0C0',
                          padding: 4,
                          width: 250,
                          minHeight: 400,
                        }}
                      >
                        {column?.items?.length > 0 &&
                          column?.items?.map((item, index) => {
                            return <TodoItem data={item} index={index} />;
                          })}
                        {provided.placeholder}
                        <Button variant="contained" onClick={handleMoveTask}>
                          teste
                        </Button>
                        <TextField
                          name="task"
                          id={bIndex}
                          label="Outlined"
                          variant="outlined"
                          onKeyDown={(e) => onTextAreaKeyPress(e)}
                        />
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
