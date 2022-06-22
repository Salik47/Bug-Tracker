const express = require('express')

const connectDb = require('./services/connectDb');
const appMiddleware = require('./middleware/appMiddleware');
const appRoutes = require('./routes/appRoutes');
const appErrors = require('./errors/appErrors');


const app = express()

app.get('/api/', (req, res) => {
	res.send('Happy Hacking!').end()
})

connectDb(app);

app.on('db-connected', () => {
    appMiddleware(app);
    appRoutes(app);
    appErrors(app);
    
    app.listen(1338, console.log('Listening on port: 1338'))
});
