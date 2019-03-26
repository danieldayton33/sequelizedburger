const db = require("../models");

module.exports = (app)=> {
    app.get("/api/burgers",(req, res) => {
        db.Burger.findAll({}).then(data =>{
        res.json(data);
        }).catch(err => {
            res.json(err);
        });
    });

    app.put("/api/burgers/", (req, res)=>{
        db.Burger.update({
            devoured:true}, 
            {where: {
                id: req.body.id
            }
        }).then(result =>{
                res.json(result);
            }).catch(err => {
                res.json(err);
            });
    });

    app.post("/api/burgers", (req, res) => {
        console.log("REQ", req);
        db.Burger.create({
            burger_name: req.body.burger_name,
        }).then(result => {
            res.json(result);
        }).catch(err=>{
            res.json(err);
        });
    });
    app.delete("/api/burgers", (req, res) => {
        console.log("REQ", req);
        db.Burger.destroy({where:{
            devoured: true
        }}).then(result => {
            console.log("DELETED RESULT", result);
            res.json(result);
        }).catch(err => {
            res.json(err);
        });
    });
}