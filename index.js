import path from 'path';
import express from 'express';
import bp from 'body-parser';
import eformidable from 'express-formidable';
import form from './routes/forms.js';

const app = express();
const staticDir = path.join(process.cwd(), 'static');
const imagesDir = path.join(process.cwd(), 'images');
const PORT = process.env.PORT || 8080;

app.use(express.static(staticDir));
app.use(express.static(imagesDir));
app.use(bp.json());
app.use(eformidable({ imagesDir }));
app.use(bp.urlencoded({ extended: true }));

app.use('/form', form);

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
