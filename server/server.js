const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const cors = require('cors');

PORT = 8080;

let db;
(async () => {
    db = await open({
        filename: 'notes.sqlite',
        driver: sqlite3.Database
    });
})();

app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(cors());

app.get('/data', async (req, res) => {
    const note_data = await db.all('SELECT * FROM note');
    const collection_data = await db.all('SELECT * FROM collection');
    for (let collection of collection_data) {
        collection.notes = [];
        for (let note of note_data) {
            if (note.collection_id === collection.id) {
                collection.notes.push(note);
            }
        }
    }
    res.json({collection_data});
});

app.get('/notes', async (req, res) => {
    const notes = await db.all("SELECT * FROM note ORDER BY title");
    res.json({notes});
});

app.post('/addCollection', async (req, res) => {
    const result = await db.run('INSERT INTO collection (collection_name) VALUES (?)', [req.body.collection_name]);
    res.json({lastID: result.lastID});
});

app.post('/addNote', async (req, res) => {
    const result = await db.run('INSERT INTO note (title, text, date, collection_id, priority) VALUES (?, ?, ?, ?, ?)', [req.body.title, req.body.text, req.body.date, req.body.collection_id, req.body.priority]);
    res.json({lastID: result.lastID});
});

app.get('/collection/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    let collection = await db.get('SELECT * FROM collection WHERE id = ?', [id]);
    const notes = await db.all('SELECT * FROM note WHERE collection_id = ?', [id]);
    collection.notes = notes;

    res.json({collection});
});

app.get('/note/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const note = await db.get('SELECT * FROM note WHERE id = ?', [id]);
    res.json({note});
});

app.post('/deleteCollection', async (req, res) => {
    const id = req.body.id;
    await db.run('DELETE FROM collection WHERE id = ?', [id]);
    await db.run('DELETE FROM note WHERE collection_id = ?', [id]);
    res.send();
});

app.post('/deleteNote', async (req, res) => {
    const id = req.body.id;
    await db.run('DELETE FROM note WHERE id = ?', [id]);
    res.send();
});

app.post('/editNote', async (req, res) => {
    await db.run("UPDATE note SET title = ?, text = ?, date = ?, priority = ? WHERE id = ?", [req.body.title, req.body.text, req.body.date, req.body.priority, req.body.id]);
    res.send();
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));