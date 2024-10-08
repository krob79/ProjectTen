import React from "react";

const BasicListElement = (props)=>{

  const {id, value, onChange} = props;

  const handleBlur = (e) =>{
    //console.log(`BasicListElement.js - HANDLE BLUR ${e.target.value}`);
    //setTextContent(e.target.textContent);
    onChange(id, {value: e.target.value});
  }

  const handleFocus = (e) => {
    e.target.select();
  }

  const handleTextChange = (e) => {
    //console.log( `BasicListElement.js - handleTextChange on element ${props.id} - ${e.target.value}`);
    onChange(id, {value: e.target.value});
  }

  return (
    <>
      {
        <>
            {/* <div onInput={handleTextChange} contentEditable="true" onBlur={handleBlur} onFocus={handleFocus} className='input-icon'>{value || ""}</div> */}
            <input autoFocus className="input-icon" placeholder="Add Material Item Here" data-id={id} onInput={handleTextChange} onFocus={handleFocus} onBlur={handleBlur} type="text" value={value || ""}/> 
        </>
      }
    </>
  );


}

export default BasicListElement;