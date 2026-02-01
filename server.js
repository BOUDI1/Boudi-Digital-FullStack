const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database'); // Importation de la base SQLite

const app = express();
const PORT = process.env.PORT || 3000; // Adaptable pour Alwaysdata

app.use(cors());
app.use(express.json()); // Middleware moderne remplaçant body-parser
app.use(express.static(path.join(__dirname, '.')));

// Route API sécurisée pour le formulaire
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Veuillez remplir tous les champs.' });
    }

    const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    db.run(sql, [name, email, message], function(err) {
        if (err) return res.status(500).json({ error: 'Erreur base de données.' });
        res.status(201).json({ success: true, id: this.lastID });
    });
});

app.listen(PORT, () => console.log(`Serveur prêt sur le port ${PORT}`));