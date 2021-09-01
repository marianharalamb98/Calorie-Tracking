const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { jwtkey } = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
const Meal = mongoose.model('Meal');


router.post('/signup', async (req, res) => {

    const { email, password, age, height, weight } = req.body;
    try {
        const user = new User({ email, password, age, height, weight });
        await user.save();
        console.log("worked")
        res.status(204).send()

    } catch (err) {
        return res.status(422).send(err.message)
    }

})

router.post('/signin', async (req, res) => {

    const body = req.body

    if (!body.email || !body.password) {
        return res.status(422).send({ error: "must provide email or password1" })
    }
    const user = await User.findOne({ email: body.email })
    if (!user) {
        return res.status(422).send({ error: "must provide email or password2" })
    }
    if (!user) {
        return res.status(422).send({ error: "must provide email or password3" })
    }
    try {
        await user.comparePassword(body.password, user.password);
        const token = jwt.sign({ userId: user._id }, jwtkey)
        res.send({ token: token, email: user.email, age: user.age, height: user.height, weight: user.weight, _id: user._id })
    } catch {
        return res.status(422).send({ error: "must provide email or password4" })
    }

})

router.post('/addFood', async (req, res) => {
    const { name, calories, date, mealtype, userId } = req.body;
    try {
        const meal = new Meal({ name, calories, date, mealtype, userId });
        await meal.save();
        console.log("worked")
        res.status(204).send()

    } catch (err) {
        return res.status(422).send(err.message)
    }
})

router.get('/meals/:userId', async (req, res) => {
    const userId = req.params.userId;
    const todayFirstHour = new Date();
    const todayLastHour = new Date();
    const addTwoHours = 2 * 60 * 60 * 1000;

    todayFirstHour.setHours(0, 0, 0, 0);
    todayLastHour.setHours(23, 59, 59, 999);
    todayFirstHour.setTime(addTwoHours + todayFirstHour.getTime());
    todayLastHour.setTime(addTwoHours + todayLastHour.getTime());

    Meal.find({
        $and: [
            {
                date: {
                    $gte: todayFirstHour,
                    $lt: todayLastHour
                }
            },
            {
                userId: userId
            }
        ]
    }).then((meals) => {
        res.status(200).json({
            meals: meals
        })
    });

})


router.get('/history/:userId', async (req, res) => {
    const userId = req.params.userId;
    const today = new Date();
    const lastDayLastHour = new Date();
    const oneWeekAgo = new Date();
    const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    lastDayLastHour.setHours(0, 0, 0, 0);
    lastDayLastHour.setTime(lastDayLastHour.getTime() - 60 * 60 * 1000)

    oneWeekAgo.setTime(oneWeekAgo.getTime() - weekInMilliseconds);

    Meal.find({
        $and: [
            {
                date: {
                    $gte: oneWeekAgo,
                    $lt: lastDayLastHour
                }
            },
            {
                userId: userId
            }
        ]
    }).then((meals) => {
        console.log(meals)
        res.status(200).json({
            meals: meals
        })
    })
        ;

})
module.exports = router