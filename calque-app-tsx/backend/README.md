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

 4. Prepare the MongoDB dependencies : <br>
 *In console, change directory to the backend.* <br>
 `npm install mongodb` <br>
 Will add content in node_modules, package-lock.json and also update package.json. <br>

 5. Development dependencies :  <br>
 *In console, change directory to the backend.* <br>
 `npm i --save-dev dotenv nodemon typescript @types/node @types/express`  <br>
 Will add Dotenv to manage environement variables.  <br>
 Will add Nodemon to refresh the server automatically while applying changes. <br>
 Will add Typescript to the project. <br>
 Will add @type/nodes to the project for typescript. <br>
 Will add @type/express to the project for typescript. <br>
 Will add content in node_modules, package-lock.json and also update package.json. <br>

 6. Prepare the .gitignore : <br>
 *In .gitignore, add the lines:* <br>
 `.env ` <br>
 `node_modules `  <br>
 If you need to install depedencies, use "npm -install", and the dependencies will be automatically installed via package.json <br>

 6. Scripts : <br>
 *In package.json, add the following lines in the script list:* <br>
 `"serverStart" : nodemon index.js, ` <br>
 ` "build" : tsc ` <br>



### Ressources used :

 - https://www.youtube.com/watch?v=P6RZfI8KDYc&list=PL_cUvD4qzbkwjmjy-KjbieZ8J9cGwxZpC "playlist tutorial"
 - https://www.youtube.com/watch?v=_7UQPve99r4 "1h30 tutorial"
 - https://www.youtube.com/watch?v=fgTGADljAeg "30 mins tutorial"


## Timeline <br>
 *DD-MM-YYYY* <br>
 18-06-2024 : Configuring the MongoDB for the first time; <br>
 20-06-2024 : Setting up the folder with the following ; <br>
 26-06-2024 : Debugging the API using Insomnia ; <br>



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
 - Javascript types: ` number, string, boolean, null, undefined, object `
 - Typescript additional types: `any, unknown, never, enum, tuple`
 - `let var1 : number = 1_000_000;` increases readability of large numbers.
 - `let variable;` will initiate with type any.
 - `function fx1(arg1){}` will assume arg1 is of type any.
 - `let array1: type[] = [value1, value2, value3...];` array of a specific type.
 - `let array2: [type1,type2] = [...,...];` tuple-like behavior.
 - `enum list1 {const1 = ..., const2 = ..., const3=...}` enum-like behavior allows list of const variables.
 - `function fx():void{...;}` will return void.
 - `function fx(){...;}` if no return, will return void.
 - `function fx(){return value:type;}` signature will take type of the return value.
 - `function fx():type{...;}` if no return, will return undefined.
 - `function fx():type{return value;}` expected behavior, will return explicitly specified type.
 - `function fx(arg? : type){...;}` will make the argument facultative, will supply undefined by default.
 - `function fx(arg = value){...;}` will make the argument facultative with a default value.
 - `let object:{attribute1:type, attribute2?:type}` will make the attribute2 facultative upon instanciation.
 - `let object:{readonly attribute:type}` will make the attribute immutable.
 - `let object:{fx1 (arg1:type)=>void}` will expect a function with the matching signature upon instanciation 
 - `type CustomType = { }` define a custom type, will allow reusability of objects.
 - `let var1 : CustomType = {...;}` new object instance.
 - `function fx(arg1: type1 | type2){...}` union type for arg1. Intellisense will only show common methods. Narrowing will allow to access type specific methods.
 - `function fx(arg1: type1 | null | undefined){...}` allows null and undefined values to be passed to the fx.
 - `type CustomType = type1 & type2;` intersection type will create a type combining both attributes and methods.
 - `object?.attribute` will access the attribute only if the object is not null and not undefined.
 - `object.attribute?.` will access the attribute only if the attribute is not null and not undefined.
 - `fx?.(...);` will execute the method only if the function is not null or undefined.
 - `function fx1( array: (type1|type2)[]{...} )` allows input of array of type1 and type2. The signature will reflect that with the union type.
 - `function fx1<GenericType>( array: GenericType[]{...} )` allows the return value to be of the exact same type as the function input. Generic is not declared, it is a placeholder.
 - `const var1 = fx1<Number>(arg1);` Will specify the type of the arg1 such that the output and signature will match.
 - `type CustomType<Generic> = { attribute : Generic;}` will allow the type to be specified upon instanciation.
 - `Const var1 : CustomType<{attribute:number}> = {...}` specifies the generic type. 
 - `type CustomType<Generic extends Type> = { attribute : Generic;}` will allow the type to be specified upon instanciation but will have to be belong to the type hierarchy .
 - ` type StringOrNum = string | number ;` Is an custom datatype
 - ` type ObjWithName = {name:string, fx(a:any):void, ...}; ` Custom type object (type alias)
 - ` intervace Int1 {attribut:type; fx(a:any):void; ... }`  Custom interface
 - ` interface { (arg1: Type, arg2 : Type) : Promise<Type>; } ` Interface with method 
 - ` function update(arg1 : Type1){...}; ` can tolerate other types than Type1 as long as they are made out of the exact same structure of primitive types.
 
 ### References:
 - www.youtube.com/watch?v=d56mG7DezGs "1h Introduction"
 - https://www.typescriptlang.org/docs/ "Typescript Documentation"
 - https://www.youtube.com/watch?v=EcCTIExsqmI "Generic types"


## 🏃‍♂️ Notes on Express 🏃‍♂️ :

 ### Inputs (Request)
 - `req.body.attribute` = will access the data stored by the request. If sent from an HTML form, the attribute name of the `<input />` tag matches what was defined with `name="variable"` property and the value accessed is dictated by the `value="..."` property. The data cannot be accessed directly unless the server app is using the middleware `app.use(express.urlencoded({extended:true}));`.
 - `req.query.attribute` will access the data stored in the URL such that `http://.../page?attribute=value...'` will return the value associated to the attribute.
 - `req.method` will return "GET", "PUT", "DELETE", "POST"...
 - `req.originalUrl` will return the original URL untouched by internal alterations.
 - `req.url` will return the URL, that can be modified for better rerouting.

 ### Outputs (Response)
 - `res.setHeader("Content-type", "text/html")` will dictate / update the format of the send() method.
 - `res.send("Hello world)` will send a simple string response. Will only be called ONCE in code.
 - `res.send("<p> Hello world </p>")` will send HTML if the header was set properly.
 - `res.write("<p> Hello world </p>")` and `res.end()` will work in a similar way than `res.send(...)` 
 - `res.sendStatus(404)` will send an HTTP server status code.
 - `res.status(500).send('message')` chain a message to the status.
 - `res.status(400).json({...:...})` chain a json response.
 - `res.download("file.ext")` send a file response to the client to be downloaded.
 - `res.render("./file")` will prompt a view engine to render the specified file.
 - `res.redirect('path/...')` will redirect the user after the response is sent.
 
 ### Routes
 ``` javascript
 //basic router in our main app
 const express = require("express");
 const app = express();
 app.get("/", (req,res)=>{
    res.send("Hello world");
 })
 ``` 
 
 <br>

 This executes when we reach the path '/' which is the path of the current file. The req is a Request interface and the res is the Response interface. Upon reaching the file / page, the get method will be executed. <br>

 ``` javascript
 //independent router in its router file
 const express = require("express");
 const router = express().Router(); //independent from app=express() and has similar functionalities
 router.get("/", (req,res)=>{  //  represents a subfolder or parent file
    res.send("Hello world");
 })
  router.get("/action1", (req,res)=>{  // response associated with the parent/action1 path
    res.send("...");
 })
   router.get("/action2/:var", (req,res)=>{  // response dictated by the dynamic parameter :var
    req.params.var // is how we access the dynamic parameter var from the path / URL
    res.send("...");
 })
 //...
 module.exports = router;
 ``` 
 <br>

 This router is associated with a path such that "/" represents the  and has actions associated with nested files. Upon reaching each file, the appropriate `router.get(...)` will be executed. Our server file will have to import this route with `const parentRouter = require('./routes/parent')'` and `app.use('/parent',parentRouter);`. <br>


``` javascript
 //...
   router.route("/action2/:var") //define all the HTML requests with the same route
   .get((req,res)=>{  // get
    //...
 })
    .put((req,res)=>{  // put
    //...
 })
    .delete((req,res)=>{  // delete
    //...
 })
 ``` 
 <br>
 
 Interesting shorthand notation to define the various HTTP request in a chained manner instead of defining them with `router.get` , `router.put` and `router.delete`.


 ### Middleware

 Middleware is code executed after the request is recieved but before the response is sent. Middleware code is run before`router.get` , `router.put` and `router.delete`. Middleware in the server file will be executed before middleware in the routers. <br> 

 ``` javascript
 //In server file
    app.use(middlewareFx1); //will execute the code defined in function middleWareFx1 before everything below.
    const express = require("express");
    const app = express();
    app.get("/", (req, middlewareFx2 ,res)=>{ //middlewareFx2 is specific to that context 
        res.send("Hello world");
    })
    //... 
    function middleWareFx1(req, res, next){ //Will be able to access request and response and use them
        console.log(req.originalUrl); //url of the API call
        next(); //GOTO to the next middleware function call if it applies, execution will resume here after the HTTP request is answered. 
        return; //will assure the end of the execution.
    }

 ``` 
 <br>

 If the next() GOTO is put at the beginning of the middleware function, the HTTP request will be treated before the content of the middleware is executed. If next() is at the end of the function, then the HTTP request will be handled at the end. To chain multiple middleware functions one after the other, the g.et / post / delete method should be written as `app.get("/", middlewareFx1, middlewareFx2, ... ,(req,res)=>{...})` such that the order of execution will be middlewareFx1, MiddlewareFx2 and get. That order may be altered depending on how next() is used.

 <br>

 ### References:
 - https://www.youtube.com/watch?v=SccSCuHhOw0
 - https://www.youtube.com/watch?v=lY6icfhap2o
 - 



 ## 🦢 Notes on Mongoose 🦢 :

### Schemas

 Schemas are defined by a JSON file. A collection is a table, each collection is represented by a schema. Each column or attribute has a type. The JSON will dictate the structure of the MongoDB database. <br>

 The format for the JSON is : <br>
 
 ```javascript
    const blogSchema = new Schema(
        {
        title: String,
        author: String,
        body: String,
        comments: [{ body: String, date: Date }],
        date: { type: Date, default: Date.now },
        hidden: Boolean,
        meta: {
            votes: Number,
            favs: Number
            }
        });
 ```
 <br>
 "Documentation:"
 - https://mongoosejs.com/docs/guide.html
 - https://mongoosejs.com/docs/api/schema.html
 -

 ### Documents (Interfaces)

 The document interface class helps implementing all the usual CRUD-like methods to manipulate a row of a collection. The document represents a single tuple / row. <br>

 The document can be rudimentary : <br>

  ```javascript
 var mydoc = {
               _id: ObjectId("5099803df3f4948bd2f98391"),
               name: { first: "Alan", last: "Turing" },
               birth: new Date('Jun 23, 1912'),
               death: new Date('Jun 07, 1954'),
               contribs: [ "Turing machine", "Turing test", "Turingery" ],
               views : NumberLong(1250000)
            }
 ``` 
 <br>
 You can also extend a Document to make custom interface to help ourselves manipulate rows: <br>

 ```javascript
 // Creating a new user instance
 const newUser: IUser = new User({
    username: 'john_doe',
    email: 'john.doe@example.com',
    password: 'hashed_password',
    fullName: 'John Doe',
    bio: 'Software Developer',
    age: 30,
    gender: 'Male',
    location: 'New York',
    interests: ['Programming', 'Reading'],
    role: 'user',
    createdAt: new Date(),
    isActive: true,
    avatarUrl: 'https://example.com/avatar.jpg',
    lastLogin: null
 });

// Save the new user to MongoDB
newUser.save()
    .then(savedUser => {
        console.log('User saved successfully:', savedUser);
    })
    .catch(error => {
        console.error('Error saving user:', error);
    });
 ```

  <br>
 "Documentation:"
 - https://www.mongodb.com/docs/manual/core/document/


 ### Explaining the current project architecture

 1. The entity.model. <br>
 Let's use the user.model.ts as an example. In this file, we define many important notions: <br>
 - IUser is the interface defining the structure of a user document.
 - userSchema defines the Mongoose schema with its fields and types.
 - User is the Mongoose model created from the schema, specifying that it handles documents conforming to the IUser interface.


 <br> 

 ` const User = mongoose.model<IUser>('User', userSchema); ` <br>

 When you use methods like User.find(), User.findById(), User.findByIdAndUpdate()... Mongoose returns instances of IUser, which are enriched with methods like .save(), .update(), .delete() via the IUser interface.
 

 2. Explaining the entity.controller. <br>

