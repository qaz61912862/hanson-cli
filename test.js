const util = require('util')

function fn () {
  return 1234
}

const fn2 = util.promisify(fn);


const fn3 = async () => {
  const result = await fn2();
  console.log(result);
}

fn3()