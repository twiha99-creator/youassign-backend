export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return !phone || phoneRegex.test(phone);
};

export const validatePassword = (password) => {
  return password && password.length >= 8;
};

export const validateRegisterInput = (req, res, next) => {
  const { name, email, password, phone } = req.body;
  
  if (!name || name.trim().length < 2) {
    return res.status(400).json({ error: "Name must be at least 2 characters" });
  }
  
  if (!email || !validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }
  
  if (!validatePassword(password)) {
    return res.status(400).json({ error: "Password must be at least 8 characters" });
  }
  
  if (phone && !validatePhone(phone)) {
    return res.status(400).json({ error: "Invalid phone number" });
  }
  
  next();
};

export const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  
  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }
  
  next();
};