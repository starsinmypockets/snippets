/**
 * Run promises in series
 */
const promises = [
  (numb = 2) =>
    new Promise(resolve => {
      console.log(numb);
      return resolve(numb);
    }),
  (numb = 3) =>
    new Promise(resolve => {
      console.log(numb);
      return resolve(numb * 2);
    }),
  (numb = 4) =>
    new Promise(resolve => {
      console.log(numb);
      return resolve(numb * 4);
    })
];

promises
  .reduce(async (acc, next) => await acc.then(next), Promise.resolve(10))
  .then(numb => {
    console.log("done", numb);
  });

/**
 * PromiseQueue - run promises in parallel up to max concurrency
 */
console.log("Promise queue");
class PromiseQueue {
  constructor(promises, concurrency = 2) {
    this.concurrency = concurrency;
    this.promises = promises;
    this.running = [];
    this.complete = [];
  }

  get runAnother() {
    return this.running.length < this.concurrency && this.promises.length;
  }

  run() {
    while (this.runAnother) {
      const promise = this.promises.shift();
      promise().then(() => {
        this.complete.push(this.running.shift());
        this.run();
      });
      this.running.push(promise);
    }
    return Promise.resolve();
  }
}

const p = new PromiseQueue(promises);
p.run().then(() => {
  console.log("Promise queue complete");
});
