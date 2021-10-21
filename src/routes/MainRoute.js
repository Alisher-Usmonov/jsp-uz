const { AllGET, ByGET, AllPOST, ByPOST, AllPATCH, ByPATCH, AllDELETE, ByDELETE } = require("../Controllers/MainControl");

const router = require("express").Router();

router.get("/:id", AllGET);
router.get("/:id/:idx", ByGET);
router.post("/:id", AllPOST);
router.post("/:id/:idx", ByPOST);
router.patch("/:id", AllPATCH);
router.patch("/:id/:idx", ByPATCH);
router.delete("/:id", AllDELETE);
router.delete("/:id/:idx", ByDELETE);

module.exports = {
    path: "/",
    router
}