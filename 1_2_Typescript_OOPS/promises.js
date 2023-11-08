var myPromise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        var randomValue = Math.random();
        if (randomValue >= 0.5) {
            resolve("Operation successful. Result: ".concat(randomValue));
        }
        else {
            reject("Operation Failed. Error: ".concat(randomValue));
        }
    }, 1000);
});
myPromise
    .then(function (result) {
    console.log(result);
})
    .catch(function (error) {
    console.log(error);
});
