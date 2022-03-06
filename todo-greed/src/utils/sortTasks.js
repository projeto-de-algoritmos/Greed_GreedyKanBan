import moment from 'moment';

export const sortTasks = (tasks) => {
  let sortedTimes = tasks.sort((a, b) =>
    moment(b.startTime, 'h:mma').isBefore(moment(a.startTime, 'h:mma'))
  );
  return sortedTimes;
};
