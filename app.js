const express = require("express");
let app = express();
app.use(express.json());

app.listen(process.env.PORT || 5000, () => console.log("server running ...."));

app.get("/", (req, res) => res.send("Node JS"));

let users = [
    {id: 1, name:"kalab", password: "334"},
    {id: 2, name:"niko", password: "334"},
    {id: 3, name:"coca", password: "334"},
    {id: 4, name:"lala", password: "334"},
];

app.get("/api/users", (req, res) => res.send(users));

app.get("/api/users/:id", (req, res) => {
    let id = req.params.id;
    console.log(id);
    let index = users.findIndex(user => user.id === parseInt(id));
    // let index = -1;
    // for (let i in users){
    //     let user = users[i]
    //     if (user.id === id){
    //         index = i;
    //     }
    // }
    if (index >= 0){
        let user = users[index];
        res.send([user]);
    } else {
        res.status(404);
        res.send({error: "Id user not found"})
    }
});

app.post("/api/users", (req, res) => {
    if (!req.body.name && !req.body.password){
        return res.send({error : "Not enough data"});
    };
    console.log(req.body);
    let user = {
        id : users.length+1,
        name : req.body.name,
        password : req.body.password
    }
    users.push(user);
    res.send(users);
})

app.put("/api/users/:id", (req, res) => {
    let id = req.params.id;
    let index = users.findIndex(user => user.id === parseInt(id));
    console.log(index);
    if (!req.body.name && !req.body.password){
        return res.send({error : "Not enough data"});
    };
    if (index >= 0){
        let user = users[index];
        user.name = req.body.name;
        user.password = req.body.password;
        res.send(users);
    } else {
        res.status(404);
        res.send({error: "Id user not found"})
    }
})

app.delete("/api/users/:id", (req, res) => {
    let id = req.params.id;
    let index = users.findIndex(user => user.id === parseInt(id));

    if (index >= 0){
        users.splice(index, 1);
        res.send(users);
    } else {
        res.status(404);
        res.send({error: "Id user not found"})
    }
})