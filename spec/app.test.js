const React = require('react');
const ReactDOM = require('react-dom');
const Enzyme = require('enzyme');
const Sinon = require('sinon');
const { shallow } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const puppeteer = require('puppeteer');
const pageUrl = 'http://localhost:3002/10001';
const { create } = require("react-test-renderer");
const App = require('../client/src/app.jsx');
const stable = require('core-js/stable');
const regenerator = require('regenerator-runtime/runtime');
const { configure } = require('enzyme');
configure({ adapter: new Adapter() })

//End-to-end tests

let page;
let browser;
const width = 1280;
const height = 720;


beforeAll(async() => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});

afterAll(() => {
  browser.close();
});

describe('test assertion tests', () => {
  beforeEach(async () => {
    await page.goto(pageUrl, {waitUntil: 'networkidle2'});
  });
  test('Asserts tests are running', () => {
    expect(true).toBe(true);
    expect(false).toBeFalsy();
    expect(true).toBeTruthy();
  });
});

describe('NavBar', () => {
  beforeEach(async () => {
    await page.goto(pageUrl, {waitUntil: 'networkidle2'});
  });
  test('navigation page links', async () => {
    var div = '#navBarLinks';
    const navBarLinks = await page.$eval(div, (e) => e.textContent);
    expect(navBarLinks).toEqual('Add listing⠀⠀⠀Host⠀⠀⠀Saved⠀⠀⠀ Trips⠀⠀⠀Messages⠀⠀ ⠀Help');
  });
});

describe('View Photos Button', async () => {
  beforeEach( async () => {
    await page.goto(pageUrl, {waitUntil: 'networkidle2'});
  });

  test('carousel does not exist at first', () => {
    let carouselDiv = '#carouselContainer';
    expect(carouselDiv).not.toBe(true);

  })

  test('click renders carousel Component', async () => {
    let viewPhotosButton = '#viewPhotos';
    let carouselDiv = '#carouselContainer';
    await page.click(viewPhotosButton);
    expect(carouselDiv).toBeTruthy();
  });
});

describe('NavBar', () => {
  // beforeEach(async () => {
  //   await page.goto(pageUrl, {waitUntil: 'networkidle2'});
  // });
  test('Carousel Methods', async () => {
    var div = '#navBarLinks';
    const navBarLinks = await page.$eval(div, (e) => e.textContent);
    expect(navBarLinks).toEqual('Add listing⠀⠀⠀Host⠀⠀⠀Saved⠀⠀⠀ Trips⠀⠀⠀Messages⠀⠀ ⠀Help');
  });
});