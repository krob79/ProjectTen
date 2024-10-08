//Makes API call to get data for a single course, using the courseId
//Returns data JSON object, with an extra ".owner" property (because for some reason, code is throwing errors when attempting to read course.courseOwner.firstName

// export const getCourse = async (courseId) =>{
//     let courseUrl = `http://localhost:5000/api/courses/${courseId}`;
//     console.log(`----UPDATE COURSE FETCHING COURSE ${courseUrl}...`);
//     await fetch(courseUrl, {
//     headers: {
//         'Content-Type': 'application/json'
//     }
//     })
//     .then(res => res.json())
//     .then(data => {
//     console.log(data);
//     console.log("---getCourse - see materials from data object:");
//     console.log(data.materialsNeeded);

//     //adding a new property because it can't seem to read {course.courseOwner.firstName}, etc...
//     //But this new property below works!
//     data.owner = `${data.courseOwner.firstName} ${data.courseOwner.lastName}`;
//     createMaterialsList(data.materialsNeeded);
    
//     setCourse(data);
        
//     })
//     .catch(error => {
//     console.log("----ERROR FROM getCourses!!");
//     console.warn(error);
//     });

    
// }

// export const createMaterialsList = (list) => {
//     let result = ['No Materials Listed'];
//     console.log("---USING THE FOLLOWING MATERIAL LIST:");
//     //console.log(list);
//     if (typeof list === 'string' || list instanceof String){
//         console.log("---Creating Materials List, String detected, splitting into Array");
//         if(list.includes('\n')){
//             result = list.split('\n');
//         }else if(list.includes(',')){
//             result = list.split(',');
//         }else{
//             //how many things are we going to check for here...?
//             result = list;
//         }
//     }else if(Array.isArray(list)){
//         console.log("---Creating Materials List, Array detected");
//         result = list;
//     }
    
//     console.log(result);
//     setMaterials(result);
// }