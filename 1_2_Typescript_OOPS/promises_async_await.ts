async function fetchDataFromServer(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomValue = Math.random();

      if (randomValue >= 0.5) {
        resolve(`Operation successful. Result: ${randomValue}`);
      } else {
        reject(`Operation Failed. Error: ${randomValue}`);
      }
    }, 10000);
  });
}

async function fetchData(): Promise<void> {
  try {
    const result = await fetchDataFromServer();
    console.log(result);
  } catch (error) {
    console.log("Error: " + error);
  }
  console.log("Execute lines");
}

fetchData();
