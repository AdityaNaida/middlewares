const express = require("express");
const app = express();


// app.use((req, res, next) => {
//     console.log("Hello I am middleware");
//     return next();
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

//404
app.use((req, res) => {
    res.status(404).send("Page not found!");
})



app.listen(8080, () => {
    console.log("Listning at port 8080");
})