function isNumber(number) {
  return typeof number === 'number' && !isNaN(number);
}

function numberToFloat(number) {
  let sign = number < 0 ? 1 : 0;
  
  let normalizedNumber = Math.abs(number);
  let exponent = Math.floor(Math.log2(normalizedNumber));
  let mantissa = normalizedNumber / Math.pow(2, exponent) - 1;
  
  let biasedExponent = exponent + 127; 
  
  let signBinary = sign.toString(2);
  let exponentBinary = biasedExponent.toString(2).padStart(8, '0');
  let mantissaBinary = mantissa.toString(2).substring(2).padEnd(23, '0');
  
  let result = signBinary + exponentBinary + mantissaBinary;
  
  return result;
}

let fs = require('fs');
let number = parseFloat(fs.readFileSync("output.txt").toString());

if (isNumber(number)) {
  let result = numberToFloat(number);
  fs.writeFileSync('result.txt', result);
  console.log(result);
} else {
  console.log("Введеные данные не являются числом!");
}
  