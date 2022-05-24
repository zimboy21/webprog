import path from 'path';
import express from 'express';
import bp from 'body-parser';
import cookieParser from 'cookie-parser';

import files from './routes/files.js';
import homePage from './routes/home.js';
import newAnnouncement from './routes/newAnnouncement.js';
import filterAnnouncement from './routes/filter.js';
import announcement from './routes/announcement.js';
import api from './routes/api.js';
import auth from './routes/auth.js';
import register from './routes/register.js';

import { newAnnouncementFormCheck, searchFormCheck, registrationFormCheck  } from './middlewares/formValidation.js';
import { checkAuthenticatedUser, canRegister } from './middlewares/auth.js';

const app = express();

const staticDir = path.join(process.cwd(), 'static');

const PORT = process.env.PORT || 8080;

app.use(express.static(staticDir));
app.use(bp.json());
app.use(cookieParser());
app.use(bp.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(checkAuthenticatedUser);

app.use('/', homePage);
app.use('/files', files);
app.use('/announcement', announcement);
app.use('/newAnnouncement', newAnnouncement);
app.use('/newAnnouncement', newAnnouncementFormCheck, newAnnouncement);
app.use('/filterAnnouncement', searchFormCheck, filterAnnouncement);
app.use('/auth', auth);
app.use('/register', canRegister, registrationFormCheck, register);
app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
