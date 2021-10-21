const getDB = require("../modules/getDB")
const fs = require("fs/promises");
const path = require("path");

module.exports = {
    async AllGET(req, res) {
        let { id } = req.params;
        let db = await getDB();
        let data = db[id];

        if (!data) {
            res.status(400).json({});
            return;
        }
        res.status(200).json(data);
    },
    async ByGET(req, res) {
        let { id, idx } = req.params;
        let db = await getDB();

        let find = db[id].find(user => user.id === parseInt(idx));

        if (!find) {
            res.status(400).json({
                ok: false,
                message: "Malumot topilmadi"
            });
            return;
        }
        res.status(200).json(find);
    },
    async AllPOST(req, res) {
        let { id } = req.params;
        let db = await getDB();
        let data = {
            ...req.body,
            id: db[id].length + 1
        }

        if (!db[id]) {
            res.status(400).json({});
            return;
        }
        db[id].push(data);
        await fs.writeFile(path.join(__dirname, "..", "db", "db.json"), JSON.stringify(db));
        res.status(200).json(data);
    },
    async ByPOST(req, res) {
        res.status(404).json({});
    },
    async AllDELETE(req, res) {
        res.status(404).json({})
    },
    async ByDELETE(req, res) {
        let { id, idx } = req.params;
        let db = await getDB();

        let index = db[id].findIndex(el => el.id === parseInt(idx));

        if (!db[id]) {
            res.status(404).json({});
            return;
        }

        if(!index) {
            res.status(404).json({});
            return;
        }

        db[id].splice(index, 1);
        console.log("Index &d", index)
        await fs.writeFile(path.join(__dirname, "..", "db", "db.json"), JSON.stringify(db));
        res.status(200).json({
            ok: true,
            message: "Muvaffaqiyatli o'chirildi"
        });
    },
    async AllPATCH(req, res) {
        res.status(404).json({})
    },
    async ByPATCH(req, res) {
        let { id, idx } = req.params;
        let db = await getDB();
        let find = db[id].find(el => el.id === parseInt(idx));

        if (!db[id]) {
            res.status(404).json({});
            return;
        }

        if(!find) {
            res.status(404).json({});
            return;
        }
        let data = {
            ...find,
            ...req.body,
        }

        db[id][parseInt(idx) - 1] = data;
        console.log(db[id][parseInt(idx)])
        await fs.writeFile(path.join(__dirname, "..", "db", "db.json"), JSON.stringify(db));
        res.status(200).json(data);
    },
}