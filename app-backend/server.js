const express = require('express');
const app = express();
const port = 4000;
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const isAuth = require('./middleware/isAuth');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

app.use(cors());
app.use(isAuth);
app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose.connect(
  process.env.MONGO,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  function(err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to DB`);
    }
  }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
