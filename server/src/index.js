import app from './app/app.js';
import dotenv from 'dotenv';
import LogHelper from './app/helpers/Loghelper.js';

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => LogHelper.success(`Servidor iniciado em http://localhost:${port}`));
