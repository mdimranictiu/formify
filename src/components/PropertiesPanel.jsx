import React, { useContext, useEffect, useState } from 'react';
import { FormBuilderContext } from '../Context/FormBuilderContext';
import { MdOutlineDelete } from "react-icons/md";

const PropertiesPanel = () => {
  const {deleteFieldFromFieldset,PropertiesPanelShow,handleDeleteFieldset, fieldsets,selectedFieldsetId,setFieldsets, setSelectedFieldsetId } = useContext(FormBuilderContext);
  const selectedFieldset = fieldsets.find(fs => fs.id === selectedFieldsetId);
  const [fields,setFields]=useState([])
  console.log(selectedFieldset)
  console.log(fieldsets?.id)
 useEffect(()=>{
    setFields(selectedFieldset?.fields)
 },[selectedFieldset])
 console.log('fields from panel',fields)
 const handleDeleteField = (fieldsetId, fieldId) => {

  //local state update
  const updateLocalState= fields.filter((f)=>f.id !==fieldId)
  setFields(updateLocalState)
  // const updatedFieldsets = fieldsets.map((fs) => {
  //   if (fs.id === fieldsetId) {
  //     return {
  //       ...fs,
  //       fields: fs.fields.filter((f) => f.id !== fieldId),
  //     };
  //   }
  //   return fs;
  // });

  // setFieldsets(updatedFieldsets);
  deleteFieldFromFieldset(fieldsetId,fieldId)
  };

  
    return (
      <div>
        {!PropertiesPanelShow? null:<div className='text-start'>
            <h2>Properties Panel</h2>
            <div className="bg-red-500 px-5 py-5 my-5 shadow-2xl rounded-lg w-full max-w-sm">
            <h3 >Fieldset Name</h3>
            <span>
                <input className='input outline-none hover:nonew-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200' type="text" value={selectedFieldset?.name} />
            </span>
            <div className='flex flex-col gap-3 py-5'>

              {fields?.map((field,index)=>(
                 <div key={index} className='flex justify-between px-2 items-center'>
                 <h3>{field?.label}</h3>
                 <span onClick={()=>handleDeleteField(selectedFieldsetId,field.id)}><MdOutlineDelete className='text-xl'></MdOutlineDelete></span>
                 </div>
              ))}
            </div>
            <div className='p-2 flex justify-between'>
              <button onClick={()=>handleDeleteFieldset(selectedFieldsetId)} className='btn btn-soft btn-secondary px-10'>Delete</button>
              <button className='btn btn-soft btn-info px-10'>Apply</button>
            </div>
            </div>

        </div> }
      </div>

    );
};

export default PropertiesPanel;