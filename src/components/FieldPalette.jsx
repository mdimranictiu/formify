import React, { useContext } from 'react';
import { FormBuilderContext } from '../Context/FormBuilderContext';
import { Draggable, Droppable } from '@hello-pangea/dnd';
const FieldPalette = () => {

const {fieldTypes} = useContext(FormBuilderContext)
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Fields</h2>

      {/* Droppable wrapper for draggable fields */}
      <Droppable droppableId="FIELD_PALETTE" isDropDisabled={true}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
            {Object.entries(fieldTypes).map(([key, field], index) => {
              const Icon = field.icon || MdTextFields;

              return (
                <Draggable key={field.type} draggableId={field.type} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center gap-5 bg-gray-100 hover:bg-gray-200 cursor-pointer px-3 py-2 rounded shadow-sm"
                    >
                      <Icon className="text-xl" />
                      <span className="text-xl">{field.label}</span>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default FieldPalette;
