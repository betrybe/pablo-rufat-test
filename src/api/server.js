const app = require("./app");
const { PORT } = require("./config/constants");

const port = PORT || 3000;

app.listen(port, () => console.log(`conectado na porta ${port}`));
