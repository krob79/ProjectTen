export const api = (
        path, 
        method = "GET", 
        body = null, 
        credentials = null
    ) => {
        console.log("----using API Helper...");
        const url = "http://localhost:5000/api" + path;

        const options = {
            method,
            headers: {}
        };

        if(body){
            console.log("---REQUEST BODY:");
            console.log(body);
            options.body = JSON.stringify(body);
            options.headers["Accept"] = 'application/json';
            options.headers["Content-Type"] = "application/json; charset=utf-8";
        }

        if(credentials){
            console.log("---CREDENTIALS:");
            console.log(credentials);
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers.Authorization = `Basic ${encodedCredentials}`;
        }else{
            console.log("---CREDENTIALS NOT FOUND");
        }

        return fetch(url, options);
} 