
const express = require('express')
const app = express();
const ServerPortRouter = express.Router();
app.use('/serverport', ServerPortRouter);
'use strict';


function finished(err)
{
    console.log('success');
}
ServerPortRouter.route('/').post(function (req, res) {
    console.log(req.body);
    let raw = req.body;
    res.send({"data":"Data is Received by Server, Frontend-Backend are connected"});
    make(raw);
});

let str1 = "\\documentclass[a4paper,10pt]{article}\n\\usepackage{anysize}\n\\usepackage{amsmath}\n\\usepackage{amssymb}\n\\usepackage{graphicx}\n";
let str2 = "\\usepackage[left=0.75in, right=0.75in, top=0.5in, bottom=0.75in, includefoot, headheight=13.6pt]{geometry}\n\\usepackage{color,graphicx}\n\\usepackage{verbatim}\n";
let str3 = "\\usepackage{hyperref}\n\\usepackage{multirow}\n\\usepackage{latexsym}\n\\usepackage{mdwlist}\n\\usepackage{tabularx}\n\\renewcommand{\\labelitemii}{$\\circ$}\n\n\n\n";
let def1 = "\\hypersetup{\nbookmarks=true, \nunicode=false, \npdftoolbar=true, \npdfmenubar=true,\n";
let def2 = "pdffitwindow=true,\npdftitle={CV - XYZ},\n pdfauthor={Newton}, \npdfsubject={Placements IITTP},\ncolorlinks=true,\n";
let def3 = "linkcolor=magenta,\ncitecolor=blue,\nfilecolor=magenta,\nurlcolor=cyan\n}\n\n\n";
let mar = "\\addtolength{\\oddsidemargin}{-0.215in}\n\\addtolength{\\textwidth}{0.2in}\n\\definecolor{titleColor}{rgb}{0.85, 0.85, 0.85}\n\n";
let basic_begin = "\\begin{table}[h!]\n\n\\begin{center}\n\\begin{tabular}{  l  p{10cm}  p{8cm}}\n\\raisebox{-\\totalheight}{\\includegraphics[scale=.2]{logoupdated.png}}\n&\n\\begin{itemize}\n\\setlength\\itemsep{.01em}\n"
let basic_end = "\\end{itemize}\n\\end{tabular}\n\\end{center}\n\\end{table}\n\n\\vspace{-.8cm}\n\n";
let educationDetails_begin1 = "\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Education Details}}}\n\\\\ \\\\\n";
let educationDetails_begin2 = "\\indent \\begin{tabular}{ l @{\\hskip 0.65in} l @{\\hskip 0.90in} l @{\\hskip 1.00in} l @{\\hskip 0.27in} l }\n";
let educationDetails_begin3 = "\\hline\n\\textbf{Program} & \\textbf{Institute} & \\textbf{Year} & \\textbf{\\%/CGPA} \\\\ \n \\hline\n\n";
function make(raw) {
    const fs = require('fs');
    fs.writeFileSync('laTex.tex', str1);
    fs.appendFileSync('laTex.tex', str2);
    fs.appendFileSync('laTex.tex', str3);
    fs.appendFileSync('laTex.tex', def1);
    fs.appendFileSync('laTex.tex', def2);
    fs.appendFileSync('laTex.tex', def3);
    fs.appendFileSync('laTex.tex', mar);
    fs.appendFileSync('laTex.tex', "\\begin{document}\n\n"); // document begins
    if (raw['basic'])
        basic(raw['basic']);
    if (raw['educationdetails'])
        educationDetails(raw['educationdetails']);
    if (raw['areasofinterest'])
        areaOfInterest(raw['areasofinterest']);
    if (raw['technicalproficiency'])
        technicalProficiency(raw['technicalproficiency']);
    if (raw['academicprojects'])
        academicProject(raw['academicprojects']);
    if (raw['experience'])
        experience(raw['experience']);
    if (raw['courses'])
        relevantCourses(raw['courses']);
    if (raw['achievements'])
        achievements(raw['achievements']);
    if (raw['positionsofresponsibility'])
        positonsOfResponsibility(raw['positionsofresponsibility']);
    if (raw['extracurricularactivities'])
        extraCurricularActivities(raw['extracurricularactivities']);
    if (raw['hobbiesandinterests'])
        hobbies(raw['hobbiesandinterests']);
    fs.appendFileSync('laTex.tex', "\\end{document}\n"); // document ends
    console.log('JAI HIND');    
}

function basic(basic) {
    const fs = require('fs');
    fs.appendFileSync('laTex.tex', basic_begin);
    fs.appendFileSync('laTex.tex', `\\item[] \\textbf{${basic['name']}}\n`)
    fs.appendFileSync('laTex.tex', `\\item[] \\textbf{${basic['degree']}}\n`)
    fs.appendFileSync('laTex.tex', `\\item[] \\textbf{${"Indian Institute of Technology Tirupati, India"}}\n`)
    fs.appendFileSync('laTex.tex', `\\item[] \\textbf{${basic['email']}}\n`)
    fs.appendFileSync('laTex.tex', `\\item[] \\textbf{${basic['linkdinid']}}\n`)
    fs.appendFileSync('laTex.tex', basic_end);
}

function educationDetails(educationDetails) {
    const fs = require('fs');
    fs.appendFileSync('laTex.tex', educationDetails_begin1);
    fs.appendFileSync('laTex.tex', educationDetails_begin2);
    fs.appendFileSync('laTex.tex', educationDetails_begin3);
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
        console.log(tem);
        fs.appendFileSync('laTex.tex',`${tem} & ${i['institute']} & ${i['year']} & ${i['marks']}\\\\ \n`);
    }
    fs.appendFileSync('laTex.tex', "\\end{tabular}\n\n");
}

function areaOfInterest(areaOfInterest) {
    const fs = require('fs');
    let aof_begin1 = "\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Areas of Interest}}}\n";
    let aof_begin2 = "\\begin{itemize}\\setlength{\\itemsep}{1pt}\n";
    fs.appendFileSync('laTex.tex', aof_begin1);
    fs.appendFileSync('laTex.tex', aof_begin2);
    fs.appendFileSync('laTex.tex', "\\item {{");
    let tem = "";
    for (let i = 0; i < areaOfInterest.length; i++) {
        tem += areaOfInterest[i]['interest'];
        if (i < areaOfInterest.length - 1) tem += ', ';
    }
    fs.appendFileSync('laTex.tex', `${tem}}}\n\\end{itemize}\n\n`);
}

function technicalProficiency(technicalProficiency) {
    const fs = require('fs');
    let tp1 = "\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Technical Proficiency}}}\\\\ \n\n";
    let tp2 = "\\begin{tabular}{p{1.6in}p{0.1in}p{4.5in}}\n";
    fs.appendFileSync('laTex.tex', tp1);
    fs.appendFileSync('laTex.tex', tp2);
    for (let i = 0; i < technicalProficiency.length; i++) {
        let title = technicalProficiency[i]['title'];
        let values = technicalProficiency[i]['titlevalue'];
        let tem = `\\textbf{\\small{${title}}} &: &{{${values}}} \\\\\n`;
        fs.appendFileSync('laTex.tex', tem);
    }
    fs.appendFileSync('laTex.tex', "\\end{tabular}\n\n");
}

function academicProject(academicProject) {
    const fs = require('fs');
    let ap = "\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Academic Projects}}}\n\n";
    fs.appendFileSync('laTex.tex', ap);
    for (let i = 0; i < academicProject.length; i++) {
        let project_name = academicProject[i]['projectname'];
        let guide = academicProject[i]['projectguide'];
        let description = academicProject[i]['projectdescription'];
        let duration = academicProject[i]['projectduration'];
        fs.appendFileSync('laTex.tex', `\\begin{itemize*}\n\\setlength{\\itemsep}{1pt}\n\\item \\textbf{${project_name}}`);
        if (guide == "") {
            fs.appendFileSync('laTex.tex', `\\hfill {\\small{{\\textbf{[${duration}]}}\\/}}\n`);
            fs.appendFileSync('laTex.tex', `\\begin{itemize*}\n
            \\item ${description} \n
            \\end{itemize*}\n
            \\end{itemize*}\n\n`);
        }
        else {
            fs.appendFileSync('laTex.tex', `\n \\\\ {(Guide : ${guide})}`);
            fs.appendFileSync('laTex.tex', `\\hfill {\\small{{\\textbf{[${duration}]}}\\/}}\n`);
            fs.appendFileSync('laTex.tex', '\\begin{itemize*}\n');
            fs.appendFileSync('laTex.tex', `\\setlength{\\itemsep}{.00pt}\n
            \\item \\textbf{Abstract}: ${description} \n
            \\end{itemize*} \n
            \\end{itemize*} \n\n`);
        }
    }
}

function experience(experience) {
    const fs = require('fs');
    let ap = "\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Experience}}}\n\n";
    fs.appendFileSync('laTex.tex', ap);
    for (let i = 0; i < experience.length; i++) {
        let exper = experience[i]['experience'];
        let guide = experience[i]['expguide'];
        let description = experience[i]['expdescription'];
        let duration = experience[i]['expduration'];
        fs.appendFileSync('laTex.tex', `\\begin{itemize*}\n\\setlength{\\itemsep}{1pt}\n\\item \\textbf{${exper}}`);
        if (guide == "") {
            fs.appendFileSync('laTex.tex', `\\hfill {\\small{{\\textbf{[${duration}]}}\\/}}\n`);
            fs.appendFileSync('laTex.tex', `\\begin{itemize*}\n
            \\item ${description} \n
            \\end{itemize*}\n
            \\end{itemize*}\n\n`);
        }
        else {
            fs.appendFileSync('laTex.tex', `\n \\\\ {(Guide : ${guide})}`);
            fs.appendFileSync('laTex.tex', `\\hfill {\\small{{\\textbf{[${duration}]}}\\/}}\n`);
            fs.appendFileSync('laTex.tex', '\\begin{itemize*}\n');
            fs.appendFileSync('laTex.tex', `\\setlength{\\itemsep}{.00pt}\n
            \\item \\textbf{Abstract}: ${description} \n
            \\end{itemize*} \n
            \\end{itemize*} \n\n`);
        }
    }
}

function relevantCourses(relevantCourses) {
    const fs = require('fs');
    let rc = `\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Relevant Courses}}}\\\\[0.08in]
    \\begin{tabular}{p{3.5in}p{3in}p{2.5in}}\n`;
    fs.appendFileSync('laTex.tex', rc);
    for (let i = 0; i < relevantCourses.length; i = i + 2) {
        let course1 = relevantCourses[i]['course'], course2 = "";
        if (i + 1 < relevantCourses.length) {
            course2 = relevantCourses[i + 1]['course'];
        }
        fs.appendFileSync('laTex.tex', `\\hspace{0.9pc}$\\bullet$ ${course1}`)
        if (course2 != "") fs.appendFileSync('laTex.tex', `&$\\bullet$ ${course2}\\\\[0.05in]\n`);
        else fs.appendFileSync('laTex.tex', '\n');
    }
    fs.appendFileSync('laTex.tex', `\\end{tabular}\n\n`);
}

function achievements(achievements) {
    const fs = require('fs');
    fs.appendFileSync('laTex.tex', `\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Achievements}}}\\\\[0.08in]\n
    \\begin{itemize} \n \\setlength{\\itemsep}{1pt}\n`);
    for (let i = 0; i < achievements.length; i++) {
        let achievement = achievements[i]['achievement'];
        fs.appendFileSync('laTex.tex', `\\item ${achievement}\n`);
    }
    fs.appendFileSync('laTex.tex', `\\end{itemize}\n\n`);
}

function positonsOfResponsibility(positonsOfResponsibility) {
    const fs = require('fs');
    fs.appendFileSync('laTex.tex', `\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Positions of Responsibility}}}\\\\\n\n`);
    for (let i = 0; i < positonsOfResponsibility.length; i++) {
        let position = positonsOfResponsibility[i]['position'];
        let duration = positonsOfResponsibility[i]['posduration'];
        let workdescription = positonsOfResponsibility[i]['workdescription'];
        fs.appendFileSync('laTex.tex', `\\textbf{${position}}  \\hfill {\\small{{\\textbf{[${duration}]}}}\\/} \n`);
        fs.appendFileSync('laTex.tex', `\\begin{itemize*} \n
        \\item ${workdescription} \n
        \\end{itemize*}\n\n`)
    }
}

function extraCurricularActivities(extraCurricularActivities) {
    const fs = require('fs');
    fs.appendFileSync('laTex.tex', `\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Extra Curricular activities}}}\n\n`);
    fs.appendFileSync('laTex.tex', `\\begin{itemize}\n
    \\setlength{\\itemsep}{1pt}\n`);
    for (let i = 0; i < extraCurricularActivities.length; i++) {
        let activity = extraCurricularActivities[i]['activity'];
        fs.appendFileSync('laTex.tex', `\\item ${activity} \\hfill {\\small{{[Mar '19]}}\\/}\n`); // error
    }
    fs.appendFileSync('laTex.tex', `\\end{itemize}\n\n`);
}

function hobbies(hobbies) {
    const fs = require('fs');
    fs.appendFileSync('laTex.tex', `\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Hobbies and Interests}}}\n\n`);
    for (let i = 0; i < hobbies.length; i++) {
        let hobby = hobbies[i]['hobby'];
        fs.appendFileSync('laTex.tex', `\\begin{itemize}
        \\setlength{\\itemsep}{1pt}\n`);
        fs.appendFileSync('laTex.tex', `\\item ${hobby}\n\\end{itemize}\n\n`);
    }
}
module.exports = ServerPortRouter;
