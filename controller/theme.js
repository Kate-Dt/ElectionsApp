const db = require("../core/db");
const squel = require('squel');
const createError = require('http-errors');

//get all rows from election table
exports.getAll = (req, res) => {
    let sql = squel.select().from("election").toString();
    db.executeSql(sql, (data, err) => {
        if (err) {
            createError(500);
        }
        res.json(data);
    })
};

//get row from election table by id
exports.get = (req, res, themeId) => {
    let sql = squel.select()
        .from("election")
        .where("id = ?", themeId)
        .toString();
    db.executeSql(sql, (data, err) => {
        if (err) {
            createError(500);
        }
        if (data.length > 0) {
            res.json({
                name: data[0].name,
                values: {
                    yes: data[0].yes,
                    no: data[0].no
                }
            });
        } else {
            res.status(500).end();
        }
    })
};

//add row to election table
exports.add = (req, res, reqBody) => {
    if (!reqBody) {
        createError(500);
    }
    let obj = JSON.parse(reqBody);
    let sql = squel.insert()
        .into("election")
        .set("name", obj.name)
        .set("yes", obj.yes)
        .set("no", obj.no)
        .toString();
    db.executeSql(sql, (data, err) => {
        if (err) {
            createError(500);
        }
        res.json(data);
    })
};

//update row in election table
exports.update = (req, res, reqBody) => {
    if (!reqBody) {
        createError(500);
    }
    let obj = JSON.parse(reqBody);
    let sql = squel.update()
        .table("election")
        .set("name", obj.name)
        .set("yes", obj.yes)
        .set("no", obj.no)
        .toString();
    db.executeSql(sql, (data, err) => {
        if (err) {
            createError(500);
        }
        res.json(data);
    })
};

//delete row in election table
exports.delete = (req, res, themeId) => {
    let sql = squel.delete()
        .from("election")
        .where("id = ?", themeId)
        .toString();
    db.executeSql(sql, (data, err) => {
        if (err) {
            createError(500);
        }
        res.json(data);
    })
};

//add row in election table by setting only name
exports.addByName = (req, res, name) => {
    let sql = squel.insert()
        .into("election")
        .set("name", name)
        .toString();
    db.executeSql(sql, (data, err) => {
        if (err) {
            createError(500);
        }
        res.json({
            error: null,
            themeId: data.insertId
        });
    })
};

//increment by 1 Yes votes of the row
exports.incrementYesVotes = (req, res, themeId)=>{
    let sql = squel.update()
        .table("election")
        .set("yes = yes + 1")
        .where("id = ?", themeId)
        .toString();
    db.executeSql(sql, (data, err) => {
        if (err) {
            createError(500);
        }
        res.json("OK");
    })
};

//increment by 1 No votes of the row
exports.incrementNoVotes = (req, res, themeId)=>{
    let sql = squel.update()
        .table("election")
        .set("no = no + 1")
        .where("id = ?", themeId)
        .toString();
    db.executeSql(sql, (data, err) => {
        if (err) {
            createError(500);
        }
        res.json("OK");
    })
};