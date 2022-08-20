# sih-backend

<div style="text-align: right">

[Go to Backend <kbd>&uarr;</kbd>](#backend)
</div>
In the Backend we have various components as listed below and have built it in a very robust way to provide efficient Routing *Dynamic Visualizations* like *Charts or Graphs* Based on various *Statistical Data or Parameters* related to the Education System. 

<br>

The Technologies used to build Backend are:-
- MongoDB Atlas
- Mongoose
- Express
- CORS Policy

<br>

# Backend Documentation

**API Base URL**: **https://mighty-spire-15674.herokuapp.com/**

## Dependencies

 - express
 - mongoose
 - dotenv
 - JsonWebToken
 - cors
 - Joi
 - multer
 - CsvtoJson

For user authentication there are two routes:
 - [register](https://mighty-spire-15674.herokuapp.com/register) 
 - [login](https://mighty-spire-15674.herokuapp.com/login)

Endpoints can be hit like this:
 - https://mighty-spire-15674.herokuapp.com/register 
 - https://mighty-spire-15674.herokuapp.com/login

<br>

For JWT authentication, user request body will be:

    {
	    name: string,
	    email: string,
	    password: string,
    }
    
 <br>

If JWT failed and user is not valid then error responses are as such:

    res.status(400).json({
	    auth: false,
	    id: null,
	    errMsg: "User is not valid"
    });

<br>

If user is valid but JWT token failed to be verified, then error response:

    res.status(400).send('Invalid Token');

<br>

If JWT succeeded and a JWT token is generated, success response as such:

    res.status(200).header('auth-token', token).json({
	    auth: true,
	    id: currentuser._id,
	    errMsg: null
    });

<br>

After login, user has two kinds of routes to navigate to:

 - State-data (Data which is sorted state-wise)
 - Historic-data (Nation-wise data)

For state-data, we have the following routes

 - [Dropout-state rate](https://mighty-spire-15674.herokuapp.com/state-data/dropout-rate/)
 - [Literacy-state rate](https://mighty-spire-15674.herokuapp.com/state-data/literacy-rate/)
 - [Pass-fail-state rate](https://mighty-spire-15674.herokuapp.com/state-data/pass-fail-rate/)
 - [Enrollment-state rate](https://mighty-spire-15674.herokuapp.com/state-data/enrollment-rate/)

Similarly for historic data we have:

 - [Dropout-rate](https://mighty-spire-15674.herokuapp.com/historic-data/dropout-rate/)
 - [Literacy-rate](https://mighty-spire-15674.herokuapp.com/historic-data/literacy-rate/)
 - [Pass-fail-rate](https://mighty-spire-15674.herokuapp.com/historic-data/pass-fail-rate/)
 - [Enrollment-rate](https://mighty-spire-15674.herokuapp.com/historic-data/enrollment-rate/)

For state-data routes, required parameters are:

    { year: 2012 }    // 2000-2022

<br>

For historic-data, required parameters are:

    {
      "from": 2000,
      "to": 2022,
      "state": "Telangana",  // Optional
      "standard": "prim"     // ["prim" or "second" or "tech"]
    }

If state is not mentioned in the payload, the result will be fetched choosing Telangana as state.

<br>

For state data, the response will be as such:

    "prim": {
        "Andhra Pradesh": {
          "boys": 94.99310018314823,
          "girls": 118.30858281766072,
          "year": 2003
        },
        "Arunachal Pradesh": {
          "boys": 118.09231171110062,
          "girls": 131.3037404087724,
          "year": 2003
        },
        .
        .
        .
        .
    },
    "second": {
        "Andhra Pradesh": {
          "boys": 149.1500511133867,
          "girls": 112.12740911347281,
          "year": 2003
        },
        "Arunachal Pradesh": {
          "boys": 87.48342421039635,
          "girls": 96.82385887484756,
          "year": 2003
        },
        .
        .
        .
    },
    "tech": {
        "Andhra Pradesh": {
          "boys": 122.07672440191321,
          "girls": 142.58155703087033,
          "year": 2003
        },
        "Arunachal Pradesh": {
          "boys": 99.5942711237684,
          "girls": 118.53249748432572,
          "year": 2003
        },
        .
        .
        .
     }

<br>

For historic-data, the response will be:

    {
      "boys": [
        123.83873646297039
      ],
      "girls": [
        120.2546346731755
      ]
    }
    
<br>

There is a route called `upload-csv` to upload data from CSV files to MongoDB database.
It is a dynamic route and it can be accessed as:

 - https://mighty-spire-15674.herokuapp.com/:collection-name

Here `collection-name` decides the MongoDB collection where the data is being uploaded to.

<br>

If the `collection-name` does not match with any of the collections in MongoDB, then response error is as such:

    res.status(404).json({ error: "route does not exist" }); 

This is route takes a `.csv` file as request parameter.

<br>

If any other type of file is sent from client other than `.csv` the following is error is the response:

    res.status(401).json({ error: "file type unsupported" });

<br> 

If the data in CSV-file is not valid or does not contain all the necessary attributes:

    res.status(401).json({ error: "invald headers" });

<br> 

In case of any Database failure:

    res.status(500).json({ error: `DB Insert fail ${error.toString()}` }) 

<br> 

If the requested data is valid and data insertion was successful, then success response:

    res.json({ message: `Inserted ${x} rows in ${y} collection` });

Uploaded file will be deleted immediately after completion of the operation and response is sent.



