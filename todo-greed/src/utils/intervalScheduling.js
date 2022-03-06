import { sortTasks } from './sortTasks';
import moment from 'moment';
export const intervalScheduling = (tasks) => {
  sortTasks(tasks);

  console.log(tasks);
  const selectedTasks = [];
  selectedTasks.push(tasks[0]);
  let lastTaskAdded = tasks[0];

  for (let i = 1; i < tasks.length; i++) {
    if (
      moment(lastTaskAdded.endTime, 'h:mma').isBefore(
        moment(tasks[i].startTime, 'h:mma')
      )
    ) {
      selectedTasks.push(tasks[i]);
      lastTaskAdded = tasks[i];
    }
  }

  return selectedTasks;
};
