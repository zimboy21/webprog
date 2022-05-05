import { Router } from 'express';
// import { apartments, id } from '../index.js';

const router = Router();

// eslint-disable-next-line import/no-mutable-exports
const apartments = [];
// eslint-disable-next-line import/no-mutable-exports
let id = 0;

const name = /^$|^[A-Z][a-z]+$/;
const number = /^$|[0-9]+$/;
const date = /^$|[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

function validateRegex(req) {
  let message = '';
  if (!name.test(req.body.searchCity)) {
    message += 'Invalid City! <br>';
  }
  if (!name.test(req.body.searchQuarter)) {
    message += 'Invalid Quarter! <br>';
  }
  if (!number.test(req.body.searchMinPrice)) {
    message += 'Invalid minimum price! <br>';
  }
  if (!number.test(req.body.searchMaxPrice)) {
    message += 'Invalid maximum price! <br>';
  }
  return message;
}

router.post('/searchApartment', (req, resp) => {
  const message = validateRegex(req);
  if (message === '') {
    console.log(req.body);
    let filtered = [];
    if (req.body.searchCity !== '') {
      filtered = apartments.filter((ap) => ap.city === req.body.searchCity);
    } else {
      filtered = apartments;
    }
    if (req.body.searchQuarter !== '') {
      filtered = filtered.filter((ap) => ap.quarter === req.body.searchQuarter);
    }
    if (req.body.searchMinPrice !== '') {
      filtered = filtered.filter(
        (ap) => parseInt(ap.price, 10) >= parseInt(req.body.searchMinPrice, 10),
      );
    }
    if (req.body.searchMaxPrice !== '') {
      filtered = filtered.filter(
        (ap) => parseInt(ap.price, 10) <= parseInt(req.body.searchMaxPrice, 10),
      );
    }
    resp.send(filtered);
  } else {
    resp.send(message);
  }
});

router.post('/uploadApartment', (req, resp) => {
  let message = '';
  console.log(req.body);
  if (!name.test(req.body.uploadCity)) {
    message += 'Invalid City! <br>';
  }
  if (!name.test(req.body.uploadQuarter)) {
    message += 'Invalid Quarter! <br>';
  }
  if (!number.test(req.body.uploadArea)) {
    message += 'Invalid area! <br>';
  }
  if (!number.test(req.body.uploadPrice)) {
    message += 'Invalid price! <br>';
  }
  if (!number.test(req.body.uploadRomms)) {
    message += 'Invalid number of rooms! <br>';
  }
  if (!date.test(req.body.uploadDate)) {
    message += 'Invalid date! <br>';
  }
  if (message === '') {
    const newAp = {};
    newAp.city = req.body.uploadCity;
    newAp.quarter = req.body.uploadQuarter;
    newAp.areea = req.body.uploadArea;
    newAp.price = req.body.uploadPrice;
    newAp.rooms = req.body.rooms;
    newAp.date = req.body.uploadDate;
    apartments.push(newAp);
    message = `id: ${id}`;
    id += 1;
  }
  resp.send(message);
});

export default router;
