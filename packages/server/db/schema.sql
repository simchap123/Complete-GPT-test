-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user'
);

-- Forms table
CREATE TABLE forms (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_by INTEGER REFERENCES users(id)
);

-- Questions table
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  form_id INTEGER REFERENCES forms(id),
  label TEXT NOT NULL,
  type VARCHAR(50) NOT NULL
);

-- Responses table
CREATE TABLE responses (
  id SERIAL PRIMARY KEY,
  form_id INTEGER REFERENCES forms(id),
  user_id INTEGER REFERENCES users(id),
  submitted_at TIMESTAMP DEFAULT NOW()
);

-- Response values
CREATE TABLE response_values (
  id SERIAL PRIMARY KEY,
  response_id INTEGER REFERENCES responses(id),
  question_id INTEGER REFERENCES questions(id),
  value TEXT
);

-- Approval levels for multi-step workflows
CREATE TABLE approval_levels (
  id SERIAL PRIMARY KEY,
  form_id INTEGER REFERENCES forms(id),
  level INTEGER NOT NULL,
  role VARCHAR(50) NOT NULL
);

-- Conditional logic rules
CREATE TABLE visibility_rules (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  depends_on INTEGER REFERENCES questions(id),
  expected_value TEXT
);

-- Audit logs
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  action TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

