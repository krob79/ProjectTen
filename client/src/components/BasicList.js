import React, { useState, useEffect } from "react";

import BasicListElement from "./BasicListElement";
import IconAdd from "./IconAdd";
import IconRemove from "./IconRemove";


const BasicList = ({list, onUpdate}) => {

    const listContents = (list ? list : [{id: 12345, value:''}]);

    const generateId = () => {
        let num = Math.floor(100000 + Math.random() * 900000);
        //console.log("GENERATED ID: " +num);
        return num;
    }

    const generateList = (list) => {
        console.log("---BasicList.js - GENERATING NEW ITEM LIST");
        if(list.length < 1){
            console.log("----LIST IS EMPTY!!");
        }
        let newList = list.map( (item,i) => {
            let newItem = {};
            if(!item.id){
                newItem.id = generateId();
            }else{
                newItem.id = item.id;
            }
            
            if(!item.value){
                if (typeof item === 'string' || item instanceof String){
                    newItem.value = item;
                }else{
                    newItem.value = "";
                }
            }else{
                newItem.value = item.value;
            }

            return newItem;

        })
        
        console.log(newList);
        return newList;
    }

    const elements = generateList(listContents);

    const handleAddElement = (elementType) => {
      let nextId = generateId();
      //console.log(`Current value is: ${nextId}`);
      let elementsCopy = [
        ...elements,
        {
          id: nextId,
          value: ""
        }
      ];
      console.log(elements);
      onUpdate(elementsCopy);
    }

    const handleUpdateItem = (itemId, objectOfUpdates) => {
      //console.log(`--FROM LIST.JS handleUpdateItem: editing list item ${itemId}`);
      console.log(objectOfUpdates);
      let objIndex;

      let elementsCopy = elements.map((object, i) => {
        if(object.id === itemId ){
          //console.log("FOUND at " + i);
          objIndex = i;
          return(
            {
              ...object, //gets all values in the object
              ...objectOfUpdates //overwrites the properties that have been updated
            }
          )
        }
        return object;
      });
      //console.log("---Updated Elements");
      //console.log(elementsCopy);
      onUpdate(elementsCopy);
    };

    const handleRemoveItem = (itemId) => {
      console.log(`REMOVE ${itemId}`);
      let elementsCopy = elements.filter(p => p.id !== itemId);
      console.log(elementsCopy);
      onUpdate(elementsCopy);
    }

    // const handleAddElementCopy = () => {
    //   let nextId = generateId();
    //   let copy = {};
    //   if(elements.length < 1){
    //     copy = JSON.parse(JSON.stringify(objectTemplate));
    //   }else{
    //     copy = JSON.parse(JSON.stringify(elements[elements.length-1]));
    //   }
    //   console.log("LIST.JS----handleAddElementCopy");
    //   console.log(elements[elements.length-1]);
    //   copy.id = nextId;
    //   let elementsCopy = [
    //     ...elements,
    //     copy
    //   ];
    //   setElements(elementsCopy);
    //   onChange(id, elementsCopy);
    // }

    // const handlePositionChange = (id, delta) => {
    
    //   let oldPosition;
    //   let newPosition;
    //   let temp;
    //   let elementsCopy = [...elements];
    //   //console.log(elementsCopy);
  
    //   for(let i=0; i<elementsCopy.length; i++){
    //     if(elementsCopy[i].id == id){
    //       oldPosition = i;
    //       if((i + delta) < 0){
    //         newPosition = 0;
    //       }else if((i + delta)>elementsCopy.length-1){
    //         newPosition = elementsCopy.length-1;
    //       }else{
    //         newPosition = i + delta;
    //       }
  
    //     }
    //   }
    //   //store the object from the position where the moved object is supposed to go to 
    //   temp = elementsCopy[newPosition];
    //   //put the moved object into that position
    //   elementsCopy[newPosition] = elementsCopy[oldPosition];
    //   //in the previous location of the moved object, add whatever object was stored in temp
    //   elementsCopy[oldPosition] = temp;
  
    //   //console.log(`CHANGING POSITION FROM ${oldPosition} to ${newPosition}`);
    //   setElements(elementsCopy);
  
    // }

    return (
        <>
        <div className="list-container">
            {
                elements.map( (item,i) => {
                    {/* console.log("----ADDING ITEM: " + item); */}
                    return (
                        <div key={`div${i}`} className="material-item" onKeyDown={(e) => { 
                            if(e.key === 'Enter'){
                                handleAddElement();
                            }}}>
                            <BasicListElement key={`element${i}`} id={item.id} value={item.value} onChange={handleUpdateItem} /><a key={`link${i}`} className="button-icon" onClick={() => {handleRemoveItem(item.id)}}><IconRemove /></a>
                        </div>
                    )
                })
            }
            <a className="button-icon button-icon-add" onClick={handleAddElement}>
                    <span className="course--add--title">
                    <IconAdd />
                    </span>
            </a>
        </div>
        </>
      );
}

export default BasicList;