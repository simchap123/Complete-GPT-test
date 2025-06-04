import React, { useState } from 'react';
import FormBuilder from './components/FormBuilder';
import FormPreview from './components/FormPreview';

export default function App() {
  const [fields, setFields] = useState([]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Form Builder</h1>
      <FormBuilder fields={fields} setFields={setFields} />
      <h2 className="text-xl font-bold mt-8">Preview</h2>
      <FormPreview fields={fields} />
    </div>
  );
}
