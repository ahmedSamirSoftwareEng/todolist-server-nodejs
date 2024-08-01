const Joi = require('joi');

// Define the schema for to-do items
const todoSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    status: Joi.string().valid('pending', 'in-progress', 'completed').default('pending')
});

module.exports = todoSchema;