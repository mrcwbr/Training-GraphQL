export default {
  client: 'mssql',
  connection: {
    host: "127.0.0.1",
    port: 1633,
    user: "sa",
    password: "GraphQL!Workshop",
    database: "conferences",
    options: {
      trustServerCertificate: true
    }
  },
};
