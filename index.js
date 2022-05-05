import path from 'path';
import express from 'express';
import bp from 'body-parser';
import form from './routes/forms.js';
import files from './routes/files.js';

const app = express();

const staticDir = path.join(process.cwd(), 'static');

const PORT = process.env.PORT || 8080;

app.use(express.static(staticDir));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use('/form', form);
app.use('/files', files);

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
