const express = require('express');
const router = express.Router();
const db = require('../service/db');
const todoSchema = require('../joiScheme');

// validate todo using joi
const validateTodo = async (req, res, next) => {
    try {
        const { error } = todoSchema.validate(req.body);
        if (error) {
            const err = new Error(error.details[0].message);
            err.status = 400;
            throw err;
        }
        next();
    } catch (error) {
        next(error);
    }
};

// get all todos
router.get('/todos', async (req, res) => {
    const sql = 'SELECT * FROM ToDoTable';
    const results = await db.query(sql);
    res.send(results);
});

// get todo by id
router.get('/todos/:id', async (req, res, next) => {
    try {
        const sql = 'SELECT * FROM ToDoTable WHERE id = ?';
        const results = await db.query(sql, [req.params.id]);
        if (results.length === 0) {
            const error = new Error('Todo not found');
            error.status = 404;
            throw error;
        }
        res.send(results[0]);
    } catch (error) {
        next(error);
    }
});

// create todo 
//validate todo using joi
router.post('/todos', validateTodo, async (req, res) => {
    const sql = 'INSERT INTO ToDoTable (title, status) VALUES (?, ?)';
    const results = await db.query(sql, [req.body.title, req.body.status]);
    res.send(results);
});

// update todo status
//validate todo using joi
router.put('/todos/:id', validateTodo, async (req, res, next) => {
    try {
        const sql = 'UPDATE ToDoTable SET status = ? WHERE id = ?';
        const results = await db.query(sql, [req.body.status, req.params.id]);
        if (results.affectedRows === 0) {
            const error = new Error('Todo not found');
            error.status = 501;
            throw error;
        }
        res.send(results);
    } catch (error) {
        next(error);
    }
});

// delete todo
router.delete('/todos/:id', async (req, res, next) => {
    try {
        const sql = 'DELETE FROM ToDoTable WHERE id = ?';
        const results = await db.query(sql, [req.params.id]);

        if (results.affectedRows === 0) {
            const error = new Error('Todo not found');
            error.status = 501;
            throw error;
        }
        res.send(results);
    } catch (error) {
        next(error);
    }


});

module.exports = router;
