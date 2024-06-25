const pool = require('../config/db');

// Obtener todas las historias
const getAllHistories = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM History');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener una historia por ID
const getHistoryById = async (req, res) => {
    const id = req.params.id;
    try {
        const [results] = await pool.query('SELECT * FROM History WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'History not found' });
        }
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear una nueva historia
const createHistory = async (req, res) => {
    const { description, origin, design, engine } = req.body;

    try {
        const sql = 'INSERT INTO History (description, origin, design, engine) VALUES (?, ?, ?, ?)';
        const values = [description, origin, design, engine];
        const [result] = await pool.query(sql, values);

        res.json({
            message: 'History created successfully',
            id: result.insertId
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar una historia por ID
const updateHistoryById = async (req, res) => {
    const id = req.params.id;
    const { description, origin, design, engine } = req.body;

    try {
        const sql = 'UPDATE History SET description = ?, origin = ?, design = ?, engine = ? WHERE id = ?';
        const values = [description, origin, design, engine, id];
        const [result] = await pool.query(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'History not found' });
        }
        res.json({ message: 'History updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar parcialmente una historia por ID
const patchHistoryById = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
    const values = Object.values(updates);

    try {
        const sql = `UPDATE History SET ${fields} WHERE id = ?`;
        const [result] = await pool.query(sql, [...values, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'History not found' });
        }
        res.json({ message: 'History partially updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar una historia por ID
const deleteHistoryById = async (req, res) => {
    const id = req.params.id;

    try {
        const [result] = await pool.query('DELETE FROM History WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'History not found' });
        }
        res.json({ message: 'History deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllHistories,
    getHistoryById,
    createHistory,
    updateHistoryById,
    patchHistoryById,
    deleteHistoryById
};
