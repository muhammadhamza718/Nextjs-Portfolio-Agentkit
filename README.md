# Next.js Portfolio Agentkit

This repository contains a sophisticated web application designed to showcase a professional portfolio through an interactive AI agent. It features a Next.js frontend powered by ChatKit UI for a dynamic chat experience, a FastAPI backend that leverages the OpenAI Agent SDK to process queries, and Sanity CMS for managing and serving portfolio data. The system is built for real-time interaction, efficient data retrieval, and secure operations.

## ✨ Features

*   **Interactive AI Agent**: Engage with an AI agent capable of answering questions about the portfolio's profile, skills, projects, and experience.
*   **Multiple Personality Modes**: Interact with the agent in "crisp", "clear", or "chatty" modes to tailor the conversation style.
*   **Real-time Chat Interface**: Built with ChatKit UI, offering a modern and responsive chat experience with streaming responses.
*   **Sanity CMS Integration**: All portfolio data is managed and served from Sanity.io, ensuring a single source of truth and easy content updates.
*   **Server-Sent Events (SSE)**: Provides real-time streaming of AI responses to the frontend for a seamless user experience.
*   **Tool-based Data Access**: The AI agent uses defined tools with GROQ queries to securely and efficiently retrieve specific data from Sanity CMS.
*   **Conversation History Management**: Utilizes SQLite for managing and retrieving chat session history.
*   **Robust Backend**: Developed with FastAPI, featuring session management, rate limiting, and structured logging.
*   **Security & Performance**: Includes GROQ query validation, rate limiting, Sanity CDN utilization, and optimized GROQ queries.
*   **Docker Support**: The backend is containerized for easy deployment.

## 🚀 Tech Stack

### Frontend
*   **Framework**: Next.js
*   **UI**: React, Tailwind CSS
*   **State Management**: N/A (implied by Next.js/React patterns)
*   **CMS Integration**: Sanity.io client, `next-sanity`
*   **Authentication**: Clerk
*   **Chat UI**: `@openai/chatkit-react`
*   **Styling**: `class-variance-authority`, `clsx`, `styled-components` (for Sanity studio)
*   **Animation**: `framer-motion`, `motion`, `tw-animate-css`

### Backend
*   **Framework**: FastAPI
*   **Language**: Python
*   **AI Agent**: OpenAI Agent SDK, `openai-agents`
*   **Database**: SQLite (for session management)
*   **Web Server**: Uvicorn
*   **Environment Management**: `python-dotenv`, `python-decouple`
*   **Data Validation**: Pydantic
*   **HTTP Client**: `httpx`
*   **Logging**: `rich`
*   **AI Models**: `openai`, `google-generativeai` (optional)
*   **ChatKit Backend**: `chatkit-py`

### Content Management System
*   **Headless CMS**: Sanity.io

### Deployment
*   **Containerization**: Docker

## ⚙️ Installation

To set up and run this project, you'll need the following installed:

*   Node.js (v18 or higher)
*   npm or pnpm (recommended)
*   Python (v3.9 or higher)
*   pip
*   Git
*   Docker (optional, for backend containerization)

### 1. Clone the Repository

```bash
git clone https://github.com/muhammadhamza718/Nextjs-Portfolio-Agentkit.git
cd Nextjs-Portfolio-Agentkit
```

### 2. Frontend Setup (01_Frontend)

Navigate to the frontend directory:

```bash
cd 01_Frontend
```

Install dependencies:

```bash
pnpm install # Or npm install / yarn install
```

Configure environment variables. Create a `.env.local` file by copying `.env.example` and fill in your Sanity, Clerk, and OpenAI API keys:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="your_dataset"
SANITY_API_TOKEN=skSANITY_API_TOKEN_PLACEHOLDER
SANITY_SERVER_API_TOKEN=skSANITY_SERVER_TOKEN_PLACEHOLDER
SANITY_VIEWER_TOKEN=skSANITY_VIEWER_TOKEN_PLACEHOLDER
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3000/studio
SANITY_STUDIO_PREVIEW_ORIGIN=http://localhost:3000/studio

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY=sk_test_YOUR_CLERK_SECRET_KEY

# OpenAI
OPENAI_API_KEY=sk-proj-YOUR_OPENAI_API_KEY
NEXT_PUBLIC_CHATKIT_WORKFLOW_ID=wf_YOUR_CHATKIT_WORKFLOW_ID
```

### 3. Backend Setup (02_Backend)

Open a new terminal and navigate to the backend directory:

```bash
cd ../02_Backend
```

Create a Python virtual environment and activate it:

```bash
python -m venv venv
source venv/bin/activate # On Windows: .\venv\Scripts\activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Configure environment variables. Create a `.env` file in this directory and add the necessary API keys and configurations. These will likely mirror the `SANITY_API_TOKEN`, `OPENAI_API_KEY`, and potentially `CLERK_SECRET_KEY` from your frontend `.env.local`, as the backend needs to interact with Sanity and OpenAI:

```
# Example .env for Backend
SANITY_API_TOKEN="your_sanity_api_token"
SANITY_SERVER_API_TOKEN="your_sanity_server_token"
OPENAI_API_KEY="your_openai_api_key"
CLERK_SECRET_KEY="your_clerk_secret_key" # If authentication is handled on backend
```

### 4. Sanity CMS Setup

1.  Go to [Sanity.io](https://www.sanity.io/) and create a new project.
2.  Follow the instructions on `01_Frontend/SANITY-DATA-IMPORT.md` to set up your Sanity studio and import initial data.
3.  Ensure your Sanity project ID, dataset, and API tokens are correctly configured in both frontend `.env.local` and backend `.env` files.

## 🏃‍♀️ Usage

### 1. Start the Backend Server

From the `02_Backend` directory (with your virtual environment activated):

```bash
uvicorn main:app --host 0.0.0.0 --port 7860 --reload
```
The `--reload` flag is optional but useful for development. The backend will be accessible at `http://localhost:7860`.

### 2. Start the Frontend Development Server

From the `01_Frontend` directory:

```bash
pnpm dev # Or npm run dev
```
The frontend will be accessible at `http://localhost:3000`.

Open your browser and navigate to `http://localhost:3000`. You can now interact with the AI agent by typing messages in the chat interface. Experiment with different personality modes (if exposed in the UI or via direct API calls if you're developing against it).

### Running Backend with Docker (Optional)

From the `02_Backend` directory:

Build the Docker image:

```bash
docker build -t portfolio-agent-backend .
```

Run the Docker container (replace with your actual environment variables):

```bash
docker run -p 7860:7860 \
    -e SANITY_API_TOKEN="your_sanity_api_token" \
    -e SANITY_SERVER_API_TOKEN="your_sanity_server_token" \
    -e OPENAI_API_KEY="your_openai_api_key" \
    -e CLERK_SECRET_KEY="your_clerk_secret_key" \
    portfolio-agent-backend
```

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.
