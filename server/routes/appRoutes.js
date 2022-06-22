const notFound = require('../errors/notFound');
const users = require('./users');
const projects = require('./projects');
const tickets = require('./tickets');


module.exports = app => {
    app.use('/users', users);
    app.use('/projects', projects);
    app.use('/tickets', tickets);
    app.use(notFound);
};
