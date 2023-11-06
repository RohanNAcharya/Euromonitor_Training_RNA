var weather;
function getWeather(callback){
  setTimeout(() =>{
    weather = 'sunny';
    callback(weather);
  },2000);
}

function displayWeather(weather){
  console.log(weather);
}

console.log("Code Started Execution");
getWeather(displayWeather);
console.log("Execution Ended");