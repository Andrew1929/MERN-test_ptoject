const express = require('express');
const config = require("config");
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',  // Змініть це на адресу вашого фронтенду
    credentials: true,
}));

app.use(express.json({extended : true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t/', require('./routes/navigate.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*' , (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build' , 'index.html'))
    }) 

}

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'));
        app.listen(PORT, () => console.log(`app has been started on port ${PORT}`));
    } catch (e) {
        console.log(`Server error`, e.message);
        process.exit(1);
    }
}

start();