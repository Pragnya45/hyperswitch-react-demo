
# Hyperswitch React Demo App

This project demonstrates how to accept payments in a React application using the Hyperswitch Payment Element. It provides a clean, simple implementation using the Hyperswitch React SDK and an Express backend.

---

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [How It Works](#how-it-works)
- [API Endpoints](#api-endpoints)
- [Additional Resources](#additional-resources)

---

## Overview

This demo includes a standalone React frontend and an Express backend. The frontend interacts with the backend to create a payment intent and initialize the Hyperswitch Payment Element. The frontend runs on port `4242` and the backend runs on port `5252`.

> 🔔 **Note**: The frontend depends on the backend for all API interactions.

---

## Prerequisites

Ensure the following are installed and configured:

- Node.js and npm
- A Hyperswitch account with your **Secret** and **Publishable** API keys

---

## Project Structure

```
hyperswitch-react-demo-app/
├── public/              # Static files
├── src/                 # React frontend source code
│   ├── App.js           # Main application component
│   ├── CheckoutForm.js  # Payment form component
│   ├── Payment.js       # Payment processing logic
│   ├── Completion.js    # Payment completion page
│   └── index.js         # Application entry point
├── server.js            # Express backend server
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```

---

## Installation

Install dependencies:
```bash
npm install
```

---

## Configuration

1. Create a `.env` file in the root directory with the following variables:
```env
HYPERSWITCH_SECRET_KEY=your_secret_key
HYPERSWITCH_PUBLISHABLE_KEY=your_publishable_key
HYPERSWITCH_SERVER_URL=your_server_url
```

These environment variables are essential for the application to work:
- `HYPERSWITCH_SECRET_KEY`: Your Hyperswitch secret key for backend operations
- `HYPERSWITCH_PUBLISHABLE_KEY`: Your Hyperswitch publishable key for frontend initialization
- `HYPERSWITCH_SERVER_URL`: The Hyperswitch API server URL

---

## Running the Application

The application consists of two parts: the React frontend and the Express backend. Both can be started simultaneously using:

```bash
npm start
```

This will start:
- Frontend server on http://localhost:4242
- Backend server on http://localhost:5252

To run them separately:
- Frontend only: `npm run start-client`
- Backend only: `npm run start-server`

---

## How It Works

1. **Frontend Implementation**
   - `App.js`: Main application component that handles routing
   - `Payment.js`: Initializes the Hyperswitch payment element
   - `CheckoutForm.js`: Handles payment form submission and validation
   - `Completion.js`: Displays payment completion status

2. **Backend Implementation (`server.js`)**
   - Handles payment intent creation with a sample amount of $65.00
   - Manages customer information and metadata
   - Provides secure communication with Hyperswitch API
   - Implements necessary endpoints for frontend integration

3. **Payment Flow**
   - User enters payment details in the payment form
   - Frontend creates a payment intent through the backend
   - Payment is processed using Hyperswitch's secure payment element
   - User is redirected to the completion page after payment

---

## API Endpoints

1. **GET /config**
   - Returns the Hyperswitch publishable key
   - Used for initializing the payment element
   - No authentication required

2. **POST /create-payment-intent**
   - Creates a new payment intent
   - Includes customer information and payment details
   - Returns a client secret for payment processing
   - Requires server-side API key

---

## Additional Resources

- [Hyperswitch Documentation](https://docs.hyperswitch.io/)
- [Join Hyperswitch Slack Community](https://inviter.co/hyperswitch-slack)
