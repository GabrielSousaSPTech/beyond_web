var express = require("express");
var router = express.Router();

router.get("/dashboard", function (req, res) {
    console.log(req)
    res.sendFile(path.join(__dirname, '/public/dashboard/browser/index.html'));
});

module.exports = router;