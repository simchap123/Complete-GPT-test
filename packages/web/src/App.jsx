import React, { useState } from 'react';
import FormBuilder from './components/FormBuilder';
import FormPreview from './components/FormPreview';

export default function App() {
  const [fields, setFields] = useState([]);
  const [title, setTitle] = useState('Untitled Form');

  const save = async () => {
    await fetch('/api/forms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, fields })
    });
    alert('Saved');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-purple-700">Form Builder</h1>
      <input
        className="border p-2 mb-4 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <FormBuilder fields={fields} setFields={setFields} />
      <button
        onClick={save}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
      >
        Save
      </button>
      <h2 className="text-xl font-bold mt-8">Preview</h2>
      <FormPreview fields={fields} />
    </div>
  );
}
