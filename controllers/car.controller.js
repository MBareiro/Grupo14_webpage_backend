const pool = require('../config/db');

// Obtener todos los autos
const getAllCars = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM Cars');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener un auto por ID
const getCarById = async (req, res) => {
    const id = req.params.id;
    try {
        const [results] = await pool.query('SELECT * FROM Cars WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear un nuevo auto
const createCar = async (req, res) => {
    const { model, license_plate, image, history_id, user_id, parameters_id } = req.body;
    console.log("entro");
    try {
        const sql = 'INSERT INTO Cars (model, license_plate, image, history_id, user_id, parameters_id) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [model, license_plate, image, history_id, user_id, parameters_id];
        const [result] = await pool.query(sql, values);

        res.json({
            message: 'Car created successfully',
            id: result.insertId
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar un auto por ID
const updateCarById = async (req, res) => {
    const id = req.params.id;
    const { model, license_plate, image, history_id, user_id, parameters_id } = req.body;

    try {
        const sql = 'UPDATE Cars SET model = ?, license_plate = ?, image = ?, history_id = ?, user_id = ?, parameters_id = ? WHERE id = ?';
        const values = [model, license_plate, image, history_id, user_id, parameters_id, id];
        const [result] = await pool.query(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json({ message: 'Car updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar parcialmente un auto por ID
const patchCarById = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
    const values = Object.values(updates);

    try {
        const sql = `UPDATE Cars SET ${fields} WHERE id = ?`;
        const [result] = await pool.query(sql, [...values, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json({ message: 'Car partially updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar un auto por ID
const deleteCarById = async (req, res) => {
    const id = req.params.id;

    try {
        const [result] = await pool.query('DELETE FROM Cars WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json({ message: 'Car deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCarById,
    patchCarById,
    deleteCarById
};
