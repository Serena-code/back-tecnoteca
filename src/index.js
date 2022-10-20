import express from "express";
const app = express()

import {pool} from "./db/connection.js"
import routerComputadoras from "./routes/computadora.routes.js"
app.set('port', process.env.PORT || 3000);

app.use(express.json());

// rutas

app.use('/api/computadoras', routerComputadoras)


// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
