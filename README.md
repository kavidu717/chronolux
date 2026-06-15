# ⌚ Chrono Lux - Premium MERN Stack Watch E-Commerce Platform

A comprehensive, modern online watch shopping web application designed to deliver a premium user experience. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), this platform features a highly responsive interface, complex global state management, AI-curated product details, and a robust cloud-based deployment architecture.

✨ **Key Features**

* **Seamless User Experience:** A highly responsive, modern UI optimized for both desktop and mobile devices, ensuring a smooth browsing and shopping journey.
* **Predictable State Management:** Utilizes Redux to handle complex state transitions across the application, guaranteeing reliable cart management and user interactions.
* **AI-Curated Product Catalog:** Leveraged AI assistants to dynamically generate, curate, and structure highly detailed watch specifications and product descriptions.
* **Robust Cloud Architecture:** Provisioned and configured a virtual server using AWS EC2 to host the backend and frontend securely in a production environment.
* **Professional Domain Routing:** The application is mapped seamlessly to a custom GoDaddy domain (`chrono-lux.store`), providing a premium online presence.

🚀 **Tech Stack**

* **Frontend:** React.js, Redux (State Management), HTML5, CSS3, JavaScript
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Deployment & DevOps:** AWS EC2 (Ubuntu), PM2 (Process Manager), GoDaddy (Domain DNS)

📁 **Project Structure**

The project follows a clean decoupled architecture, structured perfectly for a production deployment on an AWS EC2 instance:

```text
chrono-lux/
├── backend/               # Express.js server, API routes, Controllers, Models
│   ├── config/            # Database and environment configurations
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   └── server.js          # Main backend entry point
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application screens (Home, Product, Cart, etc.)
│   │   ├
│   │   └── App.js         # Main React component
│   └── package.json       
└── README.md              # Project documentation