import jwt from 'jsonwebtoken';
import secret from  '../utils/utils.js';
import { getUserData, checkExistingUser } from '../database/user.js';
import { getAnnouncementOwner } from '../database/announcement.js';
import { getPictureOwner } from '../database/pictures.js';

export async function JWTManagger(req, res, next) {
  res.locals.payload = {};
  try {
    if (req.cookies.cookie) {
      try {
        res.locals.payload = await jwt.verify(req.cookies.cookie, secret);
        const user = await getUserData(res.locals.payload.userMail);
        res.locals.payload.uid = user[0].user_id;
        res.locals.payload.userName = user[0].user_name;
        res.locals.payload.userMail = user[0].user_mail;
        res.locals.payload.userPrivileges = user[0].user_privileges;
        next();
      } catch (error) {
        const err = `Something went wrong: ${error}`;
        res.render('error', { err });
      }
    } else {
      next();
    }
  } catch (error) {
    const err = `Something went wrong: ${error}`;
    res.render('error', { err });
  }
}

export async function canRegister(req, res, next) {
  try {
    const user = await checkExistingUser(req.body.registerMail);
    if (Object.keys(user).length === 0) {
      next();
    } else {
      const err = 'Username taken!';
      res.status(409);
      res.render('error', { err });
    }
  } catch (error) {
    const err = `Something went wrong: ${error}`;
    res.render('error', { err });
  }
}

export default async function checkJWT(req, res, next) {
  if (req.cookies.cookie) {
    try {
      next();
    } catch (error) {
      res.clearCookie('cookie');
      res.status(401).end();
    }
  } else {
    const err = 'Login to access this feature!';
    res.status(401);
    res.render('error', { err });
  }
}

export async function canUploadPicture(req, res, next) {
  try {
    const id = req.url.substring(13);
    const owner = await getAnnouncementOwner(id);
    if (res.locals.payload.userPrivileges === 'admin' || res.locals.payload.uid === owner[0].user_id) {
      next();
    } else {
      const err = 'Unauthorized for this action!';
      res.status(401);
      res.render('error', { err });
    }
  } catch (error) {
    const err = `Something went wrong: ${error}`;
    res.render('error', { err });
  }
}

export async function canDeletePicture(req, res, next) {
  try {
    if (req.method === 'DELETE') {
      const id = req.url.substring(9);
      const owner = await getPictureOwner(id);
      if (res.locals.payload.userPrivileges
    === 'admin' || res.locals.payload.uid === owner[0].user_id) {
        next();
      } else {
        const err = 'Unauthorized for this action!';
        res.status(401);
        res.render('error', { err });
      }
    } else {
      next();
    }
  } catch (error) {
    const err = `Something went wrong: ${error}`;
    res.render('error', { err });
  }
}
