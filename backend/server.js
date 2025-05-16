require('dotenv').config();
const app = require('./src/app');

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server has been started in ${PORT}`)
});
