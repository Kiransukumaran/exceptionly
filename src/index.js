const app = require('./app');

const devPort = process.env.PORT || 3003;

app.listen(devPort, () => console.log('Development server started'));
