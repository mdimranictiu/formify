import React, { useContext, useState } from 'react';
import PropertiesPanel from '../components/PropertiesPanel';
import FormCanvas from '../components/FormCanvas';
import { FormBuilderContext } from '../Context/FormBuilderContext';
import FieldPalette from '../components/FieldPalette';
import Navbar from '../Pages/Navbar';
import { DragDropContext } from '@hello-pangea/dnd';

const Root = () => {
// Center canvas fields
const {fields, setFields,fieldTypes} = useContext(FormBuilderContext)
  //Dummy field data (copy from FieldPalette)
  // const fieldTypes = {
  //   text: { type: "text", label: "Text Input" },
  //   number: { type: "number", label: "Number Input" },
  //   textarea: { type: "textarea", label: "Textarea" },
  //   select: { type: "select", label: "Select Dropdown" },
  //   checkbox: { type: "checkbox", label: "Checkbox" },
  //   radio: { type: "radio", label: "Radio Button" },
  //   date: { type: "date", label: "Date Picker" },
  // };
// onDragEnd Logic here
   const onDragEnd=(result)=>{
    const {destination,source,draggableId}=result;

    // first check if not drop then return 
    if(!destination) return;

    if(source.droppableId === "FIELD_PALETTE" && destination.droppableId==='FORM_CANVAS'){

     const newField= {
      id: Date.now().toString(),
      ...fieldTypes[draggableId],
     }
     console.log('field',newField)
     setFields((pre)=>[...pre,newField])
     console.log("draggableId:", draggableId);
console.log("fieldTypes[draggableId]:", fieldTypes[draggableId]);
    }



    
   }
  
  return (
    <div className="min-h-screen mx-10 text-center bg-gray-100">
        <Navbar />
        <div className="p-5 h-screen flex max-md:flex-row">
          <DragDropContext onDragEnd={onDragEnd}>
            {/* Left Sidebar */}
            <aside className="w-1/5 bg-purple-400 overflow-y-auto p-4">
              <FieldPalette />
            </aside>

            {/* Center Canvas */}
            <main className="flex-1 overflow-y-auto p-4">
              <FormCanvas fields={fields} />
            </main>
          </DragDropContext>

          {/* Right Sidebar */}
          <aside className="w-1/4 bg-white overflow-y-auto p-4">
            <PropertiesPanel />
          </aside>
        </div>

    </div>
  );
};

export default Root;
