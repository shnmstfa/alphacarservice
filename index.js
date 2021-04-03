require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const helmet = require('helmet');
const app = express();
const port = 3005;
//const corsMw = require('./middlewares/cors');

app.use(bodyParser.json());

// app.options('*', corsMw);
// app.use(corsMw);

app.use(helmet());

// require('./middlewares/session')(app);
// require('./middlewares/secure')(app);
require('./middlewares/ioc')(app);
app.use('/test', require('./routes/test'));
// app.use('/customer', require('./routes/customer'));
// app.use('/journey', require('./routes/journey'));
// app.use('/settings', require('./routes/settings'));
// app.use('/merchandising', require('./routes/merchandising'));
// app.use('/sales', require('./routes/sales'));

// require('./middlewares/redirect')(app);
require('./middlewares/error')(app);

app.listen(port, () => {
  console.log(`Example app listening at http://0.0.0.0:${port}`);
});