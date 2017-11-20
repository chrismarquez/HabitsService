
import * as Express from "express"
import {Application} from "express"
import * as Bodyparser from "body-parser"

import BasicRouter from "./Routers/BasicRouter"
import HabitRouter from "./Routers/HabitRouter"
import MarkRouter from "./Routers/MarkRouter"

if (process.argv.length != 3) {
    throw new Error("Init program as node app.js storageMode");
}

let app: Application = Express();

app.use(Bodyparser.json());

app.use((req, res, next) => { // CORS Handling
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.options("/", (req, res) => { // Preflight request
    res.statusCode = 204;
    res.end();
});

app.use("/", BasicRouter);
app.use("/", HabitRouter);
app.use("/mark", MarkRouter);

app.listen(80);