import React from 'react';
import { Droppable } from '@hello-pangea/dnd';

const FormCanvas = ({ fields }) => {
    console.log('fromCanvas',fields)
  return (
    <Droppable droppableId="FORM_CANVAS">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="min-h-[300px] border-2 border-dashed border-gray-400 rounded-lg p-4"
        >
          <h2 className="text-lg font-semibold mb-3">Form Preview</h2>
          {fields.map((field, index) => (
            <div key={field.id} className="p-2 mb-2 bg-white shadow rounded text-left">
              <label className="block text-sm font-medium">{field.label}</label>
              {field.type === "text" && <input type="text" className="mt-1 w-full border rounded px-2 py-1" />}
              {field.type === "number" && <input type="number" className="mt-1 w-full border rounded px-2 py-1" />}
              {field.type === "textarea" && <textarea className="mt-1 w-full border rounded px-2 py-1" />}
              {field.type === "select" && (
                <select className="mt-1 w-full border rounded px-2 py-1">
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              )}
              {field.type === "checkbox" && <input type="checkbox" className="mt-1" />}
              {field.type === "radio" && <input type="radio" className="mt-1" />}
              {field.type === "date" && <input type="date" className="mt-1 w-full border rounded px-2 py-1" />}
            </div>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default FormCanvas;
