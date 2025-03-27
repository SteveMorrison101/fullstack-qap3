const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

const users = [
  // Example admin user
  {
    username: 'admin',
    email: 'admin@example.com',
    password: '$2b$10$9pMj/oqrVuEvIYHYRoS4We9LeC0BJUZv6AxUGZSVHjVbSyV8S9jEK', // 'adminpass'
    role: 'admin'
  }
];

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

// Home page
app.get('/', (req, res) => {
  res.render('home');
});

// Register page
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

// Login page
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.render('login', { error: 'Invalid credentials.' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.render('login', { error: 'Invalid credentials.' });
  }

  req.session.user = { username: user.username, email: user.email, role: user.role };
  res.redirect('/dashboard');
});

// Dashboard for user or admin
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

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send('Logout error');
    res.redirect('/');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


