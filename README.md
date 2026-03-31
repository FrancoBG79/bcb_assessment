# BCB Assessment

A full-stack application with a NestJS API backend and Angular frontend for managing blockchain transactions.

## Project Structure

```
bcb_assessment/
├── api/                    # NestJS backend
│   ├── src/
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   ├── main.ts
│   │   └── transactions/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── web/                    # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   ├── environments/
│   │   └── main.ts
│   ├── package.json
│   ├── angular.json
│   └── tsconfig.json
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd bcb_assessment
```

### 2. Install API dependencies

```bash
cd api
npm install
```

### 3. Install Web dependencies

```bash
cd ../web
npm install
```

## Environment Setup

### API Environment Variables

Copy the example environment file and configure it:

```bash
cd api
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=3000
CORS_ORIGIN=http://localhost:4200
```

## Running the Application

### Development Mode

#### Start the API (Backend)

```bash
cd api
npm run start:dev
```

The API will be available at `http://localhost:3000`

#### Start the Web App (Frontend)

In a new terminal:

```bash
cd web
npm start
```

The web application will be available at `http://localhost:4200`

### Production Mode

#### Build and run the API

```bash
cd api
npm run build
npm run start:prod
```

#### Build and serve the Web App

```bash
cd web
npm run build
# Serve the dist folder using your preferred web server
```

## API Endpoints

- `GET /transactions` - Get all transactions
- `GET /transactions/:id` - Get transaction by ID
- `PUT /transactions/:id` - Update transaction stage

## Features

### Backend (NestJS)
- RESTful API with proper validation
- CORS enabled for frontend communication
- Error handling with appropriate HTTP status codes
- CSV data parsing and processing
- Transaction stage management

### Frontend (Angular)
- Material Design UI components
- Transaction table with sorting and pagination
- Real-time filtering
- Transaction history dialog
- Step-by-step transaction progression
- Responsive design

## Development

### API Development

```bash
cd api
# Run in watch mode
npm run start:dev

# Run tests
npm run test

# Run linting
npm run lint
```

### Web Development

```bash
cd web
# Run in development mode
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Technologies Used

### Backend
- **NestJS** - Node.js framework
- **TypeScript** - Type safety
- **class-validator** - Input validation
- **csv-parser** - CSV file processing

### Frontend
- **Angular** - Web framework
- **Angular Material** - UI components
- **RxJS** - Reactive programming
- **ngx-toastr** - Toast notifications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

This project is licensed under the UNLICENSED License.