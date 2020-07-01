const server = require('./api/server');

const port = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${port} ===\n`);
});
