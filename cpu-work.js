function computeNthPrime(n) {
  if (n < 1) return null;
  let count = 0;
  let candidate = 2;
  while (count < n) {
    let isPrime = true;
    const limit = Math.floor(Math.sqrt(candidate));
    for (let i = 2; i <= limit; i++) {
      if (candidate % i === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) count++;
    candidate++;
  }
  return candidate - 1;
}

function cpuIntensiveField() {
  const start = Date.now();
  const nthPrime = computeNthPrime(20000);
  return {
    nth_prime: nthPrime,
    checksum: String(nthPrime * 31 + 17),
    compute_ms: Date.now() - start
  };
}

module.exports = { cpuIntensiveField };