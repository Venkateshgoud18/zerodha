require('dotenv').config();

const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");

const {HoldingsModel}=require("./model/HoldingsModel");
const {OrdersModel}=require("./model/OrdersModel");
const {PositionsModel}=require("./model/PositionsModel");

const PORT=process.env.PORT || 3002;
const uri=process.env.MONGO_URL;
const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3002"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/",authRoute);

/*app.get("/addHoldings",async(req,res)=>{
    let tempHoldings=[
        {
            name: "Reliance Industries",
            qty: 100,
            avg: 2200,
            price: 2300,
            net: "10000",
            day: "100"
          },
          {
            name: "Tata Consultancy Services",
            qty: 50,
            avg: 3500,
            price: 3400,
            net: "-5000",
            day: "-100"
          },
          {
            name: "HDFC Bank",
            qty: 200,
            avg: 1500,
            price: 1550,
            net: "10000",
            day: "200"
          },
          {
            name: "Infosys",
            qty: 120,
            avg: 1500,
            price: 1450,
            net: "-6000",
            day: "-120"
          },
          {
            name: "Axis Bank",
            qty: 80,
            avg: 700,
            price: 750,
            net: "4000",
            day: "100"
          },
          {
            name: "ICICI Bank",
            qty: 150,
            avg: 800,
            price: 850,
            net: "7500",
            day: "120"
          },
          {
            name: "State Bank of India",
            qty: 200,
            avg: 500,
            price: 510,
            net: "2000",
            day: "50"
          },
          {
            name: "Larsen & Toubro",
            qty: 100,
            avg: 1800,
            price: 1850,
            net: "5000",
            day: "150"
          },
          {
            name: "Hindustan Unilever",
            qty: 120,
            avg: 2400,
            price: 2450,
            net: "6000",
            day: "80"
          },
          {
            name: "Maruti Suzuki",
            qty: 80,
            avg: 7400,
            price: 7500,
            net: "8000",
            day: "100"
          },
          {
            name: "Bajaj Finance",
            qty: 70,
            avg: 4100,
            price: 4200,
            net: "7000",
            day: "120"
          },
          {
            name: "Bharti Airtel",
            qty: 150,
            avg: 600,
            price: 650,
            net: "7500",
            day: "100"
          },
          {
            name: "ITC Limited",
            qty: 200,
            avg: 330,
            price: 340,
            net: "2000",
            day: "40"
          },
          {
            name: "Asian Paints",
            qty: 90,
            avg: 3000,
            price: 3100,
            net: "9000",
            day: "150"
          },
          {
            name: "UltraTech Cement",
            qty: 50,
            avg: 6500,
            price: 6400,
            net: "-5000",
            day: "-100"
          },
          {
            name: "Wipro",
            qty: 200,
            avg: 400,
            price: 420,
            net: "4000",
            day: "60"
          },
          {
            name: "NTPC",
            qty: 150,
            avg: 130,
            price: 135,
            net: "750",
            day: "20"
          },
          {
            name: "Tata Motors",
            qty: 100,
            avg: 450,
            price: 460,
            net: "1000",
            day: "50"
          },
          {
            name: "IndusInd Bank",
            qty: 70,
            avg: 1400,
            price: 1450,
            net: "3500",
            day: "80"
          },
          {
            name: "Bharat Petroleum",
            qty: 180,
            avg: 400,
            price: 390,
            net: "-1800",
            day: "-60"
          },
    ];
    tempHoldings.forEach((item)=>{
        let newHoldings=new HoldingsModel({
            name:item.name,
            qty:item.qty,
            avg:item.avg,
            price:item.price,
            net:item.net,
            day:item.day,
        });
        newHoldings.save();
    });
    res.send("Done!");
});*/

/*app.get("/addOrders",async(req,res)=>{
  let tempOrders=[
    {
      name: "RELIANCE",
      qty: 0,
      price: 2550.00,
      mode: "watchList"
    },
    {
      name: "TCS",
      qty: 0,
      price: 3400.00,
      mode: "watchList"
    },
    {
      name: "INFY",
      qty: 0,
      price: 1450.00,
      mode: "watchList"
    },
    {
      name: "HDFC BANK",
      qty: 0,
      price: 1500.00,
      mode: "watchList"
    },
    {
      name: "ICICI BANK",
      qty: 0,
      price: 650.00,
      mode: "watchList"
    },
    {
      name: "BAJAJ FINANCE",
      qty: 0,
      price: 6500.00,
      mode: "watchList"
    },
    {
      name: "MARUTI",
      qty: 0,
      price: 7000.00,
      mode: "watchList"
    }
  ];
  tempOrders.forEach((item1)=>{
    let newOrders=new OrdersModel({
      name:item1.name,
      qty:item1.qty,
      price:item1.price,
      mode:item1.mode,
    });
    newOrders.save();
  });
  res.send("Done!");
  
});*/
/*app.get("/addPositions",async(req,res)=>{
  let tempPositions=[
    {
      product: "Equity",
      name: "RELIANCE",
      qty: 50,
      avg: 2500.00,
      price: 2550.00,
      net: 2500.00,
      day: 2.00,
      isLoss: false
    },
    {
      product: "Equity",
      name: "TCS",
      qty: 30,
      avg: 3200.00,
      price: 3300.00,
      net: 3000.00,
      day: 3.00,
      isLoss: false
    },
    {
      product: "Equity",
      name: "HDFC Bank",
      qty: 60,
      avg: 1800.00,
      price: 1850.00,
      net: 3000.00,
      day: 2.78,
      isLoss: false
    },
    {
      product: "Equity",
      name: "ICICI Bank",
      qty: 45,
      avg: 750.00,
      price: 770.00,
      net: 900.00,
      day: 2.67,
      isLoss: false
    },
    {
      product: "Equity",
      name: "SBI",
      qty: 80,
      avg: 500.00,
      price: 510.00,
      net: 800.00,
      day: 2.00,
      isLoss: false
    }
  ];
  tempPositions.forEach((item2)=>{
    let newPositions=new PositionsModel({
      product:item2.product,
      name:item2.name,
      qty:item2.qty,
      avg:item2.avg,
      price:item2.price,
      net:item2.net,
      day:item2.day,
      isLoss:item2.isLoss,
    });
    newPositions.save();
  });
  res.send("Done!");

});*/
app.get("/allHoldings",async(req,res)=>{
  let allHoldings=await HoldingsModel.find({});
  res.json(allHoldings);
})

app.get("/allOrders",async(req,res)=>{
  let allOrders=await OrdersModel.find({});
  res.json(allOrders);
})

app.get("/allPositions",async(req,res)=>{
  let allPositions=await PositionsModel.find({});
  res.json(allPositions);
})

app.post("/newOrder",async(req,res)=>{
  let newOrder=new OrdersModel({
    name:req.body.name,
    qty:req.body.qty,
    price:req.body.price,
    mode:req.body.mode,
  });
  newOrder.save();
  res.send("Order saved!");
})

app.listen(PORT,()=>{
    console.log("App started");
    mongoose.connect(uri);
    console.log("DB connected!");
});
