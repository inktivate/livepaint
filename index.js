const express = require("express")
const port = 3000
const app = express()

app.use(express.static('public'))
app.use(express.json())

app.get('/hi', (req, res) => {
    res.send("hello");
})

let updateHistory = [];
let newUpdates = [];

app.post('/updates', (req, res) => {
    // console.log("POST received: " + JSON.stringify(req.body));
    // updates.push(req.body.clientUpdates);
    for (let i in req.body.clientUpdates) {
        updateHistory.push(req.body.clientUpdates[i]);
    }

    newUpdates = [];
    for (let i in updateHistory) {
        if (updateHistory[i][3] > req.body.after) {
            newUpdates.push(updateHistory[i]);
        }
    }

    // console.log(updateHistory);
    // console.log(newUpdates);

    if (req.body.history === "no") {
        res.send({
            updates: newUpdates,
        })
    } else {
        res.send({
            updates: updateHistory
        })
    }

    // res.send({updates: updateHistory});
})

app.listen(port)