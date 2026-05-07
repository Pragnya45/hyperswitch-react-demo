const express = require("express");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

const path = require("path");

const app = express();
const PORT = process.env.PORT || 5252;

const API_KEY = process.env.HYPERSWITCH_SECRET_KEY;
const HYPERSWITCH_URL = process.env.HYPERSWITCH_SERVER_URL;

if (!API_KEY || !HYPERSWITCH_URL) {
  throw new Error(
    "Missing API Key or Server URL. Please check your .env file."
  );
}

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());

app.get("/config", (req, res) => {
  res.json({
    publishableKey: process.env.HYPERSWITCH_PUBLISHABLE_KEY,
  });
});

async function createPaymentIntent(request) {
  try {
    const apiResponse = await fetch(`${HYPERSWITCH_URL}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": API_KEY,
      },
      body: JSON.stringify(request),
    });

    const paymentIntent = await apiResponse.json();

    if (paymentIntent.error) {
      throw new Error(paymentIntent?.error?.message ?? "Something went wrong.");
    }

    return paymentIntent;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
}

function createPaymentRequest() {
  let paymentData = {
    currency: "INR",
    amount: 100,
    customer_id: "demo_app_id2",
    email: "hyperswitch_sdk_demo_id@gmail.com",
    description: "Hello, this is a description",
    shipping: {
      address: {
        line1: "123, MG Road",
        line2: "Bandra",
        city: "Mumbai",
        state: "Maharashtra",
        zip: "400050",
        country: "IN",
        first_name: "Joseph",
        last_name: "Doe",
      },
      phone: {
        number: "8056594427",
        country_code: "+91",
      },
    },
    metadata: {
      udf1: "value1",
      new_customer: "true",
      login_date: "2019-09-10T10:11:12Z",
    },
    billing: {
      address: {
        line1: "123, MG Road",
        line2: "Bandra",
        city: "Mumbai",
        state: "Maharashtra",
        zip: "400050",
        country: "IN",
        first_name: "Joseph",
        last_name: "Doe",
      },
      phone: {
        number: "8056594427",
        country_code: "+91",
      },
    },
  };

  const profileId = process.env.PROFILE_ID;
  if (profileId) {
    paymentData.profile_id = profileId;
  }

  return paymentData;
}

app.post("/create-payment-intent", async (_, res) => {
  try {
    const paymentRequest = createPaymentRequest();
    const paymentIntent = await createPaymentIntent(paymentRequest);

    res.send({
      clientSecret: paymentIntent?.client_secret,
    });
  } catch (err) {
    console.log("Catch", err);
    res.status(500).send({
      error: { message: err.message },
    });
  }
});

// Catch-all route to serve the React app for any other requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Node server listening at http://localhost:${PORT}`);
});
