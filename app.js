const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");


// app.use((req, res, next) => {
//     console.log("Hello I am middleware");
//     return next();
// })

// app.use("/api", (req, res, next) => {
//     const { token } = req.query;
//     if (token === "giveaccess") {
//         next();
//     }
//     res.send("ACCESS DENIED!")
// })


app.use("/random", (req, res, next) => {
    console.log("Hey I am only for random!");
    next();
})

app.use((req, res, next) => {
    req.time = new Date(Date.now()).toString() ;
    console.log(req.method, req.hostname, req.path, req.time);
    next();
})

app.get("/", (req, res) => {
    res.send("Hi!, I am root.");
})

app.get("/random", (req, res) => {
    res.send("this is a random page.")
})

// passing multiple middlewares

const checkQuerry = (req, res, next) => {
    const { token } = req.query;
    if (token === "giveaccess") {
        next();
    }
    throw new ExpressError(401,"ACCESS DENIED!")
}

app.get("/api",checkQuerry, (req, res) => {
    res.send("data");
})

app.get("/err", (req, res) => {
    abcd = abcd;
})

app.get("/admin", (req, res) => {
    throw new ExpressError(403,"Access to admin is forbidden.")
})

// ERROR HANDLING MIDDLEWARES

app.use((err, req, res, next) => {
    const { status = 500, message = "Some error occured" } = err;
    res.status(status).send(message);
})



//404
// app.use((req, res) => {
//     res.status(404).send("Page not found!");
// })



app.listen(8080, () => {
    console.log("Listning at port 8080");
})