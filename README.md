# Project: Front-End Capstone

![](https://media.giphy.com/media/YocIBsoQydvahPJ2I3/giphy.gif)

## Table of Contents
1. [Overview](#Overview)
1. [Other Services](#Other-Services)
1. [Usage](#Usage)
1. [Tech Stack](#Tech-Stack)
1. [Copyright and License](#Copyright-and-License)

## Overview
The Reservation Module includes a calendar feature.
This Reservation Module Service was designed and written together with three other services to create an Item Listing Page within a team of 4 people.

### My contributions:

* Designed and built the Search Bar / Photo Service / Carousel Modules.
* Coordinated and deployed entire team’s modules on a reverse proxy server using an AWS EC2 instance.
* Utilized agile workflow practices on a 4 person remote team.


## Other Services

  1. [Reservations Service](https://github.com/rpt19-umibozu/FEC_Yingwen_service)

  2. [Reviews Service](https://github.com/rpt19-umibozu/devjce-fec-service)

  3. [Recommendation Service](https://github.com/rpt19-umibozu/FEC-Youzhu-recommendation)


## Usage

### npm install
  Install the dependencies in a local node_modules folder

### mongo
  Enter into Mongo shell

> #### use reservation_service
>  Create database and enter into it

> #### db.createCollection('listingitems');
>  Create listingitems collection

> #### db.createCollection('bookings');
>  Create bookings collection

> #### CTL+C
>  Exit Mongo shell

### npm run create-data
  Create the two CSV files with seed data

### mongoimport --type csv -d reservation_service -c listingitems --headerline --drop listingInfoCSV
  Seed the listingitems collection in the reservation_service database

### mongoimport --type csv -d reservation_service -c bookings --headerline --drop bookingsInfoCSV
  Seed the bookings collection in the reservation_service database

### npm run react
  Correctly bundles the React app in production mode and optimizes the build for the best performance. Builds app into a bundle.js file in the public folder.

### npm run start
  Runs the app in the development mode.
  Open http://localhost:3002 to view it in the browser.


## Tech Stack

- JavaScript
- React
- Node/Express
- MYSQL
- Webpack
- Babel
- Jest
- Enzyme
- Pupeteer
- Superagent
- AWS (EC2, S3)


## Copyright and License
The MIT License (MIT) [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)