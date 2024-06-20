# Backend 

## Exigences 

 - Authentification and encryption of user data
 - 


## Setting up the project after cloning

 *If you've just cloned the project, you can simply install the dependencies to get started : *

 1. Install dependencies stored in package.json. The following command will create and add content in node_modules, make sure you are in the backend directory and use the console to type :
 `npm install ` 

 2. Compile the .ts files into .js files to the dist/ folder via the following node.js script : 
 `npm run build ` 
 *or if you have typescript installed globally, you can use :*
  `tsc`
 The typescript files are compiled to js and put in the ./dist folder. You can change the destination in tsconfig.json the "outDir" line.



## Setting up the project for the first time

 0. Files : 

*Create index.ts*
*Create .env*
*Create .gitignore*
*Create config.ts*
*Create src/*
*Create dist/*



 1.  Prepare the Node.js dependencies :

*In console, change directory to the backend and prepare it for Node.js*
`npm init -y ` 
Will add package.json.


 2. Prepare the Express.js dependencies : 

*In console, change directory to the backend and prepare it for Express.js*
`npm i express ` 
Will add content in node_modules, package-lock.json and also update package.json.


 3. Prepare the Mongoose dependencies : 

*In console, change directory to the backend.*
`npm i mongoose ` 
Will add content in node_modules, package-lock.json and also update package.json.


 4. Development dependencies : 

*In console, change directory to the backend.*
`npm i --save-dev dotenv nodemon typescript` 
Will add Dotenv to manage environement variables. 
Will add Nodemon to refresh the server automatically while applying changes.
Will add Typescript to the project.
Will add content in node_modules, package-lock.json and also update package.json.

 5. Prepare the .gitignore :

 *In .gitignore, add the lines:*
`.env `
`node_modules ` 
If you need to install depedencies, use "npm -install", and the dependencies will be automatically installed via package.json


 6. Scripts : 

*In package.json, add the following lines:*
`"serverStart" : nodemon index.js, `
` "build" : tsc `




### Ressources used :

 - https://www.youtube.com/watch?v=P6RZfI8KDYc&list=PL_cUvD4qzbkwjmjy-KjbieZ8J9cGwxZpC
 - https://www.youtube.com/watch?v=_7UQPve99r4


## Timeline
*DD-MM-YYYY*
18-06-2024 : Configuring the MongoDB for the first time;
20-06-2024 : Setting up the folder with the following ;
~