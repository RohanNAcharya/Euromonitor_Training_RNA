"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchDataFromServer() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const randomValue = Math.random();
                if (randomValue >= 0.5) {
                    resolve(`Operation successful. Result: ${randomValue}`);
                }
                else {
                    reject(`Operation Failed. Error: ${randomValue}`);
                }
            }, 10000);
        });
    });
}
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield fetchDataFromServer();
            console.log(result);
        }
        catch (error) {
            console.log("Error: " + error);
        }
        console.log("Execute lines");
    });
}
fetchData();
