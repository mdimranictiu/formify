import React, { createContext, useState } from "react";
import { MdTextFields } from "react-icons/md";
import { LuRectangleHorizontal } from "react-icons/lu";
import { IoIosCheckboxOutline, IoIosRadioButtonOff } from "react-icons/io";
import { BsCalendarDate, BsTextareaResize } from "react-icons/bs";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

// Create the context
export const FormBuilderContext = createContext();

export const FormBuilderProvider = ({ children }) => {
  const [fields, setFields] = useState([]);
  const [selectedFieldsetId, setSelectedFieldsetId] = useState(null);
  const [fieldsets, setfieldsets] = useState([]);
  const [PropertiesPanelShow, SetPropertiesPanelShow] = useState(false);

  const fieldTypes = {
    text: { type: "text", label: "Text Input", icon: MdTextFields },
    number: {
      type: "number",
      label: "Number Input",
      icon: LuRectangleHorizontal,
    },
    textarea: { type: "textarea", label: "Textarea", icon: BsTextareaResize },
    select: {
      type: "select",
      label: "Select Dropdown",
      icon: MdOutlineArrowDropDownCircle,
    },
    checkbox: {
      type: "checkbox",
      label: "Checkbox",
      icon: IoIosCheckboxOutline,
    },
    radio: { type: "radio", label: "Radio Button", icon: IoIosRadioButtonOff },
    date: { type: "date", label: "Date Picker", icon: BsCalendarDate },
  };
  // to delete a specif field under a fieldset
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
// when fileds are radio or select then create logic for adding options
  const addOptionToField = (fieldsetId, fieldId, newOption) => {
    const updatedFieldsets = fieldsets.map((fieldset) => {
      if (fieldset.id === fieldsetId) {
        const updatedFields = fieldset.fields.map((field) => {
          if (
            field.id === fieldId &&
            (field.type === "radio" || field.type === "select")
          ) {
            return {
              ...field,
              options: [...(field.options || []), newOption],
            };
          }
          return field;
        });

        return {
          ...fieldset,
          fields: updatedFields,
        };
      }
      return fieldset;
    });

    setfieldsets(updatedFieldsets);
  };
 // to delete a fieldset
  const handleDeleteFieldset = (id) => {
    const remainFieldSets = fieldsets.filter((f) => f.id !== id);
    setfieldsets(remainFieldSets);
    SetPropertiesPanelShow(false);
  };
  // to apply edit in options fields
  const handleApplyEdit = (updatedField) => {
    const cleanedOptions =
      updatedField.options?.filter((opt) => opt.trim() !== "") || [];

    const updatedFieldWithCleanOptions = {
      ...updatedField,
      options: cleanedOptions,
    };

    const updatedFieldsets = fieldsets.map((fs) => {
      if (fs.id === selectedFieldsetId) {
        return {
          ...fs,
          fields: fs.fields.map((field) =>
            field.id === updatedField.id ? updatedFieldWithCleanOptions : field
          ),
        };
      }
      return fs;
    });

    setfieldsets(updatedFieldsets);
  };
  // to handle fieldset name
  const handleApplyFieldsetName = (fieldsetName) => {
    const updatedFieldsets = fieldsets.map((fs) =>
      fs.id === selectedFieldsetId ? { ...fs, name: fieldsetName } : fs
    );
    setfieldsets(updatedFieldsets);
  };
  // to discard all fieldsets
  const handleDiscard = () => {
    setfieldsets([]);
    SetPropertiesPanelShow(false);
  };
  return (
    <FormBuilderContext.Provider
      value={{
        fields,
        handleDeleteFieldset,
        handleApplyEdit,
        handleDiscard,
        setFields,
        deleteFieldFromFieldset,
        SetPropertiesPanelShow,
        PropertiesPanelShow,
        fieldTypes,
        fieldsets,
        setfieldsets,
        selectedFieldsetId,
        setSelectedFieldsetId,
        addOptionToField,
        handleApplyFieldsetName,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
};
