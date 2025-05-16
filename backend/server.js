require('dotenv').config();
const app = require('./src/app');
const express = require('express')
const path = require('path');

const PORT = 3000;

app.use(express.static(path.join(__dirname, '../frontend/dist')))

// For all other routes, serve index.html from the frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server has been started in ${PORT}`)
});
