const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const { PORT } = require("../config");
const app = express();

// Settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// MiddleWares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    "Access-Control-Allow-Origin": "*"
}));

// Routes
fs.readdir(path.join(__dirname, "routes"), "utf-8", (err, files) => {
    if(!err) {
        files.forEach(file => {
            let routerPath = path.join(__dirname, "routes", file);

            let Router = require(routerPath);
            if(Router.path && Router.router) {
                app.use(Router.path, Router.router);
            }
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
