const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT =  process.env.PORT || 4000;
const cors = require('cors');
const ServerPortRouter = require('./routes/ServerPortRoutes');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/serverport', ServerPortRouter);


if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



app.listen(PORT, function(){
  console.log('Server is running on Port: ',PORT);
});
