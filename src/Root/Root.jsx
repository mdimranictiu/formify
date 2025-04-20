import React, { useContext, useState } from "react";
import PropertiesPanel from "../components/PropertiesPanel";
import FormCanvas from "../components/FormCanvas";
import { FormBuilderContext } from "../Context/FormBuilderContext";
import FieldPalette from "../components/FieldPalette";
import Navbar from "../Pages/Navbar";
import { DragDropContext } from "@hello-pangea/dnd";
import axios from "axios";

const Root = () => {
  const { fieldTypes, handleDiscard, fieldsets, setfieldsets } =
    useContext(FormBuilderContext);
  const [returnData, setReturnData] = useState([]);

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
        id: `fieldset-${Date.now()}`,
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

  const handleSaveForm = () => {
    axios
      .post(
        "http://team.dev.helpabode.com:54292/api/wempro/react-dev/coding-test/imransheikh1246@gmail.com",
        fieldsets
      )
      .then((res) => {
        if (res.data) {
          setReturnData(JSON.parse(res?.data?.your_respons));
          document.getElementById("my_modal_4")?.showModal();
        }
      })
      .catch((error) => {
        console.log("Error in sending data", error.message);
      });
  };

  return (
    <div className="min-h-screen mx-10 max-sm:mx-0 text-center ">
      <Navbar />
      <div className="p-5 h-screen max-md:gap-5 flex max-md:flex-col">
        <DragDropContext onDragEnd={onDragEnd}>
          <aside className="w-1/5 max-md:w-full  bg-purple-400 rounded-sm  p-4">
            <FieldPalette />
          </aside>

          <main className="lg:overflow-y-auto max-md:w-full flex-1 px-4">
            <FormCanvas />
          </main>
        </DragDropContext>

        <aside
          className={`w-1/4 max-md:w-full lg:overflow-y-auto ${
            fieldsets.length > 0 ? "" : "hidden"
          }  bg-white  p-4`}
        >
          <PropertiesPanel />
          {fieldsets.length > 0 && (
            <div className="relative">
              <div className="absolute right-6">
                <div className="p-2 gap-5 flex justify-between">
                  <button
                    onClick={handleDiscard}
                    className="btn hover:text-red-500 transition duration-500 hover:bg-white text-white bg-red-500 px-10"
                  >
                    Discard
                  </button>
                  <button
                    onClick={handleSaveForm}
                    className="btn hover:text-[#00BFAA] hover:bg-white transition duration-500 bg-[#00BFAA] text-white px-10"
                  >
                    Save Form
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Modal Section */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 text-start max-w-2xl">
          {returnData?.map((fieldset) => (
            <fieldset
              key={fieldset.id}
              className="p-5 rounded-sm border-1 border-gray-500  py-2"
            >
              <legend className="font-bold px-1">{fieldset.name}</legend>
              {fieldset.fields.map((field) => (
                <div key={field.id} className="mb-4">
                  <label className="font-semibold">{field.label}</label>
                  {field.type === "text" ||
                  field.type === "number" ||
                  field.type === "date" ? (
                    <input
                      type={field.type}
                      className="border p-2 border-gray-400 rounded-sm w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                    />
                  ) : field.type === "textarea" ? (
                    <textarea className="border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 rounded-sm p-2 border-gray-500 w-full" />
                  ) : field.type === "select" ? (
                    <select className="border rounded-sm p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200">
                      {field.options?.map((opt, i) => (
                        <option key={i}>{opt}</option>
                      ))}
                    </select>
                  ) : field.type === "radio" ? (
                    field.options?.map((opt, i) => (
                      <label key={i} className="mr-4">
                        <input type="radio" name={field.id} value={opt} />
                        {opt}
                      </label>
                    ))
                  ) : field.type === "checkbox" ? (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name={field.id}
                        className="w-4 h-4"
                      />
                      {field.label}
                    </label>
                  ) : null}
                </div>
              ))}
            </fieldset>
          ))}

          <div className="text-center mt-4">
            <form method="dialog">
              <button className="btn btn-error text-white">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Root;
