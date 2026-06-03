Markdown
# 🍳 FlavorCast

FlavorCast is an AI-powered smart pantry full-stack application. Simply input the ingredients you currently have in your kitchen, and the app leverages Google's Gemini AI to generate custom, creative, step-by-step recipes on the spot.

## 🚀 Tech Stack

* **Frontend:** React (scaffolded with Vite), Axios
* **Backend:** Java 21, Spring Boot 3.3.x, Spring Data JPA
* **AI Integration:** Spring AI (Google Gemini GenAI)
* **Database:** PostgreSQL (via Docker)

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:
* [Java 21](https://adoptium.net/)
* [Node.js](https://nodejs.org/) (v18 or higher)
* [Docker](https://www.docker.com/) (for running the database)
* A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

## 🛠️ Local Development Setup

Follow these steps to get the application running locally.

### 1. Start the Database
Spin up a local PostgreSQL instance using Docker. Run this command in your terminal:
```bash
docker run --name flavorcast-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=flavorcast -p 5432:5432 -d postgres:15
```
2. Configure & Run the Backend (Spring Boot)
Open a new terminal window, navigate to your Spring Boot backend directory, and set your Gemini API key as an environment variable:

Mac/Linux:

Bash
```
export GEMINI_API_KEY="your_api_key_here"
```
Windows (PowerShell):

PowerShell
```
$env:GEMINI_API_KEY="your_api_key_here"
```
Then, run the Spring Boot application (it will start on port 8080):

Bash
```
./mvnw spring-boot:run
```
(If you are using an IDE like IntelliJ or VS Code, you can add the environment variable to your Run Configuration and start it directly from there).

3. Configure & Run the Frontend (React)
Open a third terminal window and navigate to your flavorcast-ui directory. Install the dependencies and start the Vite development server:

Bash
```
cd flavorcast-ui
npm install
npm run dev
```
The React app will typically start on http://localhost:5173.


💡 Usage
Open the frontend URL in your browser.

Type an ingredient (e.g., "Penne Pasta", "Chicken", "Coconut Milk") into the input field and click Add.

Once you have populated your digital pantry, click Generate AI Recipe.

Wait a few seconds while Spring AI communicates with Gemini, and enjoy your custom recipe!
