import app from "./app";
import { PORT } from "./config/constants";

const port = PORT || 3000;

app.listen(port, () => console.log(`conectado na porta ${port}`));
