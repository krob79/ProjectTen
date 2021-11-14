const express = require('express');
const router = express.Router();
const User = require('../models').User;
const Course = require('../models').Course;
// Middlware function to authenticate a user
const { authenticateUser } = require('../middleware/auth-user');

const users = [];

/* Handler function to wrap each route. */
function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
        // Forward error to the global error handler
        next(error);
      }
    }
}

  router.get('/', (req, res) => {
    res.json({
        message: "Welcome to Kyle's REST API project!",
    });
  });

// Route that returns the current authenticated user.
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;
  
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      id: user.id
    });
    
  }));

// route that creates new user
router.post('/users', asyncHandler(async(req, res) => {
  console.log("---body " + req.body);
  try{
    await User.create(req.body);
    res.location(`/`);
    res.status(201).json({message:"User successfully created!"});
  }catch(error){
    console.log("Error: " + error.name);

    if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
      const errors = error.errors.map(err => err.message);
      res.status(400).json({errors});
    }else{
      throw error;
    }
  }
}));

// Send a GET request to /courses to READ a list of courses
router.get('/courses', asyncHandler(async (req, res)=>{
  const courses = await Course.findAll({
    include:[{
      model: User,
      /*EX: will return "owner": {"id": 1, "firstName": "Joe", "lastName": "Smith", "emailAddress": "joe@smith.com"}
        as part of course JSON result
      */
      as:'owner',
      attributes:['id','firstName','lastName','emailAddress']
    }],
    attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded']
  });
  console.log(courses);
  res.json(courses);
}));

// Send a GET request to /courses/(id) to READ a course of a specific id
router.get('/courses/:id', asyncHandler(async (req, res)=>{

  const courses = await Course.findByPk(req.params.id, {
    include:[{
      model: User,
      /*EX: will return "owner": {"id": 1, "firstName": "Joe", "lastName": "Smith", "emailAddress": "joe@smith.com"}
        as part of course JSON result
      */
      as:'owner',
      attributes:['id','firstName','lastName','emailAddress']
    }],
    // Filter results returning only certain columns
    attributes: ['id','title', 'description', 'estimatedTime', 'materialsNeeded']
  });

  if(courses){
    res.json(courses);
  } else {
      res.status(404).json({message: "Course was not found."});
  }
}));

// route that creates new course
router.post('/courses', authenticateUser, asyncHandler(async(req, res) => {
  try{
    const course = await Course.create(req.body);
    res.location(`/api/courses/${course.id}`);
    res.status(201).json({message:"Course successfully created!"});
  }catch(error){
    console.log("-----Error: " + error.name);

    if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
      const errors = error.errors.map(err => err.message);
      res.status(400).json({errors});
    }else{
      throw error;
    }
  }
}
));

router.put('/courses/:id', authenticateUser, asyncHandler(async(req, res) => {
  try{
    //find id based on what was specified in route params
    const course = await Course.findByPk(req.params.id);
    if(course){
      //if the userID matches the id of the current authenticated user, update the course
      if(course.userId === req.currentUser.id){
        await course.update(req.body);
        res.status(204).end();
      }else{
        res.status(403).json({"message": "User is not owner of this course."});
      }
    }else{
      res.status(404).json({"message": "This course does not exist."});
    }
  }catch(error){
    console.log("-----Error: " + error.name);

    if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
      const errors = error.errors.map(err => err.message);
      res.status(400).json({errors});
    }else{
      throw error;
    }
  }

}));

//route for removing course
router.delete('/courses/:id', authenticateUser, asyncHandler(async(req, res) => {
  try{
    const course = await Course.findByPk(req.params.id);
    if(course){
      //if the user id referenced in the course matches the authenticated user, delete it
      if(course.userId === req.currentUser.id){
        await course.destroy();
        res.status(204).end();
      }else{
        res.status(403).json({"message": "User can not delete this course."});
      }
    }else{
      res.status(404).json({"message": "This course does not exist."});
    }
  }catch(error){
    console.log("-----Error: " + error.name);

    if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
      const errors = error.errors.map(err => err.message);
      res.status(400).json({errors});
    }else{
      throw error;
    }
  }

}));

module.exports = router;
