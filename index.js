const express = require('express');
require('./database/databaseConnection');
const errorMiddleware = require('./middleware/errorMiddleware');


//Routes
const userRouter = require('./router/userRouter');
const dietitianRouter = require('./router/dietitianRouter');
const foodRouter = require('./router/foodRouter');
const dietListRouter = require('./router/dietListRouter');
const weightRouter = require('./router/weightRouter');
const questionRouter = require('./router/questionRouter');
const notificationRouter = require('./router/notificationRouter');
const evaluationRouter = require('./router/evaluationRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/users', userRouter);
app.use('/api/dietitians', dietitianRouter);
app.use('/api/foods', foodRouter);
app.use('/api/dietLists', dietListRouter);
app.use('/api/weights', weightRouter);
app.use('/api/questions', questionRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/evaluations', evaluationRouter);

app.get('/',(req,res) =>{
    res.status(200).json({'mesaj': 'hello'});
})

app.use(errorMiddleware);

app.listen(5000, () => {
    console.log("Server running on port 3000");
})

