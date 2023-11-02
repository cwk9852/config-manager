const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Ensure the data directory exists
if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
}

// Utility function to read and write to JSON files
const readData = (filename) => {
    try {
        return fs.readJsonSync(`./data/${filename}.json`);
    } catch (error) {
        return [];
    }
};

const writeData = (filename, data) => {
    fs.writeJsonSync(`./data/${filename}.json`, data);
};

// CRUD for Configuration Items
app.get('/api/configItems', (req, res) => {
    const data = readData('configItems');
    res.send(data);
});

app.post('/api/configItems', (req, res) => {
    const items = readData('configItems');
    const newItem = req.body;

    if (items.find(item => item.name === newItem.name)) {
        return res.status(400).send('Item with the same name already exists.');
    }

    items.push(newItem);
    writeData('configItems', items);

    res.send(newItem);
});

app.put('/api/configItems/:name', (req, res) => {
    const items = readData('configItems');
    const itemName = req.params.name;
    const updatedItem = req.body;

    const index = items.findIndex(item => item.name === itemName);
    if (index === -1) {
        return res.status(404).send('Item not found.');
    }

    items[index] = updatedItem;
    writeData('configItems', items);

    res.send(updatedItem);
});

app.delete('/api/configItems/:name', (req, res) => {
    const items = readData('configItems');
    const itemName = req.params.name;

    const updatedItems = items.filter(item => item.name !== itemName);
    writeData('configItems', updatedItems);

    res.send({ message: 'Item deleted.' });
});

// CRUD for Service Request Templates
// Note: For simplicity, I'm assuming templates have a unique 'title'. Adjust as needed.
app.get('/api/templates', (req, res) => {
    const data = readData('templates');
    res.send(data);
});

app.post('/api/templates', (req, res) => {
    const templates = readData('templates');
    const newTemplate = req.body;

    if (templates.find(template => template.title === newTemplate.title)) {
        return res.status(400).send('Template with the same title already exists.');
    }

    templates.push(newTemplate);
    writeData('templates', templates);

    res.send(newTemplate);
});

app.put('/api/templates/:title', (req, res) => {
    const templates = readData('templates');
    const templateTitle = req.params.title;
    const updatedTemplate = req.body;

    const index = templates.findIndex(template => template.title === templateTitle);
    if (index === -1) {
        return res.status(404).send('Template not found.');
    }

    templates[index] = updatedTemplate;
    writeData('templates', templates);

    res.send(updatedTemplate);
});

app.delete('/api/templates/:title', (req, res) => {
    const templates = readData('templates');
    const templateTitle = req.params.title;

    const updatedTemplates = templates.filter(template => template.title !== templateTitle);
    writeData('templates', updatedTemplates);

    res.send({ message: 'Template deleted.' });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
