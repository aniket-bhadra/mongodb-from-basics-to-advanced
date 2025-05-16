# ✅ MySQL, PostgreSQL, MongoDB – Local vs Cloud Deployment & GUI/CLI Access

### 🔹 All three — MySQL, PostgreSQL, and MongoDB — are **server-based DBMSs**.

Once installed locally, they run as servers. You can connect to them using:

1. **CLI tools**

   - `mysql` (for MySQL)
   - `psql` (for PostgreSQL)
   - `mongosh` (for MongoDB)

2. **GUI tools**

   - **MySQL Workbench** (for MySQL)
   - **pgAdmin** (for PostgreSQL)
   - **MongoDB Compass** (for MongoDB)

3. **Programming languages**

   - e.g., `mysql`, `pg`, `psycopg2`, `mongoose`, `mongodb`, etc.

✅ Both CLI and GUI tools can connect to **local** or **cloud-based servers**, as long as the server is reachable (host, port, credentials are provided).

---

### 🔹 Local Deployment

You install the database locally, and it runs as a background server process. Default ports:

- **MySQL**: `3306`
- **PostgreSQL**: `5432`
- **MongoDB**: `27017`

You can connect via CLI, GUI, or programming languages.

---

### 🔹 Cloud Deployment

#### ✅ MongoDB

- Comes with **MongoDB Atlas**, its official managed cloud platform.
- You just:

  - Create a database via the Atlas web dashboard
  - Copy the provided connection URI
  - Use it in Compass, CLI, or application code

- No server installation or management required.

#### ✅ MySQL & PostgreSQL

Do **not** come with built-in cloud platforms. To run them in the cloud:

1. **Manual option**: Install the DB server yourself on a cloud VM (AWS EC2, Azure VM, DigitalOcean, etc.)
2. **Managed option**: Use **cloud services** like AWS RDS, GCP Cloud SQL, or Azure Database that provide **pre-installed instances**

To connect to these cloud databases via GUI or CLI:

- Whitelist your IP
- Open the required port (3306 for MySQL, 5432 for PostgreSQL)
- Set up users/passwords
- Use the appropriate connection string

---

### 🔹 GUI Tools – How They Work

All GUI tools are **just interfaces** to connect to DB servers.
They **do not host or run the database server themselves**.
They connect to whatever server you point them to — local or remote.

**MongoDB Compass**

- Can connect to a **local MongoDB server** (installed on your system)
- Can connect to **MongoDB Atlas** (cloud) via the provided URI

**pgAdmin / MySQL Workbench**

- Can connect to **locally installed servers**
- Can also connect to **cloud-hosted PostgreSQL/MySQL** servers (installed manually or provided by RDS, Cloud SQL, etc.)
  Requires manual setup of IP whitelisting, open ports, and connection strings.

---

### 🔹 CLI Tools – Local and Cloud Access

Same as GUI tools, CLI tools like `psql`, `mysql`, and `mongosh` can connect to:

- **Local servers** using `localhost` and default port
- **Remote/cloud servers** using public IP or domain, port, and credentials (if access is allowed)

---

### 🔹 Summary

✅ **All database systems (MySQL, PostgreSQL, MongoDB)** support both **local and cloud** deployment.

✅ **All tools — CLI, GUI, programming libraries — can connect to both local and cloud-hosted servers**, if properly configured.

---

### 🔹 Comparison: Cloud Access Experience

**MongoDB Atlas + Compass**
✔️ Easiest setup
✔️ No manual server configuration
✔️ URI is provided
✔️ No networking configuration

**pgAdmin / Workbench + PostgreSQL/MySQL (Cloud)**
⚠️ Requires extra setup
– Open ports / whitelist IP
– Configure users
– Manually retrieve and use connection string

---

### 🔹 Final Conclusion

> ✅ Yes — **GUI and CLI tools** can connect to **both local and cloud servers** for **MySQL**, **PostgreSQL**, and **MongoDB**.

> 📌 The only difference is in **how easy the cloud setup is**:

- **MongoDB Atlas + Compass** = simple, fast, beginner-friendly
- **MySQL/PostgreSQL on cloud + Workbench/pgAdmin** = more manual setup, but fully supported


#### ✅ **MySQL CLI:**

* ✔ Yes, `mysql.exe` is the CLI.
* ✔ You can:

  * Run it manually via full path: `C:\path\to\mysql.exe`.
  * Or add MySQL's `bin` folder to the system PATH → then run `mysql` from any terminal.

---

#### ✅ **PostgreSQL (psql):**

* ✔ Yes, `psql.exe` is the CLI.
* ✔ The **PostgreSQL Shell** (SQL Shell) is just a shortcut to run `psql.exe`.
* ✔ You can:

  * Use the SQL Shell (a shortcut that runs the CLI).
  * Or add PostgreSQL's `bin` folder to the PATH → then run `psql` from terminal.
  * Or run the full path to `psql.exe` manually.

---

#### ✅ **MongoDB CLI (`mongosh`):**

* ✔ Unlike MySQL and PostgreSQL, you install `mongosh` separately.
* ✔ The `mongosh` CLI installer (recent versions) **automatically adds `mongosh` to your PATH**.
* ✔ So you can simply run `mongosh` from a normal terminal and the MongoDB CLI will activate.

---

mysql,postgresql, .sql file excuted by gui,cli then that goes to server, here directly running comand either cli or inteact with server with gui,no extra file creation

### 🔗 Connect to MongoDB:

**Local server:**

```bash
mongosh
```

**local server with authentication:**

```bash
mongosh "mongodb://<username>:<password>@<host>:<port>/<dbname>"
```

### ✅ **MySQL/PostgreSQL (local):**

* **Default user:** `root` (MySQL), `postgres` (PostgreSQL).
* You are prompted to set a password during installation.
* You can also create other users with specific privileges.

### ❌ **MongoDB (local):**

* **No default user or auth by default.**
* When installed locally, **authentication is disabled**, so **anyone can access all databases**.

### To enable authentication in local MongoDB:

1. Create an admin user:

   ```js
   use admin
   db.createUser({
     user: "admin",
     pwd: "password",
     roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]
   })
   ```
   user roles are predefined built-in roles in MongoDB. You simply assign them by name in the roles array.

2. Then start MongoDB with auth:

   ```
   mongod --auth
   ```

---

### ✅ **Connection strings based on MongoDB local setup**

1. **If authentication is enabled, and user is created in the `admin` DB**:

```js
mongoose.connect('mongodb://admin:password@127.0.0.1:27017/dbname?authSource=admin');
```

2. **If authentication is enabled, and user is created in the same `dbname`**:

```js
mongoose.connect('mongodb://username:password@127.0.0.1:27017/dbname');
```

3. **If authentication is disabled (default MongoDB install):**

```js
mongoose.connect('mongodb://127.0.0.1:27017/dbname');
```

---
connect to local server with authentication enabled through CLI
```bash
mongosh "mongodb://admin:password@127.0.0.1:27017/dbname?authSource=admin"
```
connect to local server with authentication enabled through Compass

Hostname: 127.0.0.1
Port: 27017

Authentication:

Select "Username / Password"
Username: admin
Password: your password
Authentication Database: admin ✅ (very important!)

Then click "Connect".

✅ If authentication is enabled, the connection string is the same (for Mongoose, CLI, GUI), and you must specify the target DB to initially connect to.


Create user in admin DB if they need access to multiple databases or need administrative roles.
Create user in a specific DB if they only need access to that one database.

If user is created in admin DB, then you must add authSource=admin in the connection string.

No authSource needed, since the user is created in the same DB (cricket).
use cricket
db.createUser({
  user: "rohit",
  pwd: "password",
  roles: [{ role: "readWrite", db: "cricket" }]
})
mongosh "mongodb://rohit:password@127.0.0.1:27017/cricket"

MongoDB Atlas (cloud) → mongodb+srv://
Local MongoDB server → mongodb://

---


### Two Common Execution Scenarios

#### Scenario 1: Executing a Single Command
When you highlight and execute a specific command within a file:
- **Only the highlighted command is sent directly to the server**
- No file execution occurs in any meaningful sense
- The tool simply reads your selection and sends it

#### Scenario 2: Executing an Entire File
When you run all commands in a file:
- Commands are sent to the server sequentially, one after another
- The file isn't "executed" as a program
- Each command is independently processed by the server

Database commands run in two ways: Direct Command Path (typed in CLI/GUI → sent instantly to server) and File-Based Path (.sql for PostgreSQL/MySQL, .js for MongoDB → read by tools → sent line by line). Direct is best for quick queries; file-based is ideal for complex or reusable logic. Both methods work across CLI and GUI in all three databases.

When using files, the file itself isn’t executed — it’s just a container of commands. The CLI/GUI tool reads the file and sends commands one by one to the server. If you highlight and run a single command, only that specific command is sent and executed.

### Common Misconception
When people say "execute the file," what's actually happening is the interface is reading and sending each command to the server sequentially. The database server receives and processes individual commands, not the file as a whole.


### show databases
show dbs

show collections

### create database & use it
use school

until collection is created no db going to be created

### create collection
db.createCollection("employees")

### delete collection
db.collectionName.drop()

### delete db
db.dropDatabase()

### insert data
if students collection exist it will add data there, if not then it will create and add data

db.students.insertOne({name: "Raju", age:25})

db.students.insertMany([
  {name: "sara", age:25}
  {name: "subir", age:45}
  {name: "pravin", age:55}
  {name: "basu", age:25}
])

### read data
db.students.find()

db.cars.findOne({model:'Creta'})
the methods you use in MongoDB shell (like find(), insertMany(), findOne()) are similar to those in Mongoose, but Mongoose adds additional features like schema validation, middleware,Population (similar to joins in SQL) and more.
So MongoDB query syntax is fully supported in Mongoose, but Mongoose adds structure and functionality that makes working with MongoDB more developer-friendly in a Node.js environment.

db.cars.find({},{model:1})
this--{} match all the documents
then {model:1} means only model field selected, 1-> means true

_id is always shown by default, if we dont want-
db.cars.find({},{model:1,_id:0})

filter documents
db.cars.find({fuel_type:"Petrol"})

filter documents based on a field which is array of strings
db.cars.find({features:"Sunroof"})

filter documents based on nested object field
db.cars.find({"engine.type":"Turbocharged"})

### update data
```shell
db.cars.updateOne(
  {model:"Nexon"},
  {$set:{color:"Red"}}
)
```
It will only update the first document with model: "City", and if color field is not there even in that case it will add & put 'Red'

```shell
db.cars.updateMany( { fuel_type: "Diesel" }, { $set: { alloys: "yes" } } )
```
update all documents matching this fuel_type

add a value on array filed
```shell
db.cars.updateOne( { model:"City", }, { $push:{ features:"Heated seats" }} )
```
delete a value on array field
```shell
db.cars.updateOne( { model:"City", }, { $pull:{ features:"Heated seats" }} )
```
$push adds elements to the end of an array,
$pull removes all elements that match a specified condition.

updating multiple values in array
 db.cars.updateOne( { model:"City" }, { $push:{ features:{ $each:["wireless charging", "voice control"]}}})

 remove any field
 db.cars.updateOne( { model: "City" }, { $unset: { color: "" } })

add field to all documents
db.cars.updateMany( { }, { $set: { color: "Blue" } })

### upsert
while updating if document not found it will create new document
db.cars.updateMany( { model: "Venue" }, { $set: { maker: "Hyndui" } },{upsert:true})

### delete
 db.cars.deleteOne({ fuel_type: "Petrol" })
 delete 1st matched document

  db.cars.deleteMany({ fuel_type: "Petrol" })
delete all matched document

db.cars.deleteMany({})
delete all documents

### data types
mongoDB stores data in BSON (binary json) format
BSON includes all json data types & add more

objectId,string,integer,double,boolean,array,object/embeded document
date,timeStamp,null
-date
> db.test.insertOne({ date: new Date() } )
-timeStamp
db.test.insertOne({ Time: new Timestamp() } )

### operators
$eq $lt $gt $lte $gte $ne

gives equal
db.cars.find({ "engine.cc": 1493 })

give greater than
db.cars.find({ "engine.cc": { $gt: 1400 } })

$in $nin
$in is not range, it give me document which exactly matches any of the value of particular filed
db.cars.find({ "engine.cc": {$in:[1498,2179] }})

find a car which has array field, and i want from that array field this values "Diesel and Sunroof and Turbocharged Engine" should be there, all 3

db.cars.find(
{
   $and:[
      {"fuel_type": "Diesel"},
      {"engine.type": "Turbocharged"},
      {"sunroof": true}
   ]
}
)

same way use--
$or, $nor,

## element operators
#exists, $type

### $exist
db.cars.find( { color: { $exists: true } } )
whichever document has color field, return those

### $type
$type
Here we can filter the content based on type like string, bool etc
This can be useful to find field with null values
db.cars.find( { model: { $type: "string" } })


### 🔁 Array Operators in MongoDB

#### ✅ For arrays of **primitives** (e.g., `liked: ["user1", "user2"]`):

* **`$in`** → Any value matches

  ```js
  db.posts.find({ liked: { $in: ["user1", "user5"] } })
  // Matches posts where liked includes "user1" OR "user5"
  ```

* **`$all`** → All values must be present

  ```js
  db.posts.find({ liked: { $all: ["user1", "user2"] } })
  // Matches posts where liked includes BOTH "user1" AND "user2"
  ```

* **`$size`** → Match exact array length

  ```js
  db.posts.find({ liked: { $size: 3 } })
  // Matches posts where liked has exactly 3 elements
  ```

---
$in is used to match a field against a list of possible values. For example, it can be used to check if a name is either "Rohit", "Virat", or "Hardik".
It also works with arrays of primitives—returning documents where the array contains any of the values specified in the $in array.
$all does not work, if the field is not an array

#### ✅ For arrays of **objects** (e.g., `liked: [{ user: "user1", time: 10 }]`):

* **`$elemMatch`** → Match multiple conditions **inside the same object**

  ```js
  db.posts.find({
    liked: { $elemMatch: { user: "user1", time: { $gt: 5 } } }
  })
  // Matches posts where a single object inside liked has BOTH user = "user1" AND time > 5
  ```

* **Find posts where either `user1` OR `user2` exists in liked array**

  ```js
  db.posts.find({
    $or: [
      { liked: { $elemMatch: { user: "user1" } } },
      { liked: { $elemMatch: { user: "user2" } } }
    ]
  })
  ```

* **Find posts where BOTH `user1` AND `user2` are present (in any objects)**

  ```js
  db.posts.find({
    $and: [
      { liked: { $elemMatch: { user: "user1" } } },
      { liked: { $elemMatch: { user: "user2" } } }
    ]
  })
  ```

---

### ❌ Why omitting `$elemMatch` doesn't work:

```js
db.posts.find({
  $or: [
    { liked: { user: "user1" } },
    { liked: { user: "user2" } }
  ]
})
```

* This only works if `liked` is a **single object** (`liked: { user: "user1", ... }`).
* `$elemMatch` is needed when matching conditions **inside individual objects of an array**.

---

### cursor methods
Count
find().count()
Sort
find().sort({"name":1}) -1 is for descending order
Limit
find().limit(2)
Skip
find().skip(3)

### Aggregate Framework
  Most commonly used stages in MongoDB aggregation:

$match $count $group $project $sort $limit $skip $unwind $lookup $addFields  

$group
find no of cars of each brand
db.cars.aggregate([
   {
      $group:{
         _id:"$maker",
         totalCars: {$sum:1}
      }
   }
])

other things we can do after groupping-
db.collection.aggregate([

  {
    $group: {
            _id: "$category",
            totalAmount: { $sum: "$amount" },
            averageAmount: { $avg: "$amount" },
            minAmount: { $min: "$amount" },
            maxAmount: { $max: "$amount" },
           amountsList: { $push: "$amount" },
           uniqueAmounts: { $addToSet: "$amount" }
    }
  }
])
$push = collects all values in array (with duplicates),
$addToSet = collects only unique values in array.

$match
Hyundai cars having engine of more than 1000cc


db.cars.aggregate([
  {
    $match:{
      maker:"Hyundai",
      "engine.cc":{$gt:1200}
    }
  }
])

We can achieve this with find(), but the problem is:
find() supports multiple conditions, but not multiple stages.

For example, $match can be done with find(),
but if you need to match first and then group,
you must use the aggregation framework.

So:

If you're only matching conditions, find() is enough.
But if you need to perform further operations (like $group, $sort, etc.) after matching, then aggregate() should be used. 


### ✅ Use `find()`:

* For **simple filtering** (`$match`)
* For **basic field selection** (`projection`)
* Fast and easy

---

### ✅ Use `aggregate()`:

* For **multi-stage operations**
* When you need **\$group**, **\$sort**, **\$lookup**, etc.
* For **data transformation and analysis**

---

### 🧠 Key Rule:

> **Use `find()` for filtering. Use `aggregate()` for analysis.**
> **If your use case grows beyond basic filtering, **just switch to aggregation**.

---

### ❌ Example `find()` can’t do:

```js
// Get count of users by city where age > 25
db.users.aggregate([
  { $match: { age: { $gt: 25 } } },
  { $group: { _id: "$city", total: { $sum: 1 } } }
])
```

This needs **\$match + \$group**, so `find()` won't work.
Only `aggregate()` can handle this kind of logic.

---


$count

count hyundai all cars
db.cars.aggregate(
  [
    {$match:{
      maker:"Hyundai"
   }},
   {
      $count:"totalCars"
   }
])


//count no of diesel & petrol cars of hyundai
db.cars.aggregate([
  {
    $match: {
      maker: "Hyundai",
    },
  },
  {
    $group: {
      _id: "$fuel_type",
      totalCars: { $sum: 1 },
    },
  },
]);
//this shows electric,petrol,diesel cars count but i want only petrol and diesel-
//After $group: { _id: "$fuel_type" },
// _id becomes the fuel_type.

// So when you do:

// $match: { _id: "Petrol" }
// You're matching on the grouped fuel_type.

db.cars.aggregate([
  {
    $match: {
      maker: "Hyundai",
    },
  },
  {
    $group: {
      _id: "$fuel_type",
      total: { $sum: 1 },
    },
  },
  {
    $match: {
      _id: { $in: ["Petrol", "Diesel"] },
    },
  },
]);

see this things can not be achieved with find, that is why for this kind of opertion aggrete shold used not find

trick:
match the documents and count how many matched -- use-- $count
group the document and count how many in each group --use -- $sum:1



* When you use `$group`, you **must specify an `_id`** — it defines how documents are grouped.

#### 🔹 Case 1: Group by a field

```js
{ $group: { _id: "$maker", total: { $sum: 1 } } }
```

* Groups documents **by the value of `maker`**.
* Each unique `maker` becomes a group.

#### 🔹 Case 2: Group all documents together

```js
{ $group: { _id: null, total: { $sum: "$price" } } }
```

* `_id: null` tells MongoDB to **not group by any field**.
* All documents are treated as **one single group**.
* Useful when you want to compute a **grand total**, average, etc.


#### ✅ 2. `$sum`, `$avg`, etc.:

🔹 **Inside `$group`** → Used to calculate **per-group aggregations**
Example:

```js
{ $group: { _id: "$maker", totalCost: { $sum: "$price" } } }
```

🔹 **Outside `$group` (e.g., in `$project`, `$addFields`)** → Used to calculate **within an array field**
Example:

```js
{ $addFields: { totalCost: { $sum: "$service_history.cost" } } }
```

* Here, `$sum` computes the **sum of values in an array** (not across documents).

---

$project
find all the hyundai cars and only show maker,model and fuel_types

db.cars.aggregate([
   {
      $match:{maker:"Hyundai"}
   },
   {
      $project:{
         _id:0,
         maker:1,
         model:1,
         fuel_type:1
      }
   }
])
$sort

db.cars.aggregate([
   {
      $match:{maker:"Hyundai"}
   },
   {
      $project:{
         maker:1,
         model:1,
      }
   },
   {
      $sort:{
         model:1
      }
   }
])

$sortByCount

db.cars.aggregate([
   {
      $sortByCount:"$maker"
   }
])
this create groups based on this 'maker' field, then provide the count in each group, then sort based on that 'maker' field

$unwind
it is used- suppose if we have array of owner objects in single document
so i want split the same document for each owner
db.cars.aggregate([ { $unwind: "$owners" }])

### so what is pipeline then?
A pipeline is a sequence of stages that process documents step by step.
Each stage ($match, $group, etc.) transforms the data and passes it to the next.
It’s like a data flow — documents go through filters, grouping, sorting, or reshaping in order.

### string operators
## $concat
print all the cars--model+maker name


db.cars.aggregate([
   {
      $match:{
         maker:"Hyundai"
      },
   },{    
      $project:{
            _id:0,
            name:{$concat:["$maker"," ","$model"]}
         }
   }
])

## toUpper
db.cars.aggregate([
   {
      $match:{
         maker:"Hyundai"
      }
   },
   {
      $project:{
         _id:0,
         model:{
            $toUpper:"$model"
         }
      }
   }
])

## $regexMatch
syntax-{
  $regexMatch:{
      input:which field we want to check,
     regex: the pattern that we are checking
      i: the option for matching the pattern
  }
}


Q. add a flag is_diesel=true/false for each car
db.cars.aggregate([
   {
      $project:{
         _id:0,
         maker:1,
         model:1,
         is_diesel:{
            $regexMatch:{
               input:"$fuel_type",
               regex:"Die"
            }
         }

      }
   }
])

now i take this data and add another stage which group based on that flag and count in each group--

db.cars.aggregate([
   {
      $project:{
         _id:0,
         maker:1,
         model:1,
         is_diesel:{
            $regexMatch:{
               input:"$fuel_type",
               regex:"Die"
            }
         }

      }
   },
   {
      $group:{
         _id:"$is_diesel",
         total:{
            $sum:1
         }
      }
   }
])

$out
after aggregating store the result in another collection
db.cars.aggregate([
   {
      $project:{
         _id:0,
         model:1
      }
   },{
      $out:"all_models"
   }
])
then we can operate on that new collection this just like view in sql

### Airthmetic Operators

#### $add   $subtract  $divide  $multiply  $round $abs   $ceil
### $add

db.cars.aggregate([
   {
      $project:{
         sum:{
            $add:[1,2,3,4,5]
         }
      }
   }
])

print all the cars and their old price and newPrice with the hike of 8000

db.cars.aggregate([
   {
      $project:{
         _id:0,
         model:1,
         maker:1,
         oldPrice: "$price",
         newPrice:{
            $add:["$price",8000]
         }
      }
   }
])

notes:
find or aggregate the end results always comes as an array

## addFields/set

> * To add temporary fields, use either `$project` or `$addFields`.
> * Fields added in `$project` can be used **only in the immediate next stage**.
> * Fields added in `$addFields` can be reused in **deeper stages**.
>   So if the field needs to be reused later in the pipeline, **use `$addFields`**.


db.cars.aggregate([
   {
      $project:{
         _id:0,
         maker:1,
         model:1,
         price:1
      }
   },
   {
      $addFields:{
         price_in_lakhs:{
            $divide:["$price",100000]
         }
      }
   }
])

## Conditional Operators
$cond   $ifNull   $switch

### $cond

db.cars.aggregate([
   {
      $project:{
         _id:0,
         model:1,
         maker:1,
         category:{
            $cond:{
               if:{
                  $eq:["$fuel_type","Petrol"],
               },
               then:"Patrol Car",
               else:"Non Patrol Car"
            }
         }
      }
   }
])


$switch
db.cars.aggregate([
  {
    $project: {
      model: 1,
      price: 1,
      segment: {
        $switch: {
          branches: [
            { case: { $lte: ["$price", 500000] }, then: "Budget" },
            { case: { $lte: ["$price", 1000000] }, then: "Mid-range" }
          ],
          default: "Premium"
        }
      }
    }
  }
])


### variables
#### system variables
NOW
stores current system date

db.cars.aggregate([
   {
      $project:{
         _id:0,
         model:1,
         maker:1,
         date:"$$NOW"
      }
   }
])

user defined variables
These variables allow you to store values and
reuse them within the same pipeline

### 📘 User-Defined Variables in MongoDB Aggregation

#### ✅ 1. **Local Variables** (`$let`)

* Scope: **Only within the current expression**.
* Syntax:

  ```js
  $let: {
    vars: { x: <expression> },
    in: <expression using $$x>
  }
  ```
* Example:

  ```js
  {
    $project: {
      model: 1,
      doublePrice: {
        $let: {
          vars: { p: "$price" },
          in: { $multiply: ["$$p", 2] }
        }
      }
    }
  }
  ```

  🔹 Here, `p = $price`, used as `$$p` to calculate `doublePrice`.

---

#### ✅ 2. **Persistent Variables Across Stages**

* Use `$addFields` to define a field once and reuse it in later stages.

* Example:

  ```js
  {
    $addFields: {
      price_in_lakhs: { $divide: ["$price", 100000] }
    }
  },
  {
    $project: {
      model: 1,
      price_in_lakhs: 1
    }
  }
  ```

🔹 `price_in_lakhs` is now accessible in **all following stages**.

---
in cli we can create variable and can use it-
my_price=1500000
db.cars.find({ price: my_price })


Hyundai={maker:"Hyundai"}
 db.cars.find(Hyundai)

 
Object.keys(this)
It shows all functions and global variables in the current database context,

--- 
### data modeling
MongoDB is a NoSQL database, so it doesn't enforce strict schema relationships like foreign keys in relational databases.
But we can still connect data between documents.

There are two main ways to connect data in MongoDB:
Embedded Documents (Denormalization)
Referenced Documents (Normalization)

## Normalization
Normalization is the process of storing data in its corresponding table or collection to prevent duplication and redundancy and to better manage the data. It involves breaking down data into smaller, logical parts and putting them into their own proper place. In SQL, you store related data in separate tables and link them using foreign keys. In NoSQL, you store related data in separate collections and reference them with IDs from other collections. This way, you keep data clean, reduce repetition, and make updates easier and safer.
ex-
 storing customer data in its own "customer" table/collection and order data in its own "order" table/collection. These two are then linked by referencing the customer's primary key (PK) in the order table (SQL) or the customer ID in the order collection (NoSQL).

---
how can we maintain relationship in mongoDB
let say users and orders
1 to many-



### **1. Embedded Document Example**

```json
{
  "_id": ObjectId("user1"),
  "username": "john_doe",
  "email": "john@example.com",
  "orders": [
    {
      "orderId": "order1",
      "product": "iPhone 13",
      "total": 999
    },
    {
      "orderId": "order2",
      "product": "MacBook Pro",
      "total": 2500
    }
  ]
}
```

---

### **2. Referenced Document Example**

**User document**:

```json
{
  "_id": ObjectId("user1"),
  "username": "john_doe",
  "email": "john@example.com",
  "orderIds": [
    ObjectId("order1"),
    ObjectId("order2")
  ]
}
```

**Order document**:

```json
{
  "_id": ObjectId("order1"),
  "product": "iPhone 13",
  "total": 999
}
```

```json
{
  "_id": ObjectId("order2"),
  "product": "MacBook Pro",
  "total": 2500
}
```

---

### **When to Use What**

* **Use Embedded Documents**:

  * **When to use**: If the data is **small** and you want **fast access** to all related information in one document.
  * **Pros**: Faster read performance, simpler data structure, no need for joins.
  * **Cons**: Can lead to large documents if data grows, possible duplication of data.

* **Use Referenced Documents**:

  * **When to use**: If the data is **large**, needs to be **shared**, or grows frequently.
  * **Pros**: Reduces data duplication, easier to update data, better for relationships between multiple records.
  * **Cons**: Slower reads (requires joins/`$lookup`), more complex queries.

---

### $lookup
db.users.aggregate([
    {
        "$lookup": {
            "from": "orders",                         // The target collection to join with
            "localField": "_id",                     // The field from the 'users' collection
            "foreignField": "user_id",                // The field from the 'orders' collection
            "as": "orders"                         // The name of the new array field to add the `users' 
        }
    }
])

### schema validation
needed to prevent inserting non sense, useless data

### we can create validation while creating collection
db.createCollection("user2", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "phone"],
      properties: {
        name: {
          bsonType: "string",
          description: "name should be string",
        },
      },
      validationLevel: "strict",
      validationAction: "error",
    },
  },
});
// validationLevel: "strict"-->document must fully match the schema validation rules, if it does not then it wont be inserted/updated in the collection
// validationLevel: "moderate"-->MongoDB checks new documents and only the fields you change during updates.It ignores old invalid data if you don’t touch it.

//validationAction: error->If a document does not meet the schema validation criteria, MongoDB will throw an error and reject the insert or update operation.
//validationAction: warn--> MongoDB logs a warning message when a document does not meet the schema validation criteria but still allows the insert or update operation.

### update the existing collection to add validation
db.runCommand({
   collMod: "users",
   validator: {
      $jsonSchema: {
         // after this point everything remains same like adding validation while creating collection
      }
   }
})

### index
An index is a data structure that improves query speed by allowing the database to quickly locate and access the required data without scanning every document or row in the collection or table.

Indexed values are sorted, and the tree stores pointers (like links) to the actual data. This is exactly how B/B+ trees work.

In SQL, the primary key (PK) is automatically indexed.
In MongoDB, the _id field is also automatically indexed.

db.cars.createIndex({ maker: 1 });
db.cars.createIndex({ model: 1 }, { unique: true });
db.cars.dropIndex("maker");
db.cars.getIndexes()

Types of Indexes:

Single Field Index
Compound Index: Involves multiple fields.
Unique Index: Index that ensures no two documents have the same value for the indexed field.
TTL Index: TTL (Time to Live) indexes that are used to automatically remove documents after a certain period.TTL index removes the document, not the index

### Transaction
A **MongoDB transaction** is a sequence of operations executed as a single unit, ensuring all succeed or all rollback, maintaining **ACID** properties.

**ACID Explained (Short):**

* **Atomicity: All or nothing.** ensures that a transaction is atomic, it means that either the entire transaction completes fully or doesn't execute at all,If a transaction has multiple operations, and one of them fails, the whole transaction is rolled back, leaving the database unchanged. This avoids partial updates
* **Consistency: Valid state before & after.**Consistency makes sure the database follows all rules before and after a transaction. If a transaction breaks any rule, it's rejected to keep the data correct.
* **Isolation: No interference between transactions.**Isolation means many transactions can run at the same time, but they don’t affect each other. One transaction’s changes stay invisible to others until it's finished—this avoids reading uncommitted or changing data.
* **Durability: Once committed, changes persist.** the updates and modifications to the database are stored in and written to disk.


**Simplest Example (ACID-compliant):**

```js
const session = await client.startSession();
session.startTransaction();
try {
  await users.updateOne({ _id: 1 }, { $inc: { balance: -100 } }, { session });
  await users.updateOne({ _id: 2 }, { $inc: { balance: 100 } }, { session });
  await session.commitTransaction(); // All succeed
} catch (e) {
  await session.abortTransaction(); // All rollback
}
session.endSession();
```

ACID principles exist in SQL databases too.
SQL uses Transaction Control Language (TCL) commands like START TRANSACTION, COMMIT, and ROLLBACK to manage transactions that follow ACID—same concept as in MongoDB.


### 🔁 Replication –

* A **replica set** = 1 **primary** + 1+ **secondary** nodes.
* All **writes** go to the **primary**.
* **Secondaries** sync data from primary (asynchronously).
* **Reads** can go to secondaries (if enabled) = **faster reads** + **high availability**.
* If **primary fails**, one secondary is auto-promoted (no SPOF).

✅ This setup **is default in MongoDB Atlas** (3-node replica set).

---

### ⚖️ Sharding – The Basics

* For **huge datasets** or **high write load**, a single replica set isn’t enough.
* **Sharding** splits data across multiple **shards** = **horizontal scaling**.
*  Each shard is a **replica set**, so every shard has its own primary + secondaries.

---

### 🤖 Key Components in Sharding

1. **Shard key** = Field used to split data across shards. Must be present in every document.
2. **Shard** = storing a subset of data.
3. **config servers** = Store metadata about where data lives (shard mapping).
4. **mongos (router)** = Receives client requests and routes to correct shard(s).
---

### 🧠 Answers to Your Questions


**Q1: If I have 1M documents and sharding splits 0.5M per shard, do I need to tell MongoDB which shard to use during queries?**
❌ No. You **don’t need to know** where the data is.
✅ `mongos` + **shard key** handle this automatically.But You must design your **shard key carefully** – it affects performance.


**Q2: What is `mongos` and how does it route?**

* `mongos` is a **router** between client & shards.
* It uses **config servers** to redirect correct shards
---


Example with 1M documents:

Shard 1 stores 500k docs, managed by its own replica set (1 primary + 2 secondaries).
Shard 2 stores 500k docs, managed by its own replica set (1 primary + 2 secondaries).
Config servers store metadata about which shard has what data ranges (based on shard key).
mongos router asks config servers and directs your query to the correct shard(s)
Total: 6 servers for data + config servers to manage metadata.

config servers are deployed as a replica set (normally with 3 members) for high availability of the metadata, not as a single server. Also, you'll typically have multiple mongos router instances for load balancing and redundancy.
### 🧠 Visualization (Simplified)

```
Client → mongos → config server metadata (Config servers store shard key ranges and cluster metadata)

Shard 1 = replica set → [Primary, Secondary, Secondary]
Shard 2 = replica set → [Primary, Secondary, Secondary]
```

---


