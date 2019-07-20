const express = require('express')
const app = express();
const ServerPortRouter = express.Router();
app.use('/serverport', ServerPortRouter);

const latex = require('node-latex');
const fs = require('fs'); 
const path = require('path');

ServerPortRouter.route('/').post(function (req, res) {
    console.log(req.body);
    
    //Input latex file
    const input = fs.createReadStream(path.join( __dirname , 'input.tex'));
    //Name of output File
	const output = fs.createWriteStream(path.join( __dirname , 'output.pdf'));
	//Object for pdf generation
	const pdf = latex(input);

	//Piping out object
	pdf.pipe(output);
	pdf.on('error', err => console.error(err));
	pdf.on('finish', () => console.log('PDF generated!'));
	
	res.send(pdf);
});



module.exports = ServerPortRouter;