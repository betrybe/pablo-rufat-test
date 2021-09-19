const mongoose = require('mongoose');
const app = require('./app');
const { PORT, MONGO_DB_URL, CONNECTION_ERROR, CONNECTION_MESSAGE } = require('./utils/constants');

const port = PORT || 3000;

console.log(CONNECTION_MESSAGE);

mongoose.connect(MONGO_DB_URL)
    .then(() => {
        app.listen(port, () => console.log(`conectado na porta ${port}`));
    })
    .catch((error) => {
        console.error(CONNECTION_ERROR, error);
        process.exit(1);
    });
