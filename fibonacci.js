function fib(how_many) {
  if (how_many < 2) {
    return [];
  }
  base = [0, 1];
  // minus 2 because 0 and 1 included in sequence
  for (let i = 0; i < how_many - 2; i += 1) {
    base.push(base[i] + base[i + 1]);
  }
  return base;
}

function fr(n) {
  return n <= 2 ? [0,1] : fr(n-1).concat([(fr(n-1)[fr(n-1).length - 1] + fr(n-1)[fr(n-1).length - 2])]);
}

console.log(fib(10));
console.log(fr(10));

