const Hapi = require("@hapi/hapi");
const Routes = require("./booksroutes");

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  server.route(Routes);

  await server.start();
  console.log(`Server anda saat ini sedang berjalan di ${server.info.uri}`);
};

init();
