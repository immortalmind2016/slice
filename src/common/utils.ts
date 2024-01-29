export const sleep = (seconds: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('done');
    }, seconds * 1000);
  });
