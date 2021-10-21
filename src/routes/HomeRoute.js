const HomeControl = require("../Controllers/HomeControl");

const router = require("express").Router();

router.get("/", HomeControl);
module.exports = {
    path: "/",
    router
}