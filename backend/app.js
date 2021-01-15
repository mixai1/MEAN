const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();
const PORT = config.get('port');

app.use(express.json({extended: true}));
app.use('/api', require('../backend/routes/routes'));

async function start() {
    try {
        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: false
        });
        app.listen(5000, () => console.log(`App has been started on port ${PORT}`));
    }
    catch (e) {
        console.log(e.massage);
        process.exit(1);
    }
}

start();

