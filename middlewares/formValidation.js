import { getAllAnnouncement } from '../database/announcement.js';

const name = /^$|^[A-Z][a-z]+$/;
const number = /^$|[0-9]+$/;
const quarter = /^$|[A-Za-z0-9-.]+$/;
const date = /^$|[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

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
  let error = '';
  if (!name.test(req.body.uploadCity)) {
    error += 'Invalid City! <br>';
  }
  if (!name.test(req.body.uploadQuarter)) {
    error += 'Invalid Quarter! <br>';
  }
  if (!number.test(req.body.uploadArea)) {
    error += 'Invalid area! <br>';
  }
  if (!number.test(req.body.uploadPrice)) {
    error += 'Invalid price! <br>';
  }
  if (!number.test(req.body.uploadRomms)) {
    error += 'Invalid number of rooms! <br>';
  }
  if (!date.test(req.body.uploadDate)) {
    error += 'Invalid date! <br>';
  }
  if (error === '') {
    next();
  } else {
    res.render('apartmentUpload', { error });
  }
}
