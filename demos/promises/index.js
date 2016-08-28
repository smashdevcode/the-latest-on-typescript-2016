'use strict';
function f() {
    return new Promise((resolve, reject) => {
        resolve('Original value');
        // reject(new Error('Something went wrong!'));
    });
}
f().then(value => {
    console.log(value);
    return 'New value 1';
}).catch(error => {
    console.log('Oh oh!');
    throw error;
}).then(value => {
    console.log(value);
    return 'New value 2';
}).catch(error => {
    console.error(error);
    return 'Caught value!';
}).then(value => console.log(value));
