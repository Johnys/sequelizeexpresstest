const app = require('./app');

class Server {
  static init() {
    try {
      app.listen(3001, () => {
        console.log('Express App Listening on Port 3001'); // eslint-disable-line
      });
    } catch (error) {
      console.error(`An error occurred: ${JSON.stringify(error)}`); // eslint-disable-line
      process.exit(1);
    }
  }
}

Server.init();
