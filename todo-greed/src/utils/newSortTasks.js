import moment from 'moment';

export const sortTasks = (tasks) => {
    let times = [];
    let indexTimes = [];
    let answer = [];
    let lessTimes = [];
    let lessIndex = [];
    for (var i = 0; i < tasks.length; i++){
      times.push(tasks[i].endTime);
      indexTimes.push(i);
    }
  
    Array.min = function(array) {
      return Math.min.apply(Math, array);
    }
  
    for(var f = 0; f < tasks.length; f++){
      var menor = Array.min(times);
      lessTimes.push(menor);
      lessIndex.push(times.indexOf(menor));
      times.pop(menor);
      indexTimes.pop(times.indexOf(menor));
  
    }
  
    for( var m = 0; m < tasks.length; m++){
      var e = lessIndex[m];
      answer.push(tasks[e]);
    }
  
    console.log(answer);
    return answer;
};