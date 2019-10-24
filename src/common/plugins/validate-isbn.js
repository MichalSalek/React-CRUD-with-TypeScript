/* eslint-disable */

function validateISBN(a) {
  let b = 0;
  let i = 0;
  let r = 0;
  let t = 10;
  let l = a.length;
  if (l === t) {
    for (i; i < 9; i++) b += a[i] * (t - i);
    r = (b + (a[9] === 'X' ? t : a[9])) % 11 === 0;
  }
  if (l === 13) {
    for (i; i < 12; i++) b += (i + 1) % 2 ? +a[i] : a[i] * 3;
    r = b % t === t - (+a[12] || t);
  }
  return !!r;
}

export default validateISBN;
