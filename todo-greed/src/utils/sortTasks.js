import moment from 'moment';

export const sortTasks = (tasks) => {
  let sortedTimes = tasks.sort((a, b) => {
    return moment(b.endTime, 'h:mm a').isBefore(moment(a.endTime, 'h:mm a'));
  });
  return sortedTimes;
};
