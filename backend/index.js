import dotenv, { configDotenv } from 'dotenv'
import connectDb from './src/db/index.js'
import {app} from './app.js'

dotenv.config({
    path : './.env'
})

const PORT = process.env.PORT || 3000

connectDb().then(() => {
    app.listen(PORT,()=>{
console.log(`server is runnign at the ${PORT}`);

    })
}).catch((err) => {
    console.error(  "Eroor connection db" )
});

