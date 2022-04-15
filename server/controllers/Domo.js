const models = require('../models');

const { Domo } = models;

const makerPage = (req, res) => {
  res.render('app');
};

const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(401).json({ error: 'both name and age are required' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    owner: req.session.account._id,
  };

  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res.status(201).json({ name: newDomo.name, age: newDomo.age });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists!' });
    }
    return res.status(400).json({ error: 'An error occured' });
  }
};

const getDomos = async (req, res) => Domo.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    res.status(400).json({ error: 'An error has occured!' });
  }
  return res.json({ domos: docs });
});

module.exports = {
  makerPage,
  makeDomo,
  getDomos,
};
