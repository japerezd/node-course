const {
  calculateTip,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
} = require('../src/math');

test('Should calculate total with tip', () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);
});

test('should calculate total with default tip', () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5);
});


test('should convert 32 F to 0 C', () => { 
  const fahrenheitToC = fahrenheitToCelsius(32);
  expect(fahrenheitToC).toBe(0)
 });

 test('should convert O C to 32 F', () => { 
  const celsiusToF = celsiusToFahrenheit(0);
  expect(celsiusToF).toBe(32)
 })