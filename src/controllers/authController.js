import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../../db.js";

const sanitizeUser = (user) => {
  const { password_hash, ...safeUser } = user;
  return safeUser;
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email.toLowerCase().trim()]
    );
    
    if (!result.rowCount) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    
    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    res.json({
      user: sanitizeUser(user),
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email.toLowerCase().trim()]
    );
    
    if (existingUser.rowCount > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      "INSERT INTO users (name, email, phone, password_hash, role) VALUES ($1, $2, $3, $4, 'REFEREE') RETURNING *",
      [name.trim(), email.toLowerCase().trim(), phone || null, hashedPassword]
    );
    
    const user = result.rows[0];
    
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    res.status(201).json({
      user: sanitizeUser(user),
      token
    });
  } catch (error) {
    console.error("Register error:", error);
    
    if (error.code === '23505') {
      return res.status(409).json({ error: "Email already registered" });
    }
    
    res.status(500).json({ error: "Registration failed" });
  }
};