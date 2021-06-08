const express = require("express"); //route mange and template usage
const path = require("path"); //set/get path property of request

//middleware
const logger = require("morgan"); //log http request
const bodyParser = require("body-parser"); //http request body
const responseTime = require("response-time"); //performance logging
const helmet = require("helmet"); //security
const RateLimit = require("express-rate-limit"); //ip based rate limter
const csp = require("helmet-csp"); //helmet extention

//libs
const cp = require("child_process"); //fork a node process
const assert = require("assert"); //test values

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const users = require("./routes/users");
const session = require("./routes/session");
const etc1 = require("./routes/etc1"); //todo
const etc2 = require("./routes/etc2"); //todo
const { addConsoleHandler } = require("selenium-webdriver/lib/logging");

const app = express();
app.enable("trust proxy");

//applying limite to all requests --protect against dos
const limiter = new RateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    delayMs: 0, //full speed
});
app.use(limiter);

app.use(helmet()); //helmet defults --changes http headers for security
app.use(
    csp({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: [
                "'self'",
                "'unsafe-inline'",
                "ajax.googleapis.com",
                "maxcdn.bootstrapcdn.com",
            ],
            styleSrc: ["'self'", "'unsafe-inline'", "maxcdn.bootstrapcdn.com"],
            fontSrc: ["'self'", "maxcdn.bootstrapcdn.com"],
            imgSrc: ["*"],
        },
    })
);

//adding response time header to mesure resonse time
app.use(responseTime());

//logs all http requests style flag = dev
app.use(logger("dev"));

//sets up the res to contain a body property where json goes
app.use(bodyParser.json({ limit: "100kb" }));

//main html page to be returned
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(express.static(path.join(__dirname, "build")));

let node2 = cp.fork("./worker/app_FORK.js");
node2.on("exit", function (code) {
    node2 = undefined;
    cp.fork("./worker/app_FORK.js");
});

const db = {};
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
    process.env.MONGODB_CONNECT_URL,
    { useNewUrlParser: true },
    function (err, client) {
        assert.equal(null, err);
        db.client = client;
        db.collection - client.db("rotarydb").collection("rotary"); //todo
    }
);

app.set("port", process.env.PORT || 3000);

const server = app.listen(app.get("port"), function () {
    console.log("express server runing on port " + server.address().port);
});
