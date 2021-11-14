import config from './config';

export default class Data{

    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if(body != null){
            options.body = JSON.stringify(body); // body data type must match "Content-Type" header

        }
        //check if auth is required
        if(requiresAuth){
            //btoa() method creates a base-64 encoded ASCII string from the data you give it
            //remember to separate each property of credentials with a colon
            const encodedCredentials=btoa(`${credentials.emailAddress}:${credentials.password}`);
            //adding a new property to the options.headers object
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options);

    }

    async getCourses(){
        const response = await this.api('/courses', 'GET');

        if(response.status === 200){
            return response.json().then(data => data);
        }else{
            let err = new Error();
            err.status = response.status;
            throw err;
        }
    }

    async getCourse(id){
        const response = await this.api(`/courses/${id}`, 'GET');

        if(response.status === 200){
            return response.json().then(data => data);
        }else{
            let err = new Error();
            err.status = response.status;
            throw err;
        }
    }

    async createCourse(course) {
        //const response = await this.api('/courses', 'POST', course, true, credentials = null);
        // if (response.status === 201) {
        //   return [];
        // }
        // else if (response.status === 400) {
        //   return response.json().then(data => {
        //     return data.errors;
        //   });
        // }
        // else {
        //   throw new Error();
        // }
    }

    /*
    async updateCourse(course){
        const response = await this.api(`/courses/${course.id}`, 'POST', course, true, credentials = null);

    }
    */

    /*
    async deleteCourse(course){
        const response = await this.api(`/courses/${course.id}`, 'DELETE', course, true, credentials = null);

    }
    */

    async getUser(username, password) {
        const response = await this.api('/users', 'GET', null, true, { username, password});
        if (response.status === 200){
            return response.json().then(data => data);
        }else if(response.status === 401){
            return null;
        }else{
            throw new Error();
        }
    }

    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
          return [];
        }
        else if (response.status === 400) {
          return response.json().then(data => {
            return data.errors;
          });
        }
        else {
          throw new Error();
        }
    }








}