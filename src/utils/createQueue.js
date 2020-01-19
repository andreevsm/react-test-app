export const createQueue = () => {
  let running = 0;
  const taskQueue = [];

  const runTask = (task) => {
    running++;

    task(() => {
      running--;
      if (taskQueue.length > 0) {
        runTask(taskQueue.shift());
      }
    });
  };

  const enqueueTask = task => taskQueue.push(task);

  return {
    push: task => (running < 1 ? runTask(task) : enqueueTask(task)),
  };
};
