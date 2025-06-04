import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

const SECRET = process.env.JWT_SECRET || 'changeme';

const users = [
  { id: 1, username: 'admin', password: 'password', role: 'admin' },
  { id: 2, username: 'user', password: 'password', role: 'user' }
];

const forms = [
  {
    id: 1,
    title: 'Example Form',
    questions: [
      { id: 1, label: 'Your name?', type: 'text' },
      { id: 2, label: 'Age?', type: 'number', visibleIf: { questionId: 1, value: 'show' } }
    ]
  }
];

const audit = [];

app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.get('/api/forms', (req, res) => {
  res.json(forms);
});

app.post('/api/audit', (req, res) => {
  const entry = { id: audit.length + 1, ...req.body, created_at: new Date() };
  audit.push(entry);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
