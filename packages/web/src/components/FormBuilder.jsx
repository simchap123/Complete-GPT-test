import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const fieldPalette = [
  { id: 'text', label: 'Text' },
  { id: 'number', label: 'Number' },
  { id: 'date', label: 'Date' },
  { id: 'select', label: 'Select' }
];

export default function FormBuilder({ fields, setFields }) {

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (result.source.droppableId === 'palette') {
      const newField = { ...fieldPalette[result.source.index], key: Date.now() };
      const updated = Array.from(fields);
      updated.splice(result.destination.index, 0, newField);
      setFields(updated);
    } else {
      const updated = Array.from(fields);
      const [moved] = updated.splice(result.source.index, 1);
      updated.splice(result.destination.index, 0, moved);
      setFields(updated);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-5 gap-4">
        <Droppable droppableId="palette" isDropDisabled={true}>
          {(provided) => (
            <div className="col-span-1" ref={provided.innerRef} {...provided.droppableProps}>
              <h2 className="font-bold mb-2">Fields</h2>
              {fieldPalette.map((f, index) => (
                <Draggable key={f.id} draggableId={f.id} index={index}>
                  {(p) => (
                    <div
                      ref={p.innerRef}
                      {...p.draggableProps}
                      {...p.dragHandleProps}
                      className="p-2 mb-2 bg-white rounded shadow cursor-grab"
                    >
                      {f.label}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="form">
          {(provided) => (
            <div className="col-span-4 p-4 bg-gray-50 min-h-[200px]" ref={provided.innerRef} {...provided.droppableProps}>
              <h2 className="font-bold mb-2">Form</h2>
              {fields.map((f, index) => (
                <Draggable key={f.key} draggableId={String(f.key)} index={index}>
                  {(p) => (
                    <div
                      ref={p.innerRef}
                      {...p.draggableProps}
                      {...p.dragHandleProps}
                      className="p-2 mb-2 bg-white rounded shadow"
                    >
                      {f.label}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
