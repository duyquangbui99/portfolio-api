module.exports = (req, res) => {
    if (req.method === 'GET') {
        res.status(200).send("Hi THIS IS QUANG's API, I JUST WANT to test if it works!");
    } else {
        res.status(405).send("Method Not Allowed");
    }
};
