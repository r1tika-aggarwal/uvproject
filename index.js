// update gotta do : option for lat and long for exact response 
// my home location presaved
// others option like for more preciseness enter latitude longitutde
// use env file and upload on github

import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from 'dotenv';
const port = 3107;
const app = express();

app.use(express.static("public"));

const addressjson = [{"Andaman and Nicobar Islands":{"Latitude":"11.7401","Longitude":"92.6586"},"Andhra Pradesh":{"Latitude":"15.9129","Longitude":"79.7399"},"Arunachal Pradesh":{"Latitude":"27.1004","Longitude":"93.6167"},"Assam":{"Latitude":"26.2006","Longitude":"92.9376"},"Bihar":{"Latitude":"25.0961","Longitude":"85.3131"},"Chandigarh":{"Latitude":"30.7333","Longitude":"76.7794"},"Chhattisgarh":{"Latitude":"21.2787","Longitude":"81.8661"},"Dadra and Nagar Haveli":{"Latitude":"20.2764","Longitude":"73.0088"},"Daman":{"Latitude":"20.3974","Longitude":"72.8328"},"Delhi":{"Latitude":"28.6139","Longitude":"77.2090"},"Goa":{"Latitude":"15.2993","Longitude":"74.1240"},"Gujarat":{"Latitude":"22.2587","Longitude":"71.1924"},"Haryana":{"Latitude":"29.0588","Longitude":"76.0856"},"Himachal Pradesh":{"Latitude":"31.1048","Longitude":"77.1734"},"Jharkhand":{"Latitude":"23.6102","Longitude":"85.2799"},"Jammu":{"Latitude":"32.7266","Longitude":"74.8570"},"Karnataka":{"Latitude":"15.3173","Longitude":"75.7139"},"Kerala":{"Latitude":"10.8505","Longitude":"76.2711"},"Lakshadweep":{"Latitude":"10.3280","Longitude":"72.7846"},"Ladakh":{"Latitude":"34.1641","Longitude":"77.5848"},"Madhya Pradesh":{"Latitude":"22.9734","Longitude":"78.6569"},"Maharashtra":{"Latitude":"19.7515","Longitude":"75.7139"},"Manipur":{"Latitude":"24.6637","Longitude":"93.9063"},"Meghalaya":{"Latitude":"25.4670","Longitude":"91.3662"},"Mizoram":{"Latitude":"23.6850","Longitude":"92.9359"},"Nagaland":{"Latitude":"26.1584","Longitude":"94.5624"},"Odisha":{"Latitude":"20.9517","Longitude":"85.0985"},"Punjab":{"Latitude":"31.1471","Longitude":"75.3412"},"Puducherry":{"Latitude":"11.9416","Longitude":"79.8083"},"Rajasthan":{"Latitude":"27.0238","Longitude":"74.2179"},"Sikkim":{"Latitude":"27.5330","Longitude":"88.6180"},"Srinagar":{"Latitude":"34.0837","Longitude":"74.7973"},"Tamil Nadu":{"Latitude":"11.1271","Longitude":"78.6569"},"Telangana":{"Latitude":"18.1124","Longitude":"79.0193"},"Tripura":{"Latitude":"23.9408","Longitude":"91.9882"},"Uttar Pradesh":{"Latitude":"26.8467","Longitude":"80.9462"},"Uttarakhand":{"Latitude":"30.0668","Longitude":"79.0193"},"West Bengal":{"Latitude":"22.9868","Longitude":"87.8550"}}];

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/",(req,res) => {
    res.render("home.ejs")
});

app.get("/uv", (req, res) => {
    res.render("uv.ejs");
  });

app.post("/uvfs", async (req,res) => {
    const location = req.body.state;
    const address = addressjson;
    // Check if the location exists in the address object
    if (address[0][location]) {
      const userlat = address[0][location].Latitude;
      const userlong = address[0][location].Longitude;
    
        try {
          dotenv.config();
          const result = await axios.get("https://api.openuv.io/api/v1/uv", {
            params: {
             lat: userlat,
             lng: userlong,
            },
            headers: {
             'x-access-token': process.env.KEY,
             'Content-Type': 'application/json',
            }
        });
           res.render("uv.ejs", { uvindex: JSON.stringify(result.data.result.uv), location:location });
           console.log(location);
      } catch (error) {
           res.status(404).send(error.message);
      }
    } else {
      res.status(404).send("Location not found in address data.");
    }
   });

app.get("/ozone",(req,res) => {
    res.render("ozone.ejs")
});

app.post("/ozoneknow", async (req,res) => {
    const location = req.body.state;
    const address = addressjson;
    // Check if the location exists in the address object
    if (address[0][location]) {
      const userlat = address[0][location].Latitude;
      const userlong = address[0][location].Longitude;
    
        try {
          dotenv.config();
          const result = await axios.get("https://api.openuv.io/api/v1/uv", {
            params: {
             lat: userlat,
             lng: userlong,
            },
            headers: {
             'x-access-token': process.env.KEY,
             'Content-Type': 'application/json',
            }
        });
           res.render("ozone.ejs", { ozonecont: JSON.stringify(result.data.result.ozone), location:location });
           console.log(location);
      } catch (error) {
           res.status(404).send(error.message);
      }
    } else {
      res.status(404).send("Location not found in address data.");
    }
});

app.get("/contact",(req,res) => {
    res.render("contact.ejs")
});

app.listen(port,() => {
    console.log("Server is listening on ",port);
});