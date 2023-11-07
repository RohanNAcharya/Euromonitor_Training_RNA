const myPromise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    let randomValue = Math.random();

    if (randomValue >= 0.5) {
      resolve(`Operation successful. Result: ${randomValue}`);
    } else {
      reject(`Operation Failed. Error: ${randomValue}`);
    }
  }, 1000);
});

myPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
