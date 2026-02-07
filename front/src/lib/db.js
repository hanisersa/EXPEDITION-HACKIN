import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'users.json');

// Ensure data directory and file exist
function ensureDB() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
  }
}

// Read all users
export function getUsers() {
  ensureDB();
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

// Write all users
function saveUsers(users) {
  ensureDB();
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
}

// Find user by query (e.g. { email: 'x@x.com' })
export function findUser(query) {
  const users = getUsers();
  return users.find((user) => {
    return Object.keys(query).every((key) => user[key] === query[key]);
  }) || null;
}

// Find user by ID
export function findUserById(id) {
  const users = getUsers();
  return users.find((user) => user.id === id) || null;
}

// Find user matching any of the given conditions (like MongoDB $or)
export function findUserByOr(conditions) {
  const users = getUsers();
  return users.find((user) => {
    return conditions.some((cond) =>
      Object.keys(cond).every((key) => cond[key] != null && user[key] === cond[key])
    );
  }) || null;
}

// Create a new user
export function createUser(userData) {
  const users = getUsers();
  const newUser = {
    id: generateId(),
    ...userData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

// Update a user by ID
export function updateUser(id, updates) {
  const users = getUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...updates, updatedAt: new Date().toISOString() };
  saveUsers(users);
  return users[index];
}

// Delete a user by ID
export function deleteUser(id) {
  const users = getUsers();
  const filtered = users.filter((user) => user.id !== id);
  if (filtered.length === users.length) return false;
  saveUsers(filtered);
  return true;
}

// Generate a simple unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
}
