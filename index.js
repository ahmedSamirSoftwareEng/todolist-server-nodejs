const express = require('express');
const app = express();
const port = 3000;
const todoRouter = require('./routes/todo');

app.use(express.json());

app.use('/api', todoRouter);

//middleware for error
app.use((err, req, res, next) => {
    res.status(err.status).send({message: err.message});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})