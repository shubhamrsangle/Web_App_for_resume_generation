const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); 

const app = express();

app.use(cors());	//To use axios from react-app

// BodyParser Middleware
app.use(bodyParser.json());


//If you don't want to run database just comment this section
//<---------------------------------------------------------->

//DB config
const db = process.env.DBURL;
//Connect to Mongodb
mongoose
	.connect(db,
	{
		useNewUrlParser:true,
		useCreateIndex:true
	})
	.then(() => console.log('Database Connected...'))
	.catch(err => console.log(err));

//<---------------------------------------------------------->

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
{
	console.log(`Server started on PORT : ${PORT}`);
});