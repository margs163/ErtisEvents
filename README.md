# ErtisEvents: Personalized Event Discovery and Management Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.0+-black.svg)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-blue.svg)](https://www.prisma.io/)

<img width="1917" height="998" alt="screenshot-2025-12-19_17-40-22" src="https://github.com/user-attachments/assets/69214eab-d260-4522-a9aa-7521e4c98ccf" />
<img width="1920" height="1080" alt="screenshot-2025-12-19_17-44-03" src="https://github.com/user-attachments/assets/e9ffea3a-4a2a-484a-ab78-e97e6e92afef" />
<img width="1920" height="1080" alt="screenshot-2025-12-19_17-44-13" src="https://github.com/user-attachments/assets/aaa36065-5268-4c19-9248-86db359a7953" />
<img width="1920" height="1080" alt="screenshot-2025-12-19_17-46-26" src="https://github.com/user-attachments/assets/a311fce4-0fa5-4921-bf15-ee490355ac4c" />


## Overview

Ertis Events is a modern web application designed to connect users with exciting events in their city. It leverages AI-driven recommendations to suggest personalized events based on users' detailed interests, age, gender, and other characteristics. Users can browse, search, and receive tailored suggestions, while event organizers benefit from tools to create events, generate AI-powered posters, and promote their gatherings effectively.

The platform includes an interactive AI assistant that users can chat with for real-time event recommendations. Built with a focus on scalability, user experience, and seamless integration of AI, EventHub aims to revolutionize how people discover and engage with local events.

## Features

### For Users:
- **Event Discovery**: Browse a comprehensive list of events categorized by type (e.g., music, sports, art, food festivals).
- **Personalized Recommendations**: Input your age, gender, interests, and other preferences to get AI-curated event suggestions.
- **AI Assistant**: Chat with an intelligent bot powered by LangGraph to get on-the-fly recommendations and answers about events.
- **Search and Filters**: Advanced search with filters for location, date, category, and more.
- **User Profiles**: Save preferences, bookmark events, and track attendance history.

### For Organizers:
- **Event Creation**: Easy-to-use dashboard to create and manage events with details like description, location, date, and tickets.
- **AI Poster Generation**: Use integrated AI tools to automatically create eye-catching posters based on event details.
- **Promotion Tools**: Share events on social media, send notifications, and track RSVPs.

### General:
- **Responsive Design**: Fully mobile-friendly interface built with TailwindCSS and ShadCN UI.
- **Real-Time Updates**: Powered by TanStack Query for efficient data fetching and caching.
- **Secure Data Handling**: Validation with Zod and robust backend with Prisma ORM.

## Tech Stack

- **Frontend**: Next.js (React framework for server-side rendering and static site generation).
- **Backend**: Next.js API routes integrated with Prisma ORM for database interactions.
- **Database**: PostgreSQL managed via Prisma.
- **AI Integration**: LangGraph for building AI agents and handling recommendation logic.
- **Form Handling**: React Hook Form for efficient, performant forms.
- **Data Fetching**: TanStack Query (formerly React Query) for querying, caching, and synchronizing server state.
- **Validation**: Zod for schema declaration and validation.
- **Styling**: TailwindCSS for utility-first CSS, combined with ShadCN UI components for a polished look.
- **Deployment**: Docker for containerization, Nginx for reverse proxy and routing.

## Prerequisites

Before setting up the project, ensure you have the following installed:
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Docker (for containerized deployment)
- Yarn or npm as package manager
- An API key for any external AI services (e.g., for poster generation, if using third-party APIs like OpenAI)

## Installation

1. **Clone the Repository**:
   ```
   git clone https://github.com/your-username/eventhub.git
   cd eventhub
   ```

2. **Install Dependencies**:
   ```
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory based on `.env.example`:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/eventhub
   NEXT_PUBLIC_AI_API_KEY=your-ai-api-key
   # Add other variables as needed (e.g., for authentication, external APIs)
   ```

4. **Database Setup**:
   - Run Prisma migrations:
     ```
     npx prisma migrate dev --name init
     ```
   - Seed the database (if applicable):
     ```
     npx prisma db seed
     ```

5. **Run the Development Server**:
   ```
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Development Mode
- The app runs on port 3000 by default.
- Use the AI assistant by navigating to the chat interface and providing user preferences (age, gender, interests).
- Organizers can access the dashboard after authentication to create events.

### Building for Production
```
npm run build
npm start
```

### Testing
Add your testing setup here (e.g., using Jest or Cypress):
```
npm test
```

### AI Recommendation Logic
The AI agent uses LangGraph to process user inputs:
- Inputs: Age (integer), Gender (string), Interests (array of strings).
- Tool: `get_all_events` to fetch event IDs.
- Output: 5-9 recommended event IDs in JSON format.

For custom AI flows, refer to the LangGraph documentation integrated in the `/agents` directory.

## Deployment

### Docker Setup
1. Build the Docker image:
   ```
   docker build -t eventhub .
   ```

2. Run the container:
   ```
   docker run -p 3000:3000 -e DATABASE_URL=your-db-url eventhub
   ```

### With Nginx
- Use Docker Compose for multi-container setup (e.g., app + database + Nginx).
- Sample `docker-compose.yml`:
  ```yaml
  version: '3'
  services:
    app:
      image: eventhub
      ports:
        - "3000:3000"
      environment:
        - DATABASE_URL=postgres://user:password@db:5432/eventhub
    db:
      image: postgres:14
      environment:
        - POSTGRES_USER=user
        - POSTGRES_PASSWORD=password
        - POSTGRES_DB=eventhub
    nginx:
      image: nginx:latest
      ports:
        - "80:80"
      volumes:
        - ./nginx.conf:/etc/nginx/nginx.conf
  ```
- Configure `nginx.conf` for routing to the Next.js app.

For production deployment, consider platforms like Vercel (for Next.js), AWS, or Heroku.

## Contributing

We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## Contact

For questions or feedback, reach out to [aldanovdaniyal@gmail.com] or open an issue on GitHub.

Thank you for using ErtisEvents! 🎉
