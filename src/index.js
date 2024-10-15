import connectdb from "./db/index.js"
import dotenv from "dotenv"
import {app} from './app.js `'

dotenv.config({
    path: './env'
})

connectdb()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})