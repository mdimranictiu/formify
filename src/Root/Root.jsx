import React, { useContext } from 'react';
import PropertiesPanel from '../components/PropertiesPanel';
import FormCanvas from '../components/FormCanvas';
import { FormBuilderContext } from '../Context/FormBuilderContext';
import FieldPalette from '../components/FieldPalette';
import Navbar from '../Pages/Navbar';
import { DragDropContext } from '@hello-pangea/dnd';

const Root = () => {
  const { fields, setFields, fieldTypes, fieldsets, setfieldsets } = useContext(FormBuilderContext);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
  
    const newField = {
      id: Date.now().toString(),
      ...fieldTypes[draggableId],
    };
  
    // From palette to FORM_CANVAS => create new fieldset
    if (
      source.droppableId === "FIELD_PALETTE" &&
      destination.droppableId === "FORM_CANVAS"
    ) {
      const newFieldset = {
        id: `fieldset-${Date.now()}`, // <--- VERY IMPORTANT: Prefix 'fieldset-'
        name: `Fieldset ${fieldsets.length + 1}`,
        fields: [newField],
      };
      setfieldsets((prev) => [...prev, newFieldset]);
      return;
    }
  
    // From palette to existing fieldset => add field
    if (
      source.droppableId === "FIELD_PALETTE" &&
      destination.droppableId.startsWith("fieldset-")
    ) {
      const updatedFieldsets = fieldsets.map((fs) =>
        fs.id === destination.droppableId
          ? { ...fs, fields: [...fs.fields, newField] }
          : fs
      );
      setfieldsets(updatedFieldsets);
      return;
    }
  };
  
  

  return (
    <div className="min-h-screen mx-10 text-center bg-gray-100">
      <Navbar />
      <div className="p-5 h-screen flex max-md:flex-row">
        <DragDropContext onDragEnd={onDragEnd}>
          <aside className="w-1/5 bg-purple-400 overflow-y-auto p-4">
            <FieldPalette />
          </aside>

          <main className="flex-1 overflow-y-auto p-4">
            <FormCanvas />
          </main>
        </DragDropContext>

        <aside className="w-1/4 bg-white overflow-y-auto p-4">
          <PropertiesPanel />
        </aside>
      </div>
    </div>
  );
};

export default Root;
