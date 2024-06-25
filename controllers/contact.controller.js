const pool = require('../config/db');

// Obtener todos los contactos
const getAllContacts = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM Contacts');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener un contacto por ID
const getContactById = async (req, res) => {
    const id = req.params.id;
    try {
        const [results] = await pool.query('SELECT * FROM Contacts WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear un nuevo contacto
const createContact = async (req, res) => {
    const { name, email, message } = req.body;
    console.log("asdasdasd");
    try {
        const sql = 'INSERT INTO Contacts (name, email, message) VALUES (?, ?, ?)';
        const values = [name, email, message];
        const [result] = await pool.query(sql, values);

        res.json({
            message: 'Contact created successfully',
            id: result.insertId
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar un contacto por ID
const updateContactById = async (req, res) => {
    const id = req.params.id;
    const { name, email, message } = req.body;

    try {
        const sql = 'UPDATE Contacts SET name = ?, email = ?, message = ? WHERE id = ?';
        const values = [name, email, message, id];
        const [result] = await pool.query(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: 'Contact updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar parcialmente un contacto por ID
const patchContactById = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
    const values = Object.values(updates);

    try {
        const sql = `UPDATE Contacts SET ${fields} WHERE id = ?`;
        const [result] = await pool.query(sql, [...values, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: 'Contact partially updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar un contacto por ID
const deleteContactById = async (req, res) => {
    const id = req.params.id;

    try {
        const [result] = await pool.query('DELETE FROM Contacts WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: 'Contact deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContactById,
    patchContactById,
    deleteContactById
};
