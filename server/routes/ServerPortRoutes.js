
const express = require('express')
const app = express();
const ServerPortRouter = express.Router();
app.use('/serverport', ServerPortRouter);

ServerPortRouter.route('/').post(function (req, res) {
    console.log(req.body);

    res.send({"data":"Data is Received by Server, Frontend-Backend are connected"});

});



module.exports = ServerPortRouter;