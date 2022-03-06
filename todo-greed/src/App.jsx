import { Button, TextField } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Box, Flex } from 'reflexbox';
import TodoItem from './components/TodoItem';
import TimePicker from '@mui/lab/TimePicker';
import AdapterDateFns from '@mui/lab/AdapterMoment';
import { LocalizationProvider } from '@mui/lab';
import { v4 as uuid } from 'uuid';
import { sortTasks } from './utils/sortTasks';
function App() {
  const tasks = useMemo(
    () => [
      {
        id: uuid(),
        content: '10',
        startTime: '10:00 AM',
        duration: undefined,
      },
      {
        id: uuid(),
        content: '08',
        description: '08',
        startTime: '08:00 AM',
        duration: undefined,
      },
      {
        id: uuid(),
        content: '09',
        startTime: '09:00 AM',
        duration: undefined,
      },
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
  const [allTasks, setTasks] = useState(tasks);
  const [value, setValue] = React.useState(new Date('2021-03-05T08:00:00'));

  const handleChangeTime = (newValue) => {
    setValue(newValue);
  };
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskId = e.target.attributes['id'].value;
    const description = e.target.elements.description.value;
    const startTime = e.target.elements.startTime.value;
    const duration = e.target.duration;
    const item = {
      id: uuid(),
      content: description,
      startTime,
      duration,
    };
    console.log(item);
    let newTasksData = columns;
    newTasksData[taskId].items.push(item);
    setColumns([...newTasksData]);
    setTasks([...allTasks, item]);
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
                          padding: 8,
                          width: 250,
                          minHeight: 380,
                          borderRadius: '7px',
                        }}
                      >
                        {column?.items?.length > 0 &&
                          column?.items?.map((item, index) => {
                            return <TodoItem data={item} index={index} />;
                          })}
                        {provided.placeholder}
                        <form onSubmit={handleSubmit} id={bIndex}>
                          <TextField
                            name="description"
                            label="Description"
                            variant="outlined"
                            required
                          />
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                              label="Time"
                              ampm={false}
                              value={value}
                              onChange={handleChangeTime}
                              renderInput={(params) => (
                                <TextField {...params} name="startTime" />
                              )}
                            />
                          </LocalizationProvider>

                          <Button type="submit" variant="contained" fullWidth>
                            teste
                          </Button>
                        </form>
                        <Button
                          onClick={() => {
                            console.log('TA', sortTasks(allTasks));
                            columns[0].items = sortTasks(allTasks);

                            setColumns([...columns]);
                          }}
                          variant="contained"
                          fullWidth
                        >
                          sort task
                        </Button>
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
