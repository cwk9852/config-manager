# Config Manger Application

## Overview

The config-manager is a web-based system designed to manage configuration items and generate service request documents based on templates. This application consists of a frontend built with Angular and a backend using Express.js.

### Features

- Configuration Item Management: Add, update, and delete configuration items.
- Service Request Template Management: Add, update, and delete service request templates with conditions.
- Document Generation: Generate service request documents based on templates and selected conditions.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js and npm: Make sure you have Node.js and npm (Node Package Manager) installed on your system.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/service-request-app.git
   cd service-request-app
   ```

2. Install dependencies for the backend (Express.js):

   ```bash
   cd backend
   npm install
   ```

3. Install dependencies for the frontend (Angular):

   ```bash
   cd ../frontend
   npm install
   ```

## Usage

### Running the Application

1. Start the Express.js backend:

   ```bash
   cd backend
   node server.js
   ```

   The backend will run on `http://localhost:3000`.

2. Start the Angular frontend:

   ```bash
   cd ../frontend
   ng serve
   ```

   The frontend will be accessible at `http://localhost:4200`.

3. Open a web browser and navigate to `http://localhost:4200` to access the Service Request Application.

## API Endpoints

- Configuration Item Management:

  - `GET /config-items`: Retrieve all configuration items.
  - `POST /config-items`: Create a new configuration item.
  - `PUT /config-items/:id`: Update an existing configuration item.
  - `DELETE /config-items/:id`: Delete a configuration item by ID.

- Service Request Template Management:

  - `GET /templates`: Retrieve all service request templates.
  - `POST /templates`: Create a new service request template.
  - `PUT /templates/:id`: Update an existing service request template.
  - `DELETE /templates/:id`: Delete a service request template by ID.

- Document Generation:

  - `POST /generate-document`: Generate a service request document based on selected templates and conditions.

## Contributing

We welcome contributions from the community. If you'd like to contribute to this project, please follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

Please replace `yourusername` with your GitHub username and adapt the file paths and instructions to match your project's structure. Additionally, you can include any other relevant information or sections that you think would benefit your users and contributors.