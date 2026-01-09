const express = require('express')
const app = express()
const port = 3000
const AuthRoute = require("./Route/AuthRoute")
const ProjectRoute= require("./Route/ProjectRoute")
// const database =require("mongoose")
const databaseConnect = require("./databse/dbconcet");
// const { mongo } = require('mongoose');

app.use(express.json());
app.use(express.urlencoded());


databaseConnect()



app.use("/api/auth/", AuthRoute);
app.use("",ProjectRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


    