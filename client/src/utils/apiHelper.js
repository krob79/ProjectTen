export const configpath = () => {
    const path = "https://projectten-production.up.railway.app/api";
    return path;
}

export const api = (
        path, 
        method = "GET", 
        body = null, 
        credentials = null
    ) => {
        console.log("----using API Helper...");
        //const url = "http://localhost:5000/api" + path;
        const url = "https://projectten-production.up.railway.app/api" + path;

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
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers.Authorization = `Basic ${encodedCredentials}`;
        }else{
            console.log("---CREDENTIALS NOT FOUND");
        }

        return fetch(url, options);
} 
