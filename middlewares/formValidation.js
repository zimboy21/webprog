import { getAllAnnouncement } from '../database/announcement.js';

const name = /^$|[A-Za-z0-9]+$/;
const number = /^$|[0-9]+$/;
const quarter = /^$|[A-Za-z0-9-.]+$/;
const date = /^$|[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
const mail = /^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]{2,4})*$/;

function testRegex(req) {
  let error = '';
  if (!name.test(req.body.searchCity)) {
    error += 'Invalid City! <br>';
  }
  if (!quarter.test(req.body.searchQuarter)) {
    error += 'Invalid Quarter! <br>';
  }
  if (!number.test(req.body.searchMinPrice)) {
    error += 'Invalid minimum price! <br>';
  }
  if (!number.test(req.body.searchMaxPrice)) {
    error += 'Invalid maximum price! <br>';
  }
  return error;
}

export async function searchFormCheck(req, resp, next) {
  const error = testRegex(req);
  if (error === '') {
    if (req.body.searchCity === '') {
      req.body.searchCity = '%';
    }
    if (req.body.searchQuarter === '') {
      req.body.searchQuarter = '%';
    }
    if (req.body.searchMinPrice === '') {
      req.body.searchMinPrice = '0';
    }
    if (req.body.searchMaxPrice === '') {
      req.body.searchMaxPrice = '2147483647';
    }
    next();
  } else {
    try {
      const announcements = await getAllAnnouncement();
      resp.render('homepage', { error, announcements });
    } catch (err) {
      resp.render('error', { err });
    }
  }
}

export async function newAnnouncementFormCheck(req, res, next) {
  let err = '';
  if (!name.test(req.body.uploadCity)) {
    err += 'Invalid City!';
  }
  if (!name.test(req.body.uploadQuarter)) {
    err += 'Invalid Quarter!';
  }
  if (!number.test(req.body.uploadArea)) {
    err += 'Invalid area!';
  }
  if (!number.test(req.body.uploadPrice)) {
    err += 'Invalid price!';
  }
  if (!number.test(req.body.uploadRomms)) {
    err += 'Invalid number of rooms!';
  }
  if (!date.test(req.body.uploadDate)) {
    err += 'Invalid date! <br>';
  }
  if (err === '') {
    next();
  } else {
    res.render('error', { err });
  }
}

export function registrationFormCheck(req, res, next) {
  let err = '';
  console.log(req.body);
  if (!name.test(req.body.registerName)) {
    err += 'Invalid Name!\n';
  }
  if (!mail.test(req.body.registerMail)) {
    err += 'Invalid Email!\n';
  }
  if (err === '') {
    next();
  } else {
    res.render('error', { err });
  }
}
