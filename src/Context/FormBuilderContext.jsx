// src/context/FormBuilderContext.jsx
import React, { createContext, useState } from "react";

import { MdTextFields } from "react-icons/md";
import { LuRectangleHorizontal } from "react-icons/lu";
import { IoIosCheckboxOutline, IoIosRadioButtonOff } from "react-icons/io";
import { BsCalendarDate, BsTextareaResize } from "react-icons/bs";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";


// Create the context
export const FormBuilderContext = createContext();

// Provider component
export const FormBuilderProvider = ({ children }) => {
  const [fields, setFields] = useState([]);
  const [selectedFieldsetId, setSelectedFieldsetId] = useState(null);
    const [fieldsets,setfieldsets]=useState([])
    const [PropertiesPanelShow,SetPropertiesPanelShow]=useState(false)
  const fieldTypes = {
   text: { type: "text", label: "Text Input", icon: MdTextFields },
   number: { type: "number", label: "Number Input", icon: LuRectangleHorizontal },
   textarea: { type: "textarea", label: "Textarea", icon: BsTextareaResize },
    select: { type: "select", label: "Select Dropdown", icon: MdOutlineArrowDropDownCircle },
   checkbox: { type: "checkbox", label: "Checkbox", icon: IoIosCheckboxOutline },
    radio: { type: "radio", label: "Radio Button", icon: IoIosRadioButtonOff },
   date: { type: "date", label: "Date Picker", icon: BsCalendarDate },
  };
  const deleteFieldFromFieldset = (fieldsetId, fieldId) => {
    const updatedFieldsets = fieldsets.map((fieldset) => {
      if (fieldset.id === fieldsetId) {
        return {
          ...fieldset,
          fields: fieldset.fields.filter((field) => field.id !== fieldId),
        };
      }
      return fieldset;
    });

    // Update the fieldsets state with the modified fieldset
    setfieldsets(updatedFieldsets);
  };


  console.log('from context',fieldsets)
  const handleDeleteFieldset=(id)=>{
    const remainFieldSets= fieldsets.filter((f)=>f.id !==id)
    setfieldsets(remainFieldSets)
    SetPropertiesPanelShow(false)
    }
  return (
    <FormBuilderContext.Provider
      value={{
        fields,handleDeleteFieldset,
        setFields,deleteFieldFromFieldset,SetPropertiesPanelShow,PropertiesPanelShow,
       fieldTypes,fieldsets,setfieldsets,selectedFieldsetId, setSelectedFieldsetId
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
};
