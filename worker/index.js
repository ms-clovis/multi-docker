const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();

// function fib(num, memo) {
//   memo = memo || {};
//
//   if (memo[num]) return memo[num];
//   if (num <= 1) return 1;
//
//   return memo[num] = fib(num - 1, memo) + fib(num - 2, memo);
// }

function fib(num){
  let a = 1, b = 0, temp;

  while (num >= 0){
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
}

sub.on('message', (channel, message) => {
  console.log("Calculating for "+message + " ...");
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');
