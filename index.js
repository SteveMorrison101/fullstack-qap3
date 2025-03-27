const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// 🛠️ In-memory users array with working bcrypt hash for 'Admin@123'
const users = [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: '$2b$10$UG.Lhv6D1ZXj1NvG7KiGxe98dEosAGL3TwdpNo3i1LhIkSnWsJzk2', // Admin@123
    role: 'admin'
  }
];

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

// 🔍 Debug route to check hash manually
app.get('/test-admin', async (req, res) => {
  const inputPassword = 'Admin@123';
  const admin = users.find(u => u.email === 'admin@example.com');

  const match = await bcrypt.compare(inputPassword, admin.password);
  if (match) {
    res.send('✅ Admin password matches! Ready to log in.');
  } else {
    res.send('❌ Password mismatch. Check hash or input.');
  }
});

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/register', (req, res) => {
  res.render('register', { error: null });
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = users.find(user => user.username === username || user.email === email);
  if (existingUser) {
    return res.render('register', { error: 'Username or email already exists.' });
  }

  if (password.length < 8) {
    return res.render('register', { error: 'Password must be at least 8 characters.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, email, password: hashedPassword, role: 'user' });
  req.session.user = { username, email, role: 'user' };
  res.redirect('/dashboard');
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    console.log('❌ Email not found:', email);
    return res.render('login', { error: 'Invalid credentials.' });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    console.log('❌ Password incorrect for:', email);
    return res.render('login', { error: 'Invalid credentials.' });
  }

  console.log('✅ Logged in:', user.username);
  req.session.user = { username: user.username, email: user.email, role: user.role };
  res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const user = req.session.user;
  if (user.role === 'admin') {
    return res.render('admin-dashboard', { user, users });
  } else {
    return res.render('dashboard', { user });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send('Logout error');
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



