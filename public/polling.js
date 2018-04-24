// Add logic to this script to poll server every second for updated pixels.

let timeStamp = Date.now();

function fetchHistory() {
    fetch("/updates", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                clientUpdates: clientUpdates,
                after: timeStamp,
                history: "yes"
            }),
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res.updates);
            for (let i in res.updates) {
                bitmap.setColor(res.updates[i][0], res.updates[i][1], res.updates[i][2]);
                timeStamp = res.updates[i][3];
            }
            clientUpdates = [];
            // timeStamp = Date.now();
        })
}

function fetchUpdates() {
    fetch("/updates", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                clientUpdates: clientUpdates,
                after: timeStamp,
                history: "no"
            }),
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res.updates);
            for (let i in res.updates) {
                bitmap.setColor(res.updates[i][0], res.updates[i][1], res.updates[i][2]);
                timeStamp = res.updates[i][3];
            }
            clientUpdates = [];
            // timeStamp = Date.now();
            setTimeout(fetchUpdates, 1000);
        })
}

fetchUpdates();
fetchHistory();

// this.setColor(row, col, paint_color);