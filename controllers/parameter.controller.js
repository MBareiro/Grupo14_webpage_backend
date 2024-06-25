const pool = require('../config/db');

// Obtener todos los parámetros
const getAllParameters = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM Parameters');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener un parámetro por ID
const getParameterById = async (req, res) => {
    const id = req.params.id;
    try {
        const [results] = await pool.query('SELECT * FROM Parameters WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Parameter not found' });
        }
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear un nuevo parámetro
const createParameter = async (req, res) => {
    const { engine, displacement, fuel_system, compression_ratio, power_rpm, top_speed, consumption, transmission, brakes, tires, front_track, rear_track, length, width, height, weight } = req.body;

    try {
        const sql = 'INSERT INTO Parameters (engine, displacement, fuel_system, compression_ratio, power_rpm, top_speed, consumption, transmission, brakes, tires, front_track, rear_track, length, width, height, weight) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [engine, displacement, fuel_system, compression_ratio, power_rpm, top_speed, consumption, transmission, brakes, tires, front_track, rear_track, length, width, height, weight];
        const [result] = await pool.query(sql, values);

        res.json({
            message: 'Parameter created successfully',
            id: result.insertId
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar un parámetro por ID
const updateParameterById = async (req, res) => {
    const id = req.params.id;
    const { engine, displacement, fuel_system, compression_ratio, power_rpm, top_speed, consumption, transmission, brakes, tires, front_track, rear_track, length, width, height, weight } = req.body;

    try {
        const sql = 'UPDATE Parameters SET engine = ?, displacement = ?, fuel_system = ?, compression_ratio = ?, power_rpm = ?, top_speed = ?, consumption = ?, transmission = ?, brakes = ?, tires = ?, front_track = ?, rear_track = ?, length = ?, width = ?, height = ?, weight = ? WHERE id = ?';
        const values = [engine, displacement, fuel_system, compression_ratio, power_rpm, top_speed, consumption, transmission, brakes, tires, front_track, rear_track, length, width, height, weight, id];
        const [result] = await pool.query(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Parameter not found' });
        }
        res.json({ message: 'Parameter updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar parcialmente un parámetro por ID
const patchParameterById = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
    const values = Object.values(updates);

    try {
        const sql = `UPDATE Parameters SET ${fields} WHERE id = ?`;
        const [result] = await pool.query(sql, [...values, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Parameter not found' });
        }
        res.json({ message: 'Parameter partially updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar un parámetro por ID
const deleteParameterById = async (req, res) => {
    const id = req.params.id;

    try {
        const [result] = await pool.query('DELETE FROM Parameters WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Parameter not found' });
        }
        res.json({ message: 'Parameter deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllParameters,
    getParameterById,
    createParameter,
    updateParameterById,
    patchParameterById,
    deleteParameterById
};
