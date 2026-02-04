# MongoDB Complete Guide

## Table of Contents

1. [MySQL, PostgreSQL, MongoDB – Local vs Cloud Deployment & GUI/CLI Access](#mysql-postgresql-mongodb--local-vs-cloud-deployment--guicli-access)
   - [Local Deployment](#-local-deployment)
   - [Cloud Deployment](#-cloud-deployment)
   - [GUI Tools – How They Work](#-gui-tools--how-they-work)
   - [CLI Tools – Local and Cloud Access](#-cli-tools--local-and-cloud-access)
   - [Summary](#-summary)
   - [Comparison: Cloud Access Experience](#-comparison-cloud-access-experience)
   - [Final Conclusion](#-final-conclusion)
2. [MySQL, PostgreSQL & MongoDB CLI Setup](#mysql-postgresql--mongodb-cli-setup)
   - [MySQL CLI](#-mysql-cli)
   - [PostgreSQL (psql)](#-postgresql-psql)
   - [MongoDB CLI (mongosh)](#-mongodb-cli-mongosh)
3. [Connect to MongoDB](#connect-to-mongodb)
4. [Default Users & Authentication](#default-users--authentication)
   - [MySQL/PostgreSQL (local)](#-mysqlpostgresql-local)
   - [MongoDB (local)](#-mongodb-local)
   - [To enable authentication in local MongoDB](#to-enable-authentication-in-local-mongodb)
5. [Connection Strings Based on MongoDB Local Setup](#connection-strings-based-on-mongodb-local-setup)
6. [Two Common Execution Scenarios](#two-common-execution-scenarios)
   - [Scenario 1: Executing a Single Command](#scenario-1-executing-a-single-command)
   - [Scenario 2: Executing an Entire File](#scenario-2-executing-an-entire-file)
   - [Common Misconception](#common-misconception)
7. [Basic MongoDB Operations](#basic-mongodb-operations)
   - [show databases](#show-databases)
   - [create database & use it](#create-database--use-it)
   - [create collection](#create-collection)
   - [delete collection](#delete-collection)
   - [delete db](#delete-db)
   - [insert data](#insert-data)
   - [read data](#read-data)
   - [update data](#update-data)
   - [upsert](#upsert)
   - [delete](#delete)
8. [Data Types](#data-types)
9. [Operators](#operators)
   - [Element Operators](#element-operators)
   - [$exist](#exist)
   - [$type](#type)
10. [Array Operators in MongoDB](#array-operators-in-mongodb)
    - [For arrays of primitives](#-for-arrays-of-primitives-eg-liked-user1-user2)
    - [For arrays of objects](#-for-arrays-of-objects-eg-liked--user-user1-time-10-)
    - [Why omitting $elemMatch doesn't work](#-why-omitting-elemmatch-doesnt-work)
11. [Cursor Methods](#cursor-methods)
12. [Aggregate Framework](#aggregate-framework)
    - [$group](#group)
    - [$match](#match)
    - [Use find()](#-use-find)
    - [Use aggregate()](#-use-aggregate)
    - [Key Rule](#-key-rule)
    - [Example find() can't do](#-example-find-cant-do)
    - [$count](#count)
    - [Case 1: Group by a field](#-case-1-group-by-a-field)
    - [Case 2: Group all documents together](#-case-2-group-all-documents-together)
    - [$sum, $avg, etc.](#-2-sum-avg-etc)
    - [$project](#project)
    - [$sort](#sort)
    - [$sortByCount](#sortbycount)
    - [$unwind](#unwind)
    - [so what is pipeline then?](#so-what-is-pipeline-then)
13. [String Operators](#string-operators)
    - [$concat](#concat)
    - [toUpper](#toupper)
    - [$regexMatch](#regexmatch)
14. [$out](#out)
15. [Arithmetic Operators](#arithmetic-operators)
    - [$add](#add)
16. [addFields/set](#addfieldsset)
17. [Conditional Operators](#conditional-operators)
    - [$cond](#cond)
    - [$switch](#switch)
18. [$setWindowFields](#setwindowfields)
    - [What is $setWindowFields?](#-what-is-setwindowfields)
    - [Syntax](#-syntax)
    - [Function types](#-function-types)
    - [Common window.documents ranges](#-common-windowdocuments-ranges)
19. [Variables](#variables)
    - [system variables](#system-variables)
    - [User-Defined Variables in MongoDB Aggregation](#-user-defined-variables-in-mongodb-aggregation)
    - [Local Variables ($let)](#-1-local-variables-let)
    - [Persistent Variables Across Stages](#-2-persistent-variables-across-stages)
20. [Data Modeling](#data-modeling)
    - [Normalization](#normalization)
    - [Embedded Document Example](#embedded-document-example)
    - [Referenced Document Example](#referenced-document-example)
    - [When to Use What](#when-to-use-what)
21. [$lookup](#lookup)
22. [Schema Validation](#schema-validation)
    - [Creating validation while creating collection](#creating-validation-while-creating-collection)
    - [Update existing collection to add validation](#update-existing-collection-to-add-validation)
23. [Index](#index)
24. [Transaction](#transaction)
25. [Replication](#replication)
26. [Sharding – The Basics](#sharding--the-basics)
    - [Key Components in Sharding](#-key-components-in-sharding)
    - [Answers to Your Questions](#-answers-to-your-questions)
    - [Visualization (Simplified)](#-visualization-simplified)
    - [sharding proper example](#sharding-proper-example)
27. [why horizontal scaling is harder in sql compare to no sql?](#why-horizontal-scaling-is-harder-in-sql-compare-to-no-sql)
28. [SQL vs NoSQL: Differences, Pros & Cons, and When to Use](#sql-vs-nosql-differences-pros--cons-and-when-to-use)
    - [NoSQL](#nosql)
    - [SQL](#sql)
29. [MongoDB Interview Questions & Answers](#mongodb-interview-questions--answers)

---

# MySQL, PostgreSQL, MongoDB – Local vs Cloud Deployment & GUI/CLI Access

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

# MySQL, PostgreSQL & MongoDB CLI Setup

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

# Connect to MongoDB

**Local server:**

```bash
mongosh
```

**local server with authentication:**

```bash
mongosh "mongodb://<username>:<password>@<host>:<port>/<dbname>"
```

# Default Users & Authentication

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

   ```js
   mongod --auth
   ```

---

# Connection Strings Based on MongoDB Local Setup

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

# Two Common Execution Scenarios

### Scenario 1: Executing a Single Command
When you highlight and execute a specific command within a file:
- **Only the highlighted command is sent directly to the server**
- No file execution occurs in any meaningful sense
- The tool simply reads your selection and sends it

### Scenario 2: Executing an Entire File
When you run all commands in a file:
- Commands are sent to the server sequentially, one after another
- The file isn't "executed" as a program
- Each command is independently processed by the server

Database commands run in two ways: Direct Command Path (typed in CLI/GUI → sent instantly to server) and File-Based Path (.sql for PostgreSQL/MySQL, .js for MongoDB → read by tools → sent line by line). Direct is best for quick queries; file-based is ideal for complex or reusable logic. Both methods work across CLI and GUI in all three databases.

When using files, the file itself isn't executed — it's just a container of commands. The CLI/GUI tool reads the file and sends commands one by one to the server. If you highlight and run a single command, only that specific command is sent and executed.

### Common Misconception
When people say "execute the file," what's actually happening is the interface is reading and sending each command to the server sequentially. The database server receives and processes individual commands, not the file as a whole.

# Basic MongoDB Operations

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
```shell
db.students.insertOne({name: "Raju", age:25})

db.students.insertMany([
  {name: "sara", age:25},
  {name: "subir", age:45},
  {name: "pravin", age:55},
  {name: "basu", age:25}
])
```

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

# Data Types

mongoDB stores data in BSON (binary json) format
BSON includes all json data types & add more

objectId,string,integer,double,boolean,array,object/embeded document
date,timeStamp,null
-date
> db.test.insertOne({ date: new Date() } )
-timeStamp
db.test.insertOne({ Time: new Timestamp() } )

# Operators

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

## Element Operators

### $exist
db.cars.find( { color: { $exists: true } } )
whichever document has color field, return those

### $type
$type
Here we can filter the content based on type like string, bool etc
This can be useful to find field with null values
db.cars.find( { model: { $type: "string" } })

# Array Operators in MongoDB

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

# Cursor Methods

Count
find().count()
Sort
find().sort({"name":1}) -1 is for descending order
Limit
find().limit(2)
Skip
find().skip(3)

# Aggregate Framework

Most commonly used stages in MongoDB aggregation:

$match $count $group $project $sort $limit $skip $unwind $lookup $addFields  

### $group
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

### $match
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

### ❌ Example `find()` can't do:

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


### $count

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

### $project
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

### $sort

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

### $sortByCount

db.cars.aggregate([
   {
      $sortByCount:"$maker"
   }
])
this create groups based on this 'maker' field, then provide the count in each group, then sort based on that 'maker' field

### $unwind
it is used- suppose if we have array of owner objects in single document
so i want split the same document for each owner
db.cars.aggregate([ { $unwind: "$owners" }])

### so what is pipeline then?
A pipeline is a sequence of stages that process documents step by step.
Each stage ($match, $group, etc.) transforms the data and passes it to the next.
It's like a data flow — documents go through filters, grouping, sorting, or reshaping in order.

# String Operators

### $concat
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

### toUpper
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

### $regexMatch
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

# $out
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

# Arithmetic Operators

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

# addFields/set

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

# Conditional Operators

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


### $switch
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


# $setWindowFields

### 🧠 What is `$setWindowFields`?

A powerful aggregation stage (MongoDB 5.0+) that **does what SQL window functions do**, like:

* Ranking documents (`$rank`, `$denseRank`, `$rowNumber`)
* Running totals & moving averages
* Comparing current vs previous/next documents
* Partitioned and ordered analysis

---

### 🛠️ Syntax:

```js
{
  $setWindowFields: {
    partitionBy: "$<field>",           // (Optional)
    sortBy: { <field>: 1 or -1 },      // (Required)
    output: {
      <newField>: { <windowFn>: <options> }
    }
  }
}
```

---

### ⚙️ Function types:

#### ✅ No options needed:

* `$rank: {}` → adds rank based on `sortBy`
* `$denseRank: {}`
* `$rowNumber: {}`

#### ⚠️ Options needed:

Functions like `$sum`, `$avg`, `$shift`, etc. need:

```js
<windowFn>: {
  input: "$<field>",                  // what to apply function on
  window: { documents: [start, end] } // range of documents to use
}
```

---

### 🧾 Common `window.documents` ranges:

| Range                      | Meaning                               |
| -------------------------- | ------------------------------------- |
| `["unbounded", "current"]` | From first to current (running total) |
| `[-1, 1]`                  | Previous, current, next               |
| `[0, 0]`                   | Only current doc                      |

---

# Variables

### system variables
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

# Data Modeling

MongoDB is a NoSQL database, so it doesn't enforce strict schema relationships like foreign keys in relational databases.
But we can still connect data between documents.

There are two main ways to connect data in MongoDB:
Embedded Documents (Denormalization)
Referenced Documents (Normalization)

### Normalization
Normalization is the process of storing data in its corresponding table or collection to prevent duplication and redundancy and to better manage the data. It involves breaking down data into smaller, logical parts and putting them into their own proper place. In SQL, you store related data in separate tables and link them using foreign keys. In NoSQL, you store related data in separate collections and reference them with IDs from other collections. This way, you keep data clean, reduce repetition, and make updates easier and safer.
ex-
 storing customer data in its own "customer" table/collection and order data in its own "order" table/collection. These two are then linked by referencing the customer's primary key (PK) in the order table (SQL) or the customer ID in the order collection (NoSQL).

---
how can we maintain relationship in mongoDB
let say users and orders
1 to many-



### Embedded Document Example

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

### Referenced Document Example

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

### When to Use What

* **Use Embedded Documents**:

  * **When to use**: If the data is **small** and you want **fast access** to all related information in one document.
  * **Pros**: Faster read performance, simpler data structure, no need for joins.
  * **Cons**: Can lead to large documents if data grows, possible duplication of data.

* **Use Referenced Documents**:

  * **When to use**: If the data is **large**, needs to be **shared**, or grows frequently.
  * **Pros**: Reduces data duplication, easier to update data, better for relationships between multiple records.
  * **Cons**: Slower reads (requires joins/`$lookup`), more complex queries.

---

# $lookup

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

# Schema Validation

needed to prevent inserting non sense, useless data

### Creating validation while creating collection
db.createCollection("user2", {
  validationLevel: "strict",       
  validationAction: "error",       
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
    },
  },
});
// validationLevel: "strict"-->document must fully match the schema validation rules, if it does not then it wont be inserted/updated in the collection
// validationLevel: "moderate"-->MongoDB checks new documents and only the fields you change during updates.It ignores old invalid data if you don't touch it.

//validationAction: error->If a document does not meet the schema validation criteria, MongoDB will throw an error and reject the insert or update operation.
//validationAction: warn--> MongoDB logs a warning message when a document does not meet the schema validation criteria but still allows the insert or update operation.

### Update existing collection to add validation
db.runCommand({
   collMod: "users",
   validator: {
      $jsonSchema: {
         // after this point everything remains same like adding validation while creating collection
      }
   }
})

# Index

An index is a data structure that improves query speed by allowing the database to quickly locate and access the required data without scanning every document or row in the collection or table.

1. **MongoDB**, **PostgreSQL**, and **MySQL (InnoDB)** all use **B-tree (or B+ tree)** as the default indexing data structure.
2. PostgreSQL and MySQL support other index types like that use various data structures beyond B-trees. **Hash, GiST, GIN, BRIN**, etc., for specific scenarios.

Stores the indexed fields in a sorted order, along with pointers to the actual documents in the collection.

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

# Transaction

A **MongoDB transaction** is a sequence of operations executed as a single unit, ensuring all succeed or all rollback, maintaining **ACID** properties.

**ACID Explained (Short):**

* **Atomicity: All or nothing.** ensures that a transaction is atomic, it means that either the entire transaction completes fully or doesn't execute at all,If a transaction has multiple operations, and one of them fails, the whole transaction is rolled back, leaving the database unchanged. This avoids partial updates
* **Consistency: Valid state before & after.**Consistency makes sure the database follows all rules before and after a transaction. If a transaction breaks any rule, it's rejected to keep the data correct.
* **Isolation: No interference between transactions.**Isolation means many transactions can run at the same time, but they don't affect each other. One transaction's changes stay invisible to others until it's finished—this avoids reading uncommitted or changing data.
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


# Replication

* A **replica set** = 1 **primary** + 1+ **secondary** nodes.
* All **writes** go to the **primary**.
* **Secondaries** sync data from primary (asynchronously).
* **Reads** can go to secondaries (if enabled) = **faster reads** + **high availability**.
* If **primary fails**, one secondary is auto-promoted (no SPOF).

✅ This setup **is default in MongoDB Atlas** (3-node replica set).

In MongoDB Atlas:

Writes are not scaled — they go only to the primary.
Reads can be scaled — you can configure read preferences to allow reads from secondary servers, helping distribute read load.

---

# Sharding – The Basics

* For **huge datasets** or **high write load**, a single replica set isn't enough.
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
❌ No. You **don't need to know** where the data is.
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


### sharding proper example
In NoSQL, we use horizontal scaling via sharding, where a shard key (a field like userId) is used to split data across servers. Since NoSQL is schema-flexible and avoids joins, it's easy to partition collections like orders by userId.

In NoSQL, we do horizontal scaling with sharding. For example, suppose we have `users` and `orders` collections and 1M data. To shard, we can use `userId` as shard key and divide the `orders` collection into 3 shards like:

* `userId` 1 to 333K → **orders for these users live in shard1**
* `userId` 333K to 666K → **orders for these users live in shard2**
* `userId` 666K to 1M → **orders for these users live in shard3**

But if we perform `$lookup`, then we have to be careful. If `users` stays on a single shard (or sharded differently), `$lookup` will be slow because MongoDB must fetch data across shards/servers.

So to keep `$lookup` fast, you should either:

* Embed user info inside orders (no join needed),
* Or shard both `users` and `orders` by the same shard key (e.g., `userId`), so related data lives on the same shard/server.

---

# why horizontal scaling is harder in sql compare to no sql?

The reason **horizontal scaling is difficult in SQL** is because:

* SQL strictly enforces **schema rules**, **constraints**, and **ACID principles** — even after joins.
* So it's very hard to choose a shard key without breaking **joins**, **consistency**, or violating rules.
* This lack of flexibility makes horizontal scaling **complex and risky**.

But in **NoSQL (like MongoDB):**

* It doesn't strictly follow schema rules or constraints.
* After `$lookup` (join), it **doesn't enforce ACID strictly**.
* **ACID is optional** — only applied **when you explicitly use a transaction**.
* This flexibility makes **horizontal scaling easier and more practical**.

# SQL vs NoSQL: Differences, Pros & Cons, and When to Use

### **NoSQL**

* **Scalability**: Designed to scale horizontally by adding more servers.
* **Flexibility**: Schema-less design allows easy handling of large, diverse, and semi/unstructured datasets—ideal for real-time analytics.
* **Performance**: NoSQL writes are faster due to schema flexibility, no joins, and easier horizontal scaling.reads are faster for simple lookups but slower for complex queries.
.
* **Use Case**: Best for big data, dynamic schemas, real-time analytics, IoT, and applications requiring rapid scaling.

### **SQL**

* **Scalability**: Scales vertically by adding more resources to a single server (limited, costly, complex).
* **Flexibility**: Rigid schema—changes require altering the schema, which is complex and time-consuming.
* **Data Suitability**: Excellent for structured data and complex queries; handling unstructured data is difficult.
* **Performance**: SQL writes are slower due to strict schema and ACID compliance; reads are efficient for complex queries using joins, indexes, and structured relationships.
* **Use Case**: Best for transactional systems (e.g., banking, ERP), where data integrity and complex querying are critical.

# MongoDB Interview Questions & Answers

1. **What is MongoDB, and how does it differ from relational databases?**

   * MongoDB is a NoSQL database that stores data in flexible, JSON-like documents, unlike relational databases that use structured tables.
   * This flexibility allows for easier scaling and handling of unstructured or semi-structured data.

2. **Describe the structure of a MongoDB document.**

   * A MongoDB document is a BSON object comprising field-value pairs, where values can be various data types, including nested documents.

3. **What are the advantages of using MongoDB over traditional RDBMS?**

   * Schema flexibility, horizontal scalability through sharding, high availability via replica sets, and efficient handling of unstructured data.

4. **What is a replica set in MongoDB?**

   * A replica set is a group of MongoDB servers that maintain the same data set, ensuring high availability through automatic failover.

5. **Explain sharding in MongoDB.**

   * Sharding is MongoDB's method of distributing data across multiple servers to handle large datasets and high-throughput operations.

6. **Differentiate between find() and aggregate() in MongoDB.**

   * find() retrieves documents based on criteria; aggregate() processes data through a pipeline for complex transformations.

7. **How does MongoDB handle indexing? and its types**
   MongoDB uses indexes to improve the speed of read operations. When a query is executed, MongoDB uses indexes to quickly locate the data instead of scanning every document in a collection.

   Types of indexes in MongoDB:

   Single field index: Created on one field.
   Compound index: Created on multiple fields.
   Multikey index: Used when indexing array fields.
   Text index: Supports text search on string fields.
   Geospatial index: Supports location-based queries.
   Hashed index: For sharding using hashed values of a field.
   TTL index: Automatically removes documents after a specified time.

8. **What is the role of the \_id field in MongoDB?Can it be modified or removed?**

   * The \_id field uniquely identifies each document in a collection; it's mandatory and immutable by default.It is mandatory and cannot be removed. However, it can be modified if necessary, though this is not recommended as it may lead to data inconsistency.

9. **How does the aggregation framework work in MongoDB?**

MongoDB's aggregation framework works like a data processing pipeline. Data flows through **a series of stages**, and each stage **transforms the data and passes the result to the next stage**.

Common stages:

* `$match`: Filters documents (like `WHERE` in SQL).
* `$group`: Groups documents and performs operations like sum, avg.
* `$sort`: Sorts the documents.
* `$project`: Selects or reshapes fields.
* `$lookup`: Joins documents from another collection.

10. How does MongoDB handle transactions, and what is the significance of multi-document transactions?**

   MongoDB supports **multi-document ACID transactions** starting from version 4.0 (for replica sets) and 4.2+ (for sharded clusters).

   * Transactions ensure **atomicity**, meaning all operations inside a transaction either succeed together or fail together.
   * **Multi-document transactions** are useful when you need to update multiple documents or collections in a consistent way (similar to relational databases).

   Although MongoDB encourages a document-based design to reduce the need for transactions, they are available when necessary.
11. How does MongoDB ensure data consistency and handle concurrency?**

   MongoDB ensures consistency and concurrency using:

   * **Document-level locking**: Only one write operation can occur on a document at a time, which allows high concurrency for reads and writes across different documents.
   * **Replica sets**: Provide data redundancy and consistency. Writes go to the primary node, and changes are replicated to secondaries.
   * **Write concerns** and **read concerns**: Let you control the level of acknowledgment and data consistency you require.

   These mechanisms ensure MongoDB remains performant while handling concurrent operations safely.


12. **What are common data modeling strategies in MongoDB?**

    * Embedding for related data accessed together; referencing for normalized data; hybrid approaches combine both based on use cases.

13. **What are TTL indexes, and when are they used?**

    * TTL (Time To Live) indexes automatically delete documents after a specified time, useful for expiring data like sessions or logs.

14. **How can you optimize MongoDB queries?**

    * Use appropriate indexes, avoid full collection scan by providing more more filters/condition for the data you looking for, limit returned fields with projections, analyze queries with explain(), and denormalize data when beneficial.

15. **How do you perform backup and restore operations in MongoDB?**

    * Use mongodump for backups and mongorestore for restoration; MongoDB Atlas offers automated backup solutions.
16. Describe the process of migrating data from an RDBMS to MongoDB.**

   Migration involves several steps:

   1. **Schema analysis**: Study the relational schema and relationships (1:1, 1\:N, N\:M).
   2. **Schema design in MongoDB**: Decide between embedding (nested) or referencing (linked collections) depending on access patterns.
   3. **Data export**: Export relational data using SQL queries, tools like `mysqldump`, or `pg_dump`.
   4. **Data transformation**: Convert tabular rows into JSON documents.
   5. **Data import**: Use `mongoimport`, custom scripts (Node.js, Python, etc.), or ETL tools to insert into MongoDB.
   6. **Validation & indexing**: Check data integrity, and apply proper indexes.

17. **What are some limitations of MongoDB, and how can they be addressed?**

    * Limitations include lack of joins (mitigated by embedding or aggregation), document size limits (use referencing), and eventual consistency (managed with appropriate read/write concerns).

18. **How does MongoDB Atlas differ from self-hosted MongoDB?**

    * MongoDB Atlas is a fully managed cloud service offering automated scaling, backups, and monitoring, reducing operational overhead compared to self-hosted setups.

19. **What is journaling in MongoDB?**

    * Journaling records write operations to a journal file, ensuring data durability and aiding in recovery after crashes.

20. **How do you handle schema versioning in MongoDB?**

    * Include a version field in documents and implement migration scripts or application logic to handle different schema versions.

21. **What is BSON in MongoDB?**

    * BSON (Binary JSON) is the binary-encoded serialization of JSON-like documents, used by MongoDB for data storage and network transfer.

    Serialization = turning objects into a format for storage/transmission.
    Binary-encoded serialization means converting a data structure (like a JSON object) into a compact binary format that computers can store or transmit efficiently — and later reconstruct (deserialize) exactly

22. **How do you update documents in MongoDB?**

    * Use updateOne(), updateMany(), or replaceOne() methods with appropriate filters and update operations.

23. **What is the default port for MongoDB, and how can it be changed?**

    * The default port is 27017; it can be changed by specifying a different port in the configuration file or command-line options.

24. **How do you drop a collection in MongoDB?**

    * Use the drop() method on the collection: db.collectionName.drop().

25. **What is the difference between update() and save() methods in MongoDB?**

    * update() modifies specific fields of existing documents; save() replaces the entire document or inserts it if it doesn't exist.
26. What is the difference between updateOne() and replaceOne() in MongoDB?

 * updateOne() modifies specific fields using operators like $set.
 * replaceOne() replaces the entire document, keeping only _id.

   db.users.updateOne({ _id: 1 }, { $set: { age: 25 } })

   db.users.replaceOne({ _id: 1 }, { name: "Alex", age: 25 })

27. **Explain the role of journaling in MongoDB. How does it help in ensuring durability?**

   Journaling is a feature of MongoDB (with WiredTiger) that ensures **durability** by writing changes to a journal file **before** applying them to the database files.

   * In case of a crash, MongoDB uses the journal to **recover to the last consistent state**.
   * It prevents data loss and corruption by replaying operations that were not yet committed to the main data files.
   * Journaling is enabled by default and is essential for write safety in MongoDB.
---