const express = require('express')
const app = express()
const port = 3000
const AuthRoute = require("./Route/AuthRoute")
// const database =require("mongoose")
const databaseConnect = require("./databse/dbconcet");
const ProjectModel = require('./model/ProjectModel');
// const { mongo } = require('mongoose');
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/auth/", AuthRoute);
app.use("api/project",(ProjectModel))

databaseConnect()
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


    