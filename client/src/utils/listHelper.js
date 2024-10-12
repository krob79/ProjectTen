export const createMaterialsArray = (list) => {
    let result = ['No Materials Listed'];
    //console.log("---USING THE FOLLOWING MATERIAL LIST:");
    //console.log(list);
    if (typeof list === 'string' || list instanceof String){
        console.log("---Creating Materials List, String detected, splitting into Array");
        if(list.includes('\n')){
            result = list.split('\n');
        }else if(list.includes(',')){
            result = list.split(',');
        }
    }else if(Array.isArray(list)){
        console.log("---Creating Materials List, Array detected");
        result = list;
    }

    return result;
    
}

//TEMPORARY MEASURE!! MUST FIX EVENTUALLY!!
//I realized too late that the Course Data Model expects "materialsNeeded" to be a string, not an array.
//But I need the materials to be in an array so the List tool can work for adding/removing materials
//So, for now, as the materials list gets updated, I will flatten it back into a string right before storing it back in the course
export const createMaterialsString = (list) => {
    let result = "";
    if (typeof list === 'string' || list instanceof String){
        result = list;
    }else if(Array.isArray(list)){
        console.log("---Creating Materials String, Array detected, flattening into String");
        let newList = list.map((element) => {
            //console.log(`newList element: ${element.value}`);
            return element.value || element;
        });

        result = newList.toString();

    }
    console.log(`listString: ${result}`);
    return result;
}

