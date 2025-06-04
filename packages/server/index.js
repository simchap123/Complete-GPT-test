import express from 'express';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(express.json());

const SECRET = process.env.JWT_SECRET || 'changeme';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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

app.post('/api/forms', async (req, res) => {
  const { title = 'Untitled Form', fields = [] } = req.body;
  try {
    const { data, error } = await supabase
      .from('forms')
      .insert({ title })
      .select();
    if (error) throw error;
    const formId = data[0].id;
    if (fields.length) {
      const qRows = fields.map((f) => ({
        form_id: formId,
        label: f.label,
        type: f.id
      }));
      await supabase.from('questions').insert(qRows);
    }
    res.json({ success: true, id: formId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save form' });
  }
});

app.post('/api/audit', (req, res) => {
  const entry = { id: audit.length + 1, ...req.body, created_at: new Date() };
  audit.push(entry);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
