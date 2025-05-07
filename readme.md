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

**Remote server:**

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
Yes, your summary is **correct and well-structured**. Just a minor tweak for full clarity:

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



---
### show databases
show dbs

show collection

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
the methods you use in MongoDB shell (like find(), insertMany(), findOne()) are similar to those in Mongoose, but Mongoose adds additional features like schema validation, middleware, and more.

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

add a value on array filed
```shell
db.cars.updateOne( { model:"City", }, { $push:{ features:"Heated seats" }} )
```
delete a value on array field
```shell
db.cars.updateOne( { model:"City", }, { $pull:{ features:"Heated seats" }} )
```

```shell
db.cars.updateMany( { fuel_type: "Diesel" }, { $set: { alloys: "yes" } } )
```
update all documents matching this fuel_type

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
mongoDB stroes data in BSON (binary json) format
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
$in is not range, it give me documetn which exactly matches any of the value
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

element operators
#exists, $type

# $exist
db.cars.find( { color: { $exists: true } } )
whichever document has color field, return those

# $type
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

$match
Hyundai cars having engine of more than 1200cc


db.cars.aggregate(

               [{$match:

                       {maker:"Hyundai",

                        "engine.cc":{$gt:1000}

                 }}])

we can achve this with find, but the problem with find is , with find we can use multple stages we  can use multple conditon but not multiple stages that is $match is used here,ex- if have to match with something and then need to group that is in such cases aggrete framework is used instead of find, beucase in find we can give multple conditn after that we can group or use other aggre things,so if only matching with cndtion then find can be used but if after matching we need to perfrom some more advanced opertion, in thse cases aggrete should be used  

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


count no of diesel & petrol cars of hyundai
db.cars.aggregate(
[
   {
      $match:{maker:"Hyundai"}
   },
   {
      $group:{
         _id:"$fuel_type",
         totalCars:{$sum:1},
      }
   }
]
)
see thing can not be achved with find, that is why for this kind of opertion aggrete shold used not find

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

so what is pipline then?

string operators
$concat
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

toUpper
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

$regexMatch
styntax-{
  $regexMatch:{
      input:which field we want to check,
     regex: the pattern that we are checking
      i: the option for mathicng the pattern
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

$add   $subtract  $divide  $multiply  $round $abs   $ceil
$add

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

find or aggregate the end results comes as an array

addFields/set
To add temporary fields, use either `$project` or `$addFields` — but if the field needs to be reused in later stages, **only `$addFields`** works; fields added in `$project` **can’t** be used in the next stage.

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

Conditional Operators

$cond   $ifNull   $switch

$cond

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


varibles
system varibles
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

user defined varibles
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
in cli we can create varible and can use it-
my_price=1500000
db.cars.find({ price: my_price })


hydui={maker:"Hyundai"}
 db.cars.find(hydui)

 

Object.keys(this)
It shows all functions and global variables in the current database context,


###data modeling
MongoDB is a NoSQL database, it doesn't
enforce strict schema relationships like foreign
keys in relational databases.
but still we can model relationships between documents in
MongoDB using a few approaches. 


The two main types of relationships are:


Embedded Documents (Denormalization)

Referenced Documents (Normalization)

how can we maintain relationship in mongoDB
let say users and orders
1 to many-

embeded documents


Normalization is the process of storing data in its corresponding table or collection to prevent duplication and redundancy and to better manage the data. It involves breaking down data into smaller, logical parts and putting them into their own proper place. In SQL, you store related data in separate tables and link them using foreign keys. In NoSQL, you store related data in separate collections and reference them with IDs from other collections. This way, you keep data clean, reduce repetition, and make updates easier and safer.
ex-
 storing customer data in its own "customer" table/collection and order data in its own "order" table/collection. These two are then linked by referencing the customer's primary key (PK) in the order table (SQL) or the customer ID in the order collection (NoSQL).

---


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


