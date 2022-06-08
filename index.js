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
import createAnnouncement from './routes/createAnnouncement.js';
import manageAnnouncement from './routes/manageAnnouncement.js';
import manageAccount from './routes/manageAccount.js';
import users from './routes/users.js';
import avatar from './routes/avatar.js';
import user from './routes/user.js';
import chat from './routes/chat.js';
import messages from './routes/messages.js';

import { newAnnouncementFormCheck, searchFormCheck, registrationFormCheck  } from './middlewares/formValidation.js';
import checkJWT, {
  jwtManagger,
  canRegister,
  canUploadPicture,
  canDeletePicture,
  canChangeAnnouncement,
  isAdmin,
  canChangeUser,
  canChat,
} from './middlewares/auth.js';

const app = express();

const staticDir = path.join(process.cwd(), 'static');

const PORT = process.env.PORT || 8080;

app.use(express.static(staticDir));
app.use(bp.json());
app.use(cookieParser());
app.use(bp.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(jwtManagger);

app.use('/', homePage);
app.use('/files', canUploadPicture, files);
app.use('/avatar', canUploadPicture, avatar);
app.use('/announcement',  canChangeAnnouncement, announcement);
app.use('/newAnnouncement', checkJWT, newAnnouncement);
app.use('/createAnnouncement', newAnnouncementFormCheck, checkJWT, createAnnouncement);
app.use('/filterAnnouncement', searchFormCheck, filterAnnouncement);
app.use('/auth', auth);
app.use('/register', canRegister, registrationFormCheck, register);
app.use('/api', canDeletePicture, canChangeAnnouncement, canChangeUser, api);
app.use('/myAnnouncements', checkJWT, manageAnnouncement);
app.use('/manageAccount', checkJWT, manageAccount);
app.use('/users', isAdmin, users);
app.use('/user', canChangeUser, user);
app.use('/chat', checkJWT, canChat, chat);
app.use('/messages', checkJWT, canChat, messages);

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
