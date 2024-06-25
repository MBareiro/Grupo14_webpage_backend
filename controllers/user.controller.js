const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const getUsers = async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM Users");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query("SELECT * FROM Users WHERE id = ?", [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query("DELETE FROM Users WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  const { name, email, city, country, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql =
    "INSERT INTO Users (name, email, city, country, password) VALUES (?, ?, ?, ?, ?)";
  const values = [name, email, city, country, hashedPassword];

  try {
    const [result] = await pool.query(sql, values);
    res.json({
      message: "User created successfully",
      id: result.insertId,
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(409).json({ error: "Duplicate entry for email" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

const updateUserById = async (req, res) => {
  const id = req.params.id;
  const { name, email, city, country, phone, active, role } = req.body;
  let sql = "UPDATE Users SET name = ?, email = ?, city = ?, country = ?";
  const values = [name, email, city, country];

  if (phone) {
    sql += ", phone = ?";
    values.push(phone);
  }

  if (active !== undefined) {
    sql += ", active = ?";
    values.push(active);
  }

  if (role) {
    sql += ", role = ?";
    values.push(role);
  }

  sql += " WHERE id = ?";
  values.push(id);

  try {
    const [result] = await pool.query(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [userRows] = await pool.query("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);
    const user = userRows[0]; // Obtener el primer resultado del array
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    res.json({
      success: "Login successful",
      token: createToken(user),
    });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createToken = (user) => {
  const payload = {
    user_id: user.id,
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
};

module.exports = {
  getUsers,
  getUserById,
  deleteUserById,
  createUser,
  updateUserById,
  login,
};
