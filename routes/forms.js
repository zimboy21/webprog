import { Router } from 'express';

const router = Router();

const name = /^[A-Z][a-z]+$/;
const number = /[0-9]+$/;
const date = /[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

router.post('/searchApartment', (req, resp) => {
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
  if (message === '') {
    message = 'Valid Data!';
  }
  resp.send(message);
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
    message = 'Valid Data!';
  }
  resp.send(message);
});

export default router;
