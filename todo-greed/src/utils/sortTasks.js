import moment from 'moment';

export const sortTasks = (tasks) => {
  let sortedTimes = tasks.sort((a, b) => {
    return moment(b.endTime, 'h:mma').isBefore(moment(a.endTime, 'h:mma'));
  });
  return sortedTimes;
};
