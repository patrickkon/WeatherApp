const express = require('express')
const router = require("./routes/api/members");
const path = require('path');
const app = express()
const port = process.env.PORT || 3000 

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initial entry:
app.get('/', (req, res) => res.sendFile(path.join(__dirname, "src/mainWindow.html")));


// Member API routes
//app.use('/api/members', require('./routes/api/members'));
app.use("/main", router);


// V2 for set static folder:
app.use("/src/", express.static(path.join(__dirname, "src")));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));