const express = require('express');
const app = express();
const ServerPortRouter = express.Router();
app.use('/serverport', ServerPortRouter);

const latex = require('node-latex');
const fs = require('fs');
const path = require('path');

hobby = (data) => {
  var ret = '';
  data.forEach((item,index) => ret = ret + '\\item ' + item.hobby + '\n');
  return ret;
}

extraCurricularActivity = (data) => {
  var ret = '';
  data.forEach((item,index) => ret = ret + '\\item ' + item.activity +' \\hfill {\\small{{[' + '' + ']}}\\/}\n');
  return ret;
}

positionsOfResponsibility = (data) => {
  var ret = '';
  data.forEach((item,index) => {
    ret = ret + '\\textbf{'+ item.position + '}  \\hfill {\\small{{\\textbf{['+ item.posduration +']}}}\\/}\n' +
    '\\begin{itemize*}\n' +
  //  '\\item key role of your position.\n' +
    '\\'+ item.workdescription +'\n' +
    `\\end{itemize*}\n`
  });
  return ret;
}

achievement = (data) => {
  var ret = '';
  data.forEach((item,index) => {
    ret = ret + '\\item '+ item.achievement + '\n';
  });
}

relevantCourses = (data) => {
  const len = data.length;
  var ret = '',i=0;
  for(i = 0;i<len;i = i+2){
    ret = ret + '\\hspace{0.9pc}$\\bullet$ ' + data[i].course +' &$\\bullet$ ' + data[i+1].course + '\\\\[0.05in]\n';
  }
  if(i<len){
    ret = ret + '\\hspace{0.9pc}$\\bullet$ ' + data[i].course +'\n';
  }
}

experience = (data) => {
  var ret = '';
  data.forEach((item,index) => {
    `\\begin{itemize*}\n` +
      `\\setlength{\\itemsep}{.00pt}\n` +
      `\\item \\textbf{{` + item.experience + `}} \\hfill {\\small{{\\textbf{[` + item.expduration + `]}}\\/}} \\\\\n` +
    `{(Guide : ` + item.expguide + `)}\n` +
          `\\begin{itemize*}\n` +
           `\\item `+ item.expdescription +`\n` +
          `\\end{itemize*}\n` +
         `\\end{itemize*}`
  });
}

academicProjects = (data) => {

}

ServerPortRouter.route('/').post(function (req, res) {
    const hobbies = hobby(req.body.hobbiesandinterests);
    const activities = extraCurricularActivity(req.body.extracurricularactivities);
    const positionsResponse = positionsOfResponsibility(req.body.positionsofresponsibility);
    const achievements = achievement(req.body.achievements);
    const courses = relevantCourses(req.body.courses);

  fs.readFile(path.join( __dirname , 'template.tex'),'utf8', (err, contents) => {
    if (err) {
      console.log(err);
    }
    const lines = contents.split('\n');
    for (line in lines){
      switch(lines[line]){
        case "%Add Hobbies\r":
            lines.splice(line,1);
            lines.splice(line,0,hobbies);
            break;
        case "%Add Activities\r":
            lines.splice(line,1);
            lines.splice(line,0,activities);
            break;
        case "%Add Positions of Responsibility\r":
            lines.splice(line,1);
            lines.splice(line,0,positionsResponse);
            break;
        case "%Add Achievements\r":
            lines.splice(line,1);
            lines.splice(line,0,achievements);
            break;
        case "%Add Relevant Courses\r":
            lines.splice(line,1);
            lines.splice(line,0,courses);
            break;
        default:
      }
        if(lines[line] === "%Add Hobbies\r"){
          lines.splice(line,1);
          lines.splice(line,0,hobby(req.body.hobbiesandinterests));
          break;
      }
    }

    contents = lines.join('\n');

    fs.writeFile(path.join(__dirname,'temp.tex'),contents, 'utf8' ,(err) => {
      if(err) throw err;
    });
  });
/*
  //Input latex file
  const input = fs.createReadStream(path.join( __dirname , 'temp.tex'));

    //Name of output File
    const output = fs.createWriteStream(path.join( __dirname , 'templateOutput.pdf'));
  	//Object for pdf generation
  	const pdf = latex(input);

  //Piping out object
	pdf.pipe(output);
	pdf.on('error', err => console.error(err));
	pdf.on('finish', () => {
		console.log('PDF generated!');
		res.send('PDF Generated...!');
	});
  */
});


module.exports = ServerPortRouter;
