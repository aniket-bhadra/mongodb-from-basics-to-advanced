//return posts where virat & rahul liked
db.postsAd.find({
  $and: [
    { liked: { $elemMatch: { name: "virat" } } },
    { liked: { $elemMatch: { name: "rahul" } } },
  ],
});

//return post where rohit not liked
db.postsAd.find({
  $nor: [{ liked: { $elemMatch: { name: "rohit" } } }],
});

//return the post where rohit liked
db.postsAd.find({
  liked: {
    $elemMatch: {
      name: "rohit",
    },
  },
});

//cursor methods- sort
db.cars.find({}, { _id: 0, maker: 1, model: 1 }).sort({ model: 1 });

//find the no of cars in each brand
db.cars.aggregate([
  {
    $group: {
      _id: "$model",
      totalCars: {
        $sum: 1,
      },
      amountsList: { $push: "$price" },
    },
  },
]);

//hyundai cars having engine greater than 1000cc
db.cars.aggregate([
  {
    $match: {
      maker: "Hyundai",
      "engine.cc": { $gt: 1200 },
    },
  },
]);
//with find
db.cars.find({ maker: "Hyundai", "engine.cc": { $gt: 1200 } });

//count all hyundai cars
db.cars.aggregate([
  {
    $match: { maker: "Hyundai" },
  },
  {
    $count: "total",
  },
]);

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

//show total cost of cars inside inventory
db.cars.aggregate([
  {
    $group: {
      _id: null,
      totalCost: { $sum: "$price" },
    },
  },
]);

//$sortByCount
db.cars.aggregate([
  {
    $sortByCount: "$maker",
  },
]);

//split the document based on owners
db.cars.aggregate([
  {
    $unwind: "$owners",
  },
  {
    $project: {
      _id: 0,
      owners: 1,
      model: 1,
    },
  },
]);

//print all the cars--model+maker name
db.cars.aggregate([
  {
    $project: {
      _id: 0,
      name: { $concat: ["$maker", " ", "$model"] },
    },
  },
]);

// add a flag is_diesel=true/false for each car and calculate the count
db.cars.aggregate([
  {
    $project: {
      _id: 0,
      model: 1,
      maker: 1,
      is_diesel: {
        $regexMatch: {
          input: "$fuel_type",
          regex: "Die",
        },
      },
    },
  },
  {
    $group: {
      _id: "$is_diesel",
      count: { $sum: 1 },
    },
  },
]);

//testing
db.cars.aggregate([
  {
    $project: {
      total: {
        $add: [1, 2, 3, 4, 5],
      },
    },
  },
]);

// print all the cars and their old price and newPrice with the hike of 8000
db.cars.aggregate([
  {
    $project: {
      _id: 0,
      maker: 1,
      model: 1,
      old_Price: "$price",
      new_Price: {
        $add: ["$price", 8000],
      },
    },
  },
]);

//show price in lakhs
db.cars.aggregate([
  {
    $project: {
      _id: 0,
      model: 1,
      maker: 1,
      price: 1,
    },
  },
  {
    $addFields: {
      price_in_lakhs: {
        $divide: ["$price", 100000],
      },
    },
  },
]);

//add field -category and categorize petrol & non petrol car

db.cars.aggregate([
  {
    $project: {
      _id: 0,
      maker: 1,
      model: 1,
      category: {
        $cond: {
          if: { $eq: ["$fuel_type", "Petrol"] },
          then: "Petrol Car",
          else: "Non Petrol Car",
        },
      },
    },
  },
]);

//add field -category and categorize petrol & electric & diesel car
db.cars.aggregate([
  {
    $project: {
      _id: 0,
      model: 1,
      category: {
        $cond: {
          if: { $eq: ["$fuel_type", "Petrol"] },
          then: "Petrol Car",
          else: {
            $cond: {
              if: { $eq: ["$fuel_type", "Diesel"] },
              then: "Diesel Car",
              else: "Electric Car",
            },
          },
        },
      },
    },
  },
]);

//same with $switch
db.cars.aggregate([
  {
    $project: {
      _id: 0,
      maker: 1,
      category: {
        $switch: {
          branches: [
            {
              case: { $eq: ["$fuel_type", "Petrol"] },
              then: "Petrol Car",
            },
            {
              case: { $eq: ["$fuel_type", "Diesel"] },
              then: "Diesel Car",
            },
            {
              case: { $eq: ["$fuel_type", "Electric"] },
              then: "Electric Car",
            },
            {
              case: { $eq: ["$fuel_type", "CNG"] },
              then: "CNG Car",
            },
          ],
          default: "Unknown",
        },
      },
    },
  },
]);

//create a category based on budget with price field - lakh
db.cars.aggregate([
  {
    $project: {
      _id: 0,
      model: 1,
      price: {
        $concat: [
          {
            $toString: {
              $divide: ["$price", 100000],
            },
          },
          "Lakhs",
        ],
      },
      category: {
        $switch: {
          branches: [
            {
              case: { $lte: ["$price", 500000] },
              then: "Budget",
            },
            {
              case: {
                $and: [
                  {
                    $gte: ["$price", 500000],
                  },
                  {
                    $lte: ["$price", 1200000],
                  },
                ],
              },
              then: "Mid Range",
            },
            {
              case: {
                $and: [
                  {
                    $gte: ["$price", 1200000],
                  },
                  {
                    $lte: ["$price", 3000000],
                  },
                ],
              },
              then: "Semi Premium",
            },
          ],
          default: "Premium",
        },
      },
    },
  },
]);

//variables
db.cars.aggregate([
  {
    $project: {
      _id: 0,
      date: "$$NOW",
    },
  },
]);

//practice--budget category again
db.cars.aggregate([
  {
    $project: {
      _id: 0,
      model: 1,
      price: {
        $concat: [
          {
            $toString: {
              $round: {
                $divide: ["$price", 100000],
              },
            },
          },
          " ",
          "Lakhs",
        ],
      },
      category: {
        $switch: {
          branches: [
            {
              case: { $lte: ["$price", 1000000] },
              then: "Budget Car",
            },
            {
              case: {
                $and: [
                  { $gte: ["$price", 1100000] },
                  { $lte: ["$price", 1800000] },
                ],
              },
              then: "Mid-Range Car",
            },
            {
              case: { $gte: ["$price", 1900000] },
              then: "Premium Car",
            },
          ],
          default: "Super Premium Car",
        },
      },
    },
  },
]);

//joins
db.users.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "user_id",
      as: "orders",
    },
  },
  {
    $out:"all"
  }
]);

db.orders.aggregate([
  {$lookup:{
    from:"users",
    localField: "user_id",
    foreignField:"_id",
    as: "users"
  }}
])

