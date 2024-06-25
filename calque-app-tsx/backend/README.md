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

