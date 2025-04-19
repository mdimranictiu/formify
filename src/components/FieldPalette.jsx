import React, { useContext } from 'react';
import { FormBuilderContext } from '../Context/FormBuilderContext';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { MdTextFields } from 'react-icons/md';

const FieldPalette = () => {
  const { fieldTypes } = useContext(FormBuilderContext);

  return (
    <div>
      <h2 className="text-lg font-bold mb-4 text-white">Fields</h2>
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
                      className="flex items-center gap-3 bg-white hover:bg-gray-100 cursor-pointer px-3 py-2 rounded shadow-sm"
                    >
                      <Icon className="text-xl" />
                      <span className="text-base">{field.label}</span>
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
