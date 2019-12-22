const express = require('express');
const app = express();
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
app.use(express.json());
const fileUpload = require('express-fileupload');
const isAuth = require('./middleware/isAuth');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

app.use(fileUpload());
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

app.post('/upload', (req, res) => {
  let uploadedFile = req.files.file;
  const filename = req.files.file.name;
  uploadedFile.mv(`${__dirname}/uploads/${filename}`, error => {
    if (error) {
      return res.status(500).send(error);
    }
    return res.json(filename);
  });
});

app.get('/', (req, res) => {
  res.send(
    'InstaClone API. Go to /graphql to try out the GraphiQL playground!'
  );
});

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

app.listen(process.env.PORT || 4000, () => {
  console.log('Server is running at port : ' + 4000);
});
