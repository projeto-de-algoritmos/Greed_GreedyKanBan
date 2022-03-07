import moment from 'moment';

export const sortTasks = (tasks) => {
  let sortedTimes = tasks.sort((a, b) => {
    return moment(b.endTime, 'hh:mm a').isBefore(moment(a.endTime, 'hh:mm A'));
  });
  return sortedTimes;
};
