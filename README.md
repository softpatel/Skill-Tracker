# Skill Tracker

Skill Tracker is a web application that helps users develop new skills through AI-generated action plans and personalized feedback. You can record your progress along the way to visualize it in charts as well as receive feedback from an AI coach. You can also earn rewards like badges and trophies to encourage users and gamify their journey.

## Features

- 📊 AI-generated personalized skill development plans
- 📈 Progress tracking with visual analytics
- 🎯 Milestone-based learning paths
- 🏆 Achievement system with trophy cabinet
- 📱 Responsive design for desktop and mobile
- 🔒 Secure user authentication

## Tech Stack

### Frontend
- React (Vite)
- React Router for navigation
- TailwindCSS for styling
- Recharts for data visualization
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- OpenAI API for plan generation

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas connection)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/skill-tracker.git
cd skill-tracker
```

2. Set up the frontend:
```bash
cd frontend
npm install
```

3. Set up the backend:
```bash
cd backend
npm install
```

4. Create a `.env` file in the backend directory:
```env
PORT=5005
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

5. Start the development servers:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5005`.

## Project Structure

```
Skill-Tracker/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── contexts/    # React Context providers
│   │   ├── services/    # API and service functions
│   │   └── utils/       # Helper functions and constants
└── backend/           # Node.js backend application
    ├── src/
    │   ├── controllers/ # Route controllers
    │   ├── models/      # MongoDB models
    │   ├── routes/      # API routes
    │   └── middleware/  # Custom middleware
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.