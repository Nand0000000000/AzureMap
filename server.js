const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

let coordinates = { latitude: 0, longitude: 0 };

app.post('/receive-coordinates', (req, res) => {
    coordinates = req.body;
    console.log('Coordenadas recebidas:', coordinates.latitude, coordinates.longitude);
    res.json(coordinates);
});

app.get('/get-coordinates', (req, res) => {
    res.json(coordinates);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
