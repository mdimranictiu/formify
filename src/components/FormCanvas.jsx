import React, { useContext } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { FormBuilderContext } from '../Context/FormBuilderContext';

const FormCanvas = () => {
  const { fieldsets,selectedFieldsetId,SetPropertiesPanelShow, setSelectedFieldsetId } = useContext(FormBuilderContext);
console.log(fieldsets)
console.log(selectedFieldsetId)
const handleSelect=(id)=>{
  setSelectedFieldsetId(id)
  SetPropertiesPanelShow(true)
}
  return (
    <div>
      {/* Drop zone to create new Fieldset */}
      <Droppable droppableId="FORM_CANVAS">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="p-4 mb-4 border-dashed border-2 border-gray-300 rounded bg-white"
          >
            <p className="text-gray-400">Drop a field here to start</p>
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Existing Fieldsets */}
      {fieldsets?.map((fieldset) => (
        <Droppable droppableId={fieldset.id}  key={fieldset.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps} onClick={()=>handleSelect(fieldset.id)}
              className=" p-4 mb-4  border rounded shadow"
            >
              <h3 className="text-md font-semibold mb-2">{fieldset.name}</h3>
              {fieldset.fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-2 bg-gray-100 rounded mb-2 shadow-sm"
                    >

<div className="flex justify-center py-2">
  <div className="flex flex-col gap-2 items-start w-full max-w-md p-4 bg-white rounded-xl shadow-md">
    <label className="text-sm font-medium text-gray-700">
      {field?.label}
    </label>

    {field?.type === 'text' || field?.type === 'number' || field?.type === 'date' ? (
      <input
        type={field?.type}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
        placeholder={`Enter ${field?.label?.toLowerCase()}`}
      />
    ) : field?.type === 'textarea' ? (
      <textarea
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
        placeholder={`Enter ${field?.label?.toLowerCase()}`}
        rows={4}
      />
    ) : field?.type === 'select' ? (
      <select
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
      >
  {(field?.options || []).map((option, idx) => (
    <option key={idx} value={option}>
      {option}
    </option>
  ))}
      </select>
    ) : field?.type === 'checkbox' ? (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={field.id}
          className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
        <label htmlFor={field.id} className="text-sm text-gray-700">
          {field?.label}
        </label>
      </div>
    ) : field?.type === 'radio' ? (
      <div className="flex flex-col gap-2">
      {(field?.options || []).map((option, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <input type="radio" name={field.id} value={option} />
          <span className="text-sm text-gray-700">{option}</span>
        </div>
      ))}
    </div>
    ) : (
      <p className="text-sm text-red-500">Unknown field type</p>
    )}
  </div>
</div>


                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </div>
  );
};

export default FormCanvas;
