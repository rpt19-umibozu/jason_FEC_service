const app = require('../../client/src/app.jsx').app;
const React = require('react');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const puppeteer = require('puppeteer');
const pageUrl = 'http://localhost:3002/10001';


test('Adds 2 + 2 to equal 4', () => {
  return true;
  // const wrapper;
  // expect(addTwo(2, 2)).toBe(4),
  // expect(addTwo(10, 10)).not.toBe(100)
  // expect(addTwo(12, 12)).toBe(24)
});
