const express = require('express');
const app = express();
const ServerPortRouter = express.Router();
const uuid = require('uuid');
app.use('/serverport', ServerPortRouter);
'use strict';

const latex = require('node-latex');
const fs = require('fs');
const path = require('path');
const localStorage = require('localStorage');

const multer = require("multer");

const storage = multer.diskStorage({
   destination: "./server/routes/images/",
   filename:  async function(req, file, cb) {
     if(localStorage.getItem("currentFile")){
       console.log("Trying to Remove");
       fs.unlink('./server/routes/images/' + localStorage.getItem('currentFile'), function(err) {
         if(err)
          console.log("error");
       });
     }
      await localStorage.setItem("currentFile",localStorage.getItem('photoName') + path.extname(file.originalname));
      cb(null, localStorage.getItem("currentFile"));
   }
});

const upload = multer({
   storage: storage
}).single('photo');

ServerPortRouter.route("/removePhoto").post((req,res) => {
  if(localStorage.getItem('currentFile') !== null){
    fs.unlink('./server/routes/images/' + localStorage.getItem('currentFile'), function(err) {
      if (err)
        return res.status(404);
   });
   localStorage.removeItem('currentFile');
   return res.status(200).json({msg:"done"});
 }
 return res.status(400).json({msg:"suma"});
});

ServerPortRouter.route("/upload").post( async (req,res) => {
    if(localStorage.getItem('photoName') === null)
    {
      localStorage.setItem("photoName", uuid());
    }
    else{
      console.log(localStorage.getItem("photoName"));
    }
    upload(req,res, (err) => {
      if(err){
        return res.status(440);
      }
      if(req.file === undefined){
        return res.status(404).json({msg:"Image Not Found"});
      }
      else {
        res.status(200).json({
          msg: "File Uploaded"
        });
      }
    });
});

ServerPortRouter.route('/').post(function (req, res) {
  if(localStorage.getItem('photoName') === null){
    localStorage.setItem("photoName", uuid());
  }
    let raw = req.body;
    if(raw.basic.photo === null && localStorage.getItem('currentFile') !== null){
      fs.unlink('./server/routes/images/' + localStorage.getItem('currentFile'), function(err) {
        if(err)
          return res.status(404);
     });
     localStorage.removeItem('currentFile');
    }
    logopath=path.join(__dirname,'logoupdated.png');
    logopath=logopath.split('\\').join('/');
    make(raw);

    //Input latex file
    const input = fs.createReadStream(path.join( __dirname ,'tex', localStorage.getItem('photoName') + '.tex'));
    //Name of output File
    const output = fs.createWriteStream(path.join( __dirname ,'pdf', localStorage.getItem('photoName')+'.pdf'));
    //Object for pdf generation
    const pdf = latex(input);

    //Piping out object
    pdf.pipe(output);
    pdf.on('error', err => {
        console.error(err);
        res.send(false);
    });
    pdf.on('finish', () => {
        console.log('PDF generated!');
        res.send(true);
    });
});

ServerPortRouter.route('/imgFile').get((req,res) => {
    if(localStorage.getItem('currentFile'))
      res.sendFile(path.join(__dirname,'images', localStorage.getItem('currentFile')));
    else {
      res.sendFile(path.join(__dirname, "noProfilePic.jpg"));
    }
});

ServerPortRouter.route('/').get(function (req, res) {
    res.download(path.join(__dirname,'pdf',localStorage.getItem('photoName')+'.pdf'),'CV.pdf');
});


function updateValueLatex(str) {
  str = str.split("%").join("\\%");
  str = str.split("'").join("\'");
  str = str.split("{").join("\\{");
  str = str.split("}").join("\\}");
  str = str.split('"').join('\"');
  return str;
}


function finished(err)
{
    console.log('success');
}

let str1 = "\\documentclass[a4paper,10pt]{article}\n\\usepackage{anysize}\n\\usepackage{amsmath}\n\\usepackage{amssymb}\n\\usepackage{graphicx}\n";
let str2 = "\\usepackage[left=0.75in, right=0.75in, top=0.5in, bottom=0.75in, includefoot, headheight=13.6pt]{geometry}\n\\usepackage{color,graphicx}\n\\usepackage{verbatim}\n";
let str3 = "\\usepackage{hyperref}\n\\usepackage{multirow}\n\\usepackage{latexsym}\n\\usepackage{mdwlist}\n\\usepackage{tabularx}\n\\renewcommand{\\labelitemii}{$\\circ$}\n\n\n\n";
let def1 = "\\hypersetup{\nbookmarks=true, \nunicode=false, \npdftoolbar=true, \npdfmenubar=true,\n";
let def2 = "pdffitwindow=true,\npdftitle={CV - XYZ},\n pdfauthor={Newton}, \npdfsubject={Placements IITTP},\ncolorlinks=true,\n";
let def3 = "linkcolor=magenta,\ncitecolor=blue,\nfilecolor=magenta,\nurlcolor=cyan\n}\n\n\n";
let mar = "\\addtolength{\\oddsidemargin}{-0.215in}\n\\addtolength{\\textwidth}{0.2in}\n\\definecolor{titleColor}{rgb}{0.85, 0.85, 0.85}\n\n";
var logopath=path.join(__dirname,'logoupdated.png');
logopath = logopath.split('\\').join('/');
let basic_begin = "\\begin{table}[h!]\n\n\\begin{center}\n\\begin{tabular}{ p{1in}p{4.45in}p{0.8in}}\n\\raisebox{-1.05\\totalheight}{\\includegraphics[width=1.5in]{"+logopath+"}}\n&\n\\begin{itemize}\n\\setlength\\itemsep{.01em}\n";
let basic_end1 = "\\end{itemize}\n";
let basic_end3 = "\\end{tabular}\n\\end{center}\n\\end{table}\n\n\\vspace{-.8cm}\n\n";
let educationDetails_begin1 = "\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Education Details}}}\n\\\\ \\\\\n";
let educationDetails_begin2 = "\\indent \\begin{tabular}{ l @{\\hskip 0.65in} l @{\\hskip 0.90in} l @{\\hskip 1.00in} l @{\\hskip 0.27in} l }\n";
let educationDetails_begin3 = "\\hline\n\\textbf{Program} & \\textbf{Institute} & \\textbf{Year} & \\textbf{\\%/CGPA} \\\\ \n \\hline\n\n";

function make(raw) {
    const fs = require('fs');
    fs.writeFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', str1);
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', str2);
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', str3);
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', def1);
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', def2);
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', def3);
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', mar);
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', "\\begin{document}\n\n"); // document begins
    if(raw['basic']!=null){
         basic(raw['basic']);
    }
    if(raw['educationdetails'].length>0){
        educationDetails(raw['educationdetails']);
    }
    if(raw['areasofinterest'].length>0){
        areaOfInterest(raw['areasofinterest']);
    }
    if(raw['technicalproficiency'].length>0){
        technicalProficiency(raw['technicalproficiency']);
    }
    if (raw['publications'].length>0) {
        publications(raw['publications']);  // uncomment when publications component is fixed
    }
    if(raw['academicprojects'].length>0){
        academicProject(raw['academicprojects']);
    }
    if(raw['experience'].length>0){
        experience(raw['experience']);
    }
    if(raw['courses'].length>0){
        relevantCourses(raw['courses']);
    }
    if(raw['achievements'].length>0){
        achievements(raw['achievements']);
    }
    if(raw['positionsofresponsibility'].length>0){
        positonsOfResponsibility(raw['positionsofresponsibility']);
    }
    if(raw['extracurricularactivities'].length>0){
        extraCurricularActivities(raw['extracurricularactivities']);
    }
    if(raw['hobbiesandinterests'].length>0){
        hobbies(raw['hobbiesandinterests']);
    }
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', "\\end{document}\n"); // document ends
}

function basic(basic) {
    const fs = require('fs');
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', basic_begin);
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\item[] \\textbf{${updateValueLatex(basic['name'])}}\n`)
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\item[] \\textbf{${updateValueLatex(basic['degree'])}}\n`)
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\item[] \\textbf{${"Indian Institute of Technology Tirupati, India"}}\n`)
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\item[] \\textbf{${updateValueLatex(basic['email'])}}\n`)
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\item[] \\textbf{${"www.linkedin.com/in/"+updateValueLatex(basic['linkedinid'])}}\n`)
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', basic_end1);
    if(localStorage.getItem('currentFile')){
      var profilepath=path.join(__dirname,'images', localStorage.getItem('currentFile'));
      profilepath = profilepath.split('\\').join('/');
      let basic_end_photo = "&\n\\raisebox{-0.8\\totalheight}{\\includegraphics[width=1in,height=1.3in]{{"+profilepath+"}}}\n";
      fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', basic_end_photo);
    }
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', basic_end3);
}

function educationDetails(educationDetails) {
    const fs = require('fs');
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', educationDetails_begin1);
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', educationDetails_begin2);
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', educationDetails_begin3);
    for (let j = 0; j < educationDetails.length; j++) {
        let i = educationDetails[j];
        let tem = "", n = i['programme'].length;
        if (n == 0) tem = '-';
        else {
            for (let k = 0; k < n; k++) {
                if (i['programme'].charAt(k) == '&') {
                    tem  += '\\';
                }
                tem += (i['programme'].charAt(k));
            }
        }
        fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex',`${updateValueLatex(tem)} & ${updateValueLatex(i['institute'])} & ${updateValueLatex(i['year'])} & ${updateValueLatex(i['marks'])}\\\\ \n`);
    }
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', "\\end{tabular}\n\n");
}

function areaOfInterest(areaOfInterest) {
    const fs = require('fs');
    let aof_begin1 = "\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Areas of Interest}}}\n";
    let aof_begin2 = "\\begin{itemize}\\setlength{\\itemsep}{1pt}\n";
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', aof_begin1);
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', aof_begin2);
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', "\\item {{");
    let tem = "";
    for (let i = 0; i < areaOfInterest.length; i++) {
        tem += areaOfInterest[i]['interest'];
        if (i < areaOfInterest.length - 1) tem += ', ';
    }
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `${updateValueLatex(tem)}}}\n\\end{itemize}\n\n`);
}

function technicalProficiency(technicalProficiency) {
    const fs = require('fs');
    let tp1 = "\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Technical Proficiency}}}\\\\ \n\n";
    let tp2 = "\\begin{tabular}{p{1.6in}p{0.1in}p{4.5in}}\n";
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', tp1);
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', tp2);
    for (let i = 0; i < technicalProficiency.length; i++) {
        let title = technicalProficiency[i]['title'];
        let values = technicalProficiency[i]['titlevalue'];
        let tem = `\\textbf{\\small{${updateValueLatex(title)}}} &: &{{${updateValueLatex(values)}}} \\\\\n`;
        fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', tem);
    }
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', "\\end{tabular}\n\n");
}

function publications(publications) {
    const fs = require('fs');
    let pb = `\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Publications}}} \n
    \\begin{itemize}\n\n`;
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', pb);
    for (let i = 0; i < publications.length; i++) {
        let title = publications[i]['pubtitle'];
        let author = publications[i]['pubauthors'];
    let place = publications[i]['pubplace'];
        let details = publications[i]['pubdescription'];
        let doi = publications[i]['pubdoi'];
        fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\setlength{\\itemsep}{1pt}\n`);
        fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\item ${updateValueLatex(title)}\n`);
        fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\newline Authors: ${updateValueLatex(author)}\n`);
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\newline Place of Publication: ${updateValueLatex(place)}\n`);
        fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\newline Description: ${updateValueLatex(details)}\n`);
        fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\newline DOI: ${updateValueLatex(doi)}\n\n`);
    }
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\end{itemize}\n\n`);
}

function academicProject(academicProject) {
    const fs = require('fs');
    let ap = "\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Academic Projects}}}\n\n";
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', ap);
    for (let i = 0; i < academicProject.length; i++) {
        let project_name = academicProject[i]['projectname'];
        let guide = academicProject[i]['projectguide'];
        let description = academicProject[i]['projectdescription'];
        let duration = academicProject[i]['projectduration'];
        fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\begin{itemize*}\n\\setlength{\\itemsep}{1pt}\n\\item \\textbf{${updateValueLatex(project_name)}}`);
        if (guide == "") {
            fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\hfill {\\small{{\\textbf{[${updateValueLatex(duration)}]}}\\/}}\n`);
            fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\begin{itemize*}\n
            \\item ${updateValueLatex(description)} \n
            \\end{itemize*}\n
            \\end{itemize*}\n\n`);
        }
        else {
            fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\n \\\\ {(Guide : ${updateValueLatex(guide)})}`);
            fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\hfill {\\small{{\\textbf{[${updateValueLatex(duration)}]}}\\/}}\n`);
            fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', '\\begin{itemize*}\n');
            fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\setlength{\\itemsep}{.00pt}\n
            \\item \\textbf{Abstract}: ${updateValueLatex(description)} \n
            \\end{itemize*} \n
            \\end{itemize*} \n\n`);
        }
    }
}

function experience(experience) {
    const fs = require('fs');
    let ap = "\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Experience}}}\n\n";
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', ap);
    for (let i = 0; i < experience.length; i++) {
        let exper = experience[i]['experience'];
        let guide = experience[i]['expguide'];
        let description = experience[i]['expdescription'];
        let duration = experience[i]['expduration'];
        fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\begin{itemize*}\n\\setlength{\\itemsep}{1pt}\n\\item \\textbf{${updateValueLatex(exper)}}`);
        if (guide == "") {
            fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\hfill {\\small{{\\textbf{[${updateValueLatex(duration)}]}}\\/}}\n`);
            fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\begin{itemize*}\n
            \\item ${updateValueLatex(description)} \n
            \\end{itemize*}\n
            \\end{itemize*}\n\n`);
        }
        else {
            fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\n \\\\ {(Guide : ${updateValueLatex(guide)})}`);
            fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\hfill {\\small{{\\textbf{[${updateValueLatex(duration)}]}}\\/}}\n`);
            fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', '\\begin{itemize*}\n');
            fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\setlength{\\itemsep}{.00pt}\n
            \\item \\textbf{Abstract}: ${updateValueLatex(description)} \n
            \\end{itemize*} \n
            \\end{itemize*} \n\n`);
        }
    }
}

function relevantCourses(relevantCourses) {
    const fs = require('fs');
    let rc = `\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Relevant Courses}}}\\\\[0.08in]
    \\begin{tabular}{p{3.5in}p{3in}p{2.5in}}\n`;
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', rc);
    for (let i = 0; i < relevantCourses.length; i = i + 2) {
        let course1 = relevantCourses[i]['course'], course2 = "";
        if (i + 1 < relevantCourses.length) {
            course2 = relevantCourses[i + 1]['course'];
        }
        fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\hspace{0.9pc}$\\bullet$ ${updateValueLatex(course1)}`)
        if (course2 != "") fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `&$\\bullet$ ${updateValueLatex(course2)}\\\\[0.05in]\n`);
        else fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', '\n');
    }
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\end{tabular}\n\n`);
}

function achievements(achievements) {
    const fs = require('fs');
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Achievements}}}\\\\[0.08in]\n
    \\begin{itemize} \n \\setlength{\\itemsep}{1pt}\n`);
    for (let i = 0; i < achievements.length; i++) {
        let achievement = achievements[i]['achievement'];
        fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\item ${updateValueLatex(achievement)}\n`);
    }
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\end{itemize}\n\n`);
}

function positonsOfResponsibility(positonsOfResponsibility) {
    const fs = require('fs');
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Positions of Responsibility}}}\\\\\n\n`);
    for (let i = 0; i < positonsOfResponsibility.length; i++) {
        let position = positonsOfResponsibility[i]['position'];
        let duration = positonsOfResponsibility[i]['posduration'];
        let workdescription = positonsOfResponsibility[i]['workdescription'];
        fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\textbf{${updateValueLatex(position)}}  \\hfill {\\small{{\\textbf{[${updateValueLatex(duration)}]}}}\\/} \n`);
        fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\begin{itemize*} \n
        \\item ${updateValueLatex(workdescription)} \n
        \\end{itemize*}\n\n`)
    }
}

function extraCurricularActivities(extraCurricularActivities) {
    const fs = require('fs');
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Extra Curricular activities}}}\n\n`);
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\begin{itemize}\n
    \\setlength{\\itemsep}{1pt}\n`);
    for (let i = 0; i < extraCurricularActivities.length; i++) {
        let activity = extraCurricularActivities[i]['activity'];
        fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\item ${updateValueLatex(activity)} \\hfill \n`); // error
    }
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\end{itemize}\n\n`);
}

function hobbies(hobbies) {
    const fs = require('fs');
    fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Hobbies and Interests}}}\n\n`);
    for (let i = 0; i < hobbies.length; i++) {
        let hobby = hobbies[i]['hobby'];
        fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\begin{itemize}
        \\setlength{\\itemsep}{1pt}\n`);
        fs.appendFileSync(path.join('./server/routes/tex', localStorage.getItem('photoName')) + '.tex', `\\item ${updateValueLatex(hobby)}\n\\end{itemize}\n\n`);
    }
}
module.exports = ServerPortRouter;
