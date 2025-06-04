import React, { useState } from 'react';

export default function FormPreview({ fields }) {
  const [values, setValues] = useState({});

  const handleChange = (id, value) => setValues({ ...values, [id]: value });

  const visible = (field) => {
    if (!field.visibleIf) return true;
    return values[field.visibleIf.questionId] === field.visibleIf.value;
  };

  return (
    <div className="mt-4 space-y-3">
      {fields.filter(visible).map((field) => (
        <div key={field.key} className="flex flex-col">
          <label className="font-medium mb-1">{field.label}</label>
          <input
            className="border p-2"
            type={field.id}
            onChange={(e) => handleChange(field.key, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
