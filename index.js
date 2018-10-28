const express = require('express');
const app = express();

const port = 3000;

app.use(express.static('public'));
app.use('/scripts', express.static(__dirname + '/node_modules/paper/dist/'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
