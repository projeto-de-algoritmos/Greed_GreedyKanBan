import { Button, Slider, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Box, Flex } from 'reflexbox';
import TodoItem from './components/TodoItem';
import TimePicker from '@mui/lab/TimePicker';
import AdapterDateFns from '@mui/lab/AdapterMoment';
import { LocalizationProvider } from '@mui/lab';
import { v4 as uuid } from 'uuid';
import { intervalScheduling } from './utils/intervalScheduling';
import moment from 'moment';
import Cronometer from './components/Cronometer/cron.jsx';

function App() {
  const tasks = useMemo(() => [], []);

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
  const [value, setValue] = React.useState(new Date('2021-03-05T08:00:00'));
  const [time, setTime] = useState(0);
  const [isStarted, setIsStarted] = useState(null);
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
    const duration = e.target.elements.duration.value;
    let endTime = moment(startTime, 'h:mm a')
      .add(duration, 'hours')
      .format('h:mm a');
    const item = {
      id: uuid(),
      content: description,
      startTime,
      endTime,
    };
    let newTasksData = columns;
    newTasksData[taskId].items.push(item);
    setColumns([...newTasksData]);
  };

  const startTimer = () => {
    setIsStarted(true);
    setTime(time);
    let newTime = time;
    setInterval(() => setTime((newTime += 3600)), 1000);
  };

  useEffect(() => {
    console.log(columns?.[1]?.items?.[0]);
    console.log(
      moment().hour(0).minute(0).second(time).format('hh:mm a') ===
        moment(columns?.[1].items[0]?.startTime, 'h:mm a').format('hh:mm a')
    );
  }, [columns, time]);

  return (
    <Box>
      <Flex width="600px" width="100%" justifyContent="center">
        <Cronometer time={time} />
        <Button type="submit" variant="contained" onClick={() => startTimer()}>
          Start Timer
        </Button>
      </Flex>
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
                          {bIndex === 0 && (
                            <Box>
                              <form
                                onSubmit={handleSubmit}
                                id={bIndex}
                                style={{ padding: '0.5rem' }}
                              >
                                <TextField
                                  name="description"
                                  label="Description"
                                  variant="outlined"
                                  required
                                />
                                <Box>
                                  <Typography
                                    id="input-slider"
                                    style={{ paddingLeft: '1.2rem' }}
                                  >
                                    Duration(h)
                                  </Typography>
                                  <Slider
                                    name="duration"
                                    aria-label="Temperature"
                                    defaultValue={1}
                                    valueLabelDisplay="on"
                                    step={1}
                                    marks
                                    min={1}
                                    max={6}
                                  />
                                </Box>
                                <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <TimePicker
                                    label="Start Time"
                                    ampm={false}
                                    value={value}
                                    onChange={handleChangeTime}
                                    renderInput={(params) => (
                                      <TextField {...params} name="startTime" />
                                    )}
                                  />
                                </LocalizationProvider>
                                <Button
                                  type="submit"
                                  variant="contained"
                                  fullWidth
                                >
                                  Insert task
                                </Button>
                              </form>
                              <Button
                                onClick={() => {
                                  columns[1].items = intervalScheduling(
                                    columns[0].items
                                  );

                                  setColumns([...columns]);
                                }}
                                variant="contained"
                                fullWidth
                              >
                                sort task
                              </Button>
                            </Box>
                          )}
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
    </Box>
  );
}

export default App;
