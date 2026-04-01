const models = require('../models');
const Domo = models.Domo;

const makerPage = async (req, res) => {
    try {
        const query = { owner: req.session.account._id };
        const docs = await Domo.find(query).lean().exec();

        return res.render('app', { domos: docs });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error fetching domos' });
    }
}

const makeDomo = async (req, res) => {
    if (!req.body.name || !req.body.age) {
        return res.status(400).json({ error: 'Name and age are required' });
    }

    const domoData = {
        name: req.body.name,
        age: req.body.age,
        owner: req.session.account._id,
    };

    try {
        const domo = new Domo(domoData);
        await domo.save();
        return res.json({ redirect: '/maker' });
    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Domo with that name already exists' });
        }
        return res.status(500).json({ error: 'Error creating domo' });
    }
};

module.exports = {
    makerPage,
    makeDomo,
};