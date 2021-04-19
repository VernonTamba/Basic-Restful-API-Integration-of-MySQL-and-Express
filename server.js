const express = require("express");
const app = express();
const _port = 5500;
const path = require("path");
const db = require("./db");

// To use static files!
app.use(express.static(path.join(__dirname, "dist")));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "dist/index.html"));
// });

app.get("/api/users", async (req, res) => {
    try{
        let results = await db.getAll();
        res.json(results);
    }
    catch(err){
        res.send(err);
    }
});

app.post("/api/user", async (req, res) => {
    try{
        let results = await db.insertData();
        res.send(results);
    }
    catch(err){
        res.send(err);
    }
});

app.put("/api/update/:id", async (req, res) => {
    try{
        let results = await db.updateData(req.params.id);
        res.send(results);
    }
    catch(err){
        res.send(err);
    }
});

app.delete("/api/delete/:id", async (req, res) => {
    try{
        let results = await db.deleteData(req.params.id);
        res.send(results);
    }
    catch(err){
        res.send(err);
    }
});

app.listen(_port, (err) => {
    if(err) throw err;
    console.log(`Server running on PORT ${_port}`);
});