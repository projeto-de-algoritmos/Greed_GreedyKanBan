import { sortTasks } from './sortTasks';
import moment from 'moment';
export const intervalScheduling = (tasks) => {
  sortTasks(tasks);

  const selectedTasks = [];
  selectedTasks.push(tasks[0]);
  let lastTaskAdded = tasks[0];

  for (let i = 1; i < tasks.length; i++) {
    if (
      moment(lastTaskAdded.endTime, 'hh:mm A').isSameOrBefore(
        moment(tasks[i].startTime, 'hh:mm A')
      )
    ) {
      selectedTasks.push(tasks[i]);
      lastTaskAdded = tasks[i];
    }
  }

  return selectedTasks;
};
