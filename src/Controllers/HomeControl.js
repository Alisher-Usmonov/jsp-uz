module.exports = async (req, res) => {
    res.status(200).render("index", {
        title: "Fake API"
    });
};