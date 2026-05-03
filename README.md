# Election Process Assistant

An interactive React web application simulating the Indian voting process using EVMs and VVPATs.

## Tech Stack
- Frontend: React (Vite)
- Styling: Tailwind CSS
- State Management: Local React State
- Deployment: Docker, Nginx, Google Cloud Run

## Local Development

### Prerequisites
- Node.js (v18+)

### Setup
1. Clone the repository and navigate into the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the displayed local URL in your browser (usually `http://localhost:5173`).

### Building for Production
```bash
npm run build
```

## Deployment to Google Cloud Run

This project includes a multi-stage `Dockerfile` optimized for Google Cloud Run (serving static files via Nginx on port 8080).

1. Ensure you have the Google Cloud CLI (`gcloud`) installed and authenticated.
2. Ensure your GCP project is set:
   ```bash
   gcloud config set project [YOUR_PROJECT_ID]
   ```
3. Deploy directly using Cloud Build and Cloud Run:
   ```bash
   gcloud run deploy election-process-assistant \
     --source . \
     --region us-central1 \
     --allow-unauthenticated
   ```
4. Access the application using the Service URL provided in the terminal output.
