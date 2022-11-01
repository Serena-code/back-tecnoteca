import express from "express";
const app = express()

import {pool} from "./db/connection.js"
import routerCasco from "./routes/casco.routes.js";
import routerComputadoras from "./routes/computadora.routes.js"
import routerSalas from "./routes/sala.routes.js";
app.set('port', process.env.PORT || 3000);

app.use(express.json());

// rutas

app.use('/api/computadoras', routerComputadoras)
app.use('/api/cascos', routerCasco)
app.use('/api/salas', routerSalas)

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
