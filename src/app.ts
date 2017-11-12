
import * as Express from "express"
import {Application} from "express"
import * as Bodyparser from "body-parser"

import BasicRouter from "./Routers/BasicRouter"
import HabitRouter from "./Routers/HabitRouter"
import MarkRouter from "./Routers/MarkRouter"

let app: Application = Express();

app.use(Bodyparser.json());

app.use("/", BasicRouter);
app.use("/", HabitRouter);
app.use("/mark", MarkRouter);

app.listen(80);