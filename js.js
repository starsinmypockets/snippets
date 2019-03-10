// Run promises in series
[
    new Promise((resolve) => resolve(console.log(1))), 
    new Promise((resolve) => resolve(console.log(2))),
    new Promise((resolve) => resolve(console.log(3)))
].reduce((acc, next) => acc.then(next), Promise.resolve()).then(() => {
    console.log('done')
})

