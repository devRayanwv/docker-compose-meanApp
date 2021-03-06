const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const router = express.Router();
var Schema = mongoose.Schema;
// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker/mongo/db';

// Connect to mongodb
mongoose.connect(dbHost);

// create mongoose schema
const userSchema = new Schema({
  name: String,
  age: Number
});


// create mongoose model
const User = mongoose.model('User', userSchema);

/* GET api listing. */
router.get('/', (req, res) => {
        res.send('api works woooorks');
});

/* GET all users. */
router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.status(500).send(error)

        res.status(200).json(users);
    });
});

/* GET one users. */
router.get('/users/:id', (req, res) => {
    User.findById(req.param.id, (err, users) => {
        if (err) res.status(500).send(error)

        res.status(200).json(users);
    });
});

/* Create a user. */
router.post('/users', (req, res) => {
    let user = new User({
        name: req.body.name,
        age: req.body.age
    });

    user.save(error => {
        if (error) res.status(500).send(error);

        res.status(201).json({
            message: 'User created successfully'
        });
    });
});

module.exports = router;