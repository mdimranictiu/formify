import React, { useContext, useEffect, useState } from "react";
import { FormBuilderContext } from "../Context/FormBuilderContext";
import { MdOutlineDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const PropertiesPanel = () => {
  const {
    handleApplyFieldsetName,
    deleteFieldFromFieldset,
    handleApplyEdit,
    PropertiesPanelShow,
    handleDeleteFieldset,
    fieldsets,
    selectedFieldsetId,
    setFieldsets,
    setSelectedFieldsetId,
  } = useContext(FormBuilderContext);
  const selectedFieldset = fieldsets.find((fs) => fs.id === selectedFieldsetId);
  const [fields, setFields] = useState([]);
  const [edit, setEdit] = useState();
  const [fieldsetName, setFieldsetName] = useState("");

  useEffect(() => {
    setFields(selectedFieldset?.fields);
  }, [selectedFieldset]);
  // to delete a filed a field
  const handleDeleteField = (fieldsetId, fieldId) => {
    //local state update
    const updateLocalState = fields.filter((f) => f.id !== fieldId);
    setFields(updateLocalState);
    // call the function to delete in context
    deleteFieldFromFieldset(fieldsetId, fieldId);
  };
  // handle edit feild
  const handleEditField = (fieldsetId, fieldId) => {
    document.getElementById("my_modal_5").showModal();
    const findEditField = fields.find((f) => f.id === fieldId);
    setEdit(findEditField);
    //
  };
  const handleApplyEditSection = (edit) => {
    handleApplyEdit(edit);
    document.getElementById("my_modal_5").close();
  };

  useEffect(() => {
    setFields(selectedFieldset?.fields || []);
    setFieldsetName(selectedFieldset?.name || "");
  }, [selectedFieldset]);

  const handleApply = (fieldsetName) => {
    handleApplyFieldsetName(fieldsetName);
  };

  return (
    <div>
      {!PropertiesPanelShow ? null : (
        <div className="text-start">
          <h2 className="text-center font-bold">Properties Panel</h2>
          <div className=" px-5 py-5 my-5 shadow-2xl rounded-lg w-full max-w-sm">
            <h3>Fieldset Name</h3>
            <span>
              <input
                className="input outline-none w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                type="text"
                value={fieldsetName}
                onChange={(e) => setFieldsetName(e.target.value)}
              />
            </span>
            <div className="flex flex-col gap-3 py-5">
              {fields?.map((field, index) => (
                <div
                  key={index}
                  className="flex justify-between px-2 items-center"
                >
                  <h3>{field?.label}</h3>
                  <div className="flex flex-row gap-5 items-center">
                    <span>
                      <FaEdit
                        onClick={() =>
                          handleEditField(selectedFieldsetId, field.id)
                        }
                        className="text-xl"
                      ></FaEdit>
                    </span>
                    <span
                      onClick={() =>
                        handleDeleteField(selectedFieldsetId, field.id)
                      }
                    >
                      <MdOutlineDelete className="text-xl"></MdOutlineDelete>
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 flex justify-between">
              <button
                onClick={() => handleDeleteFieldset(selectedFieldsetId)}
                className="btn btn-soft btn-secondary px-10"
              >
                Delete
              </button>
              <button
                onClick={() => handleApply(fieldsetName)}
                className="btn btn-soft btn-info px-10"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_5" className="modal modal-center">
        <div className="modal-box w-11/12 max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Edit Field: {edit?.label}</h3>

          {/* Label input */}
          <div className="mb-4">
            <label className="block font-medium">Label Name:</label>
            <input
              type="text"
              value={edit?.label}
              onChange={(e) => setEdit({ ...edit, label: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          {/* Only show for radio or select */}
          {(edit?.type === "radio" || edit?.type === "select") && (
            <div className="mb-4">
              <label className="block font-medium mb-1">Options:</label>

              {/* map through existing options */}
              {(edit?.options || []).map((option, index) => (
                <div key={index} className="flex gap-2 mb-2 items-center">
                  <input
                    type="text"
                    placeholder="Add Option"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...edit.options];
                      newOptions[index] = e.target.value;
                      setEdit({ ...edit, options: newOptions });
                    }}
                    className="flex-grow px-3 py-1 border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const filteredOptions = edit.options.filter(
                        (_, i) => i !== index
                      );
                      setEdit({ ...edit, options: filteredOptions });
                    }}
                    className="text-xl"
                  >
                    <MdOutlineDelete></MdOutlineDelete>
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  setEdit({ ...edit, options: [...(edit.options || []), ``] })
                }
                className="btn btn-sm btn-outline btn-primary mt-2"
              >
                Add Option
              </button>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
            <button
              className="btn btn-success"
              onClick={() => handleApplyEditSection(edit)}
            >
              Apply
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PropertiesPanel;
