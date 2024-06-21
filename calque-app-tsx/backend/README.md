# Backend 

## Exigences 

 - Authentification and encryption of user data
 - Create an API (Rest) to query the database with the essential CRUD features.


## Setting up the project after cloning

 *If you've just cloned the project, you can simply install the dependencies to get started :* <br>

 1. Install dependencies stored in package.json. The following command will create and add content in node_modules, make sure you are in the backend directory and use the console to type :<br>
 `npm install ` 

 2. Compile the .ts files into .js files to the ./dist folder via the following node.js script : <br>
 `npm run build ` <br>
 *or if you have typescript installed globally, you can use :*<br>
  `tsc`<br>
 The typescript files are compiled to js and put in the ./dist folder. You can change the destination in tsconfig.json the "outDir" line.



## Setting up the project for the first time

 0. Files : <br>
 *Create index.ts* <br>
 *Create .env* <br>
 *Create .gitignore* <br>
 *Create config.ts* <br>
 *Create src/* <br>
 *Create dist/* <br>

 1.  Prepare the Node.js dependencies : <br>
 *In console, change directory to the backend and prepare it for Node.js*  <br>
 `npm init -y `  <br>
 Will add package.json.  <br>

 2. Prepare the Express.js dependencies :  <br>
 *In console, change directory to the backend and prepare it for Express.js* <br>
 `npm i express `  <br>
 Will add content in node_modules, package-lock.json and also update package.json. <br>

 3. Prepare the Mongoose dependencies :  <br>
 *In console, change directory to the backend.* <br>
 `npm i mongoose `  <br>
 Will add content in node_modules, package-lock.json and also update package.json. <br>

 4. Development dependencies :  <br>
 *In console, change directory to the backend.* <br>
 `npm i --save-dev dotenv nodemon typescript`  <br>
 Will add Dotenv to manage environement variables.  <br>
 Will add Nodemon to refresh the server automatically while applying changes. <br>
 Will add Typescript to the project. <br>
 Will add content in node_modules, package-lock.json and also update package.json. <br>

 5. Prepare the .gitignore : <br>
 *In .gitignore, add the lines:* <br>
 `.env ` <br>
 `node_modules `  <br>
 If you need to install depedencies, use "npm -install", and the dependencies will be automatically installed via package.json <br>

 6. Scripts : <br>
 *In package.json, add the following lines:* <br>
 `"serverStart" : nodemon index.js, ` <br>
 ` "build" : tsc ` <br>



### Ressources used :

 - https://www.youtube.com/watch?v=P6RZfI8KDYc&list=PL_cUvD4qzbkwjmjy-KjbieZ8J9cGwxZpC
 - https://www.youtube.com/watch?v=_7UQPve99r4



## Timeline <br>
 *DD-MM-YYYY* <br>
 18-06-2024 : Configuring the MongoDB for the first time; <br>
 20-06-2024 : Setting up the folder with the following ; <br>



## Notes on typescript:
 - Regular Javascript can be written in a typescript file. It will be transpiled as is.
 - ` const variable1 = ...; ` assures immutability.
 - ` let variable2 = ...; ` allows mutability.
 - ` let variable2 : "value" = ...; ` limit to a value;
 - ` let variable3 : any = ...;` explicitely allows all types;
 - ` let variable4 = <type> variable3; ` converts an any type to a specific type. Type assertion will not influence the behavior of the variable, because assertion annotations are removed at compilation.
 - ` let variable5 = <interface> { }; ` converts an undefined object to a specific object.
 - ` const variable6 = variable1 as type ` specifies a type onto a more specific one.
 - `const variable7 = variable1 as any as type` another assertion method.
 - ` type NomType = { var1:type1; var2:type2;} ` allow struct like behavior.
 - ` type NomType = ... | ... | ... ; ` allows custom datatypes with finite possibilities (narrowing).
 - ` function fx1(): value1 | value2 | value3 {} ` narrows the possible inputs to a function.
 - ` interface Interface1{ variable1: value1 | value2; } ` narrows the possible inputs to an interface attribute.

### References:
 - www.youtube.com/watch?v=d56mG7DezGs