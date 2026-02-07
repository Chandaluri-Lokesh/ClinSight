# HealthApp (ClinSight) - README

## Overview
**ClinSight** is a **Hybrid Multi-Modal RAG Medical Diagnosis Support System**.
This MVP uses advanced AI (Retrieval-Augmented Generation) to analyze **X-ray images**, **Clinical Notes**, and **Lab Values** to provide trustworthy, citation-backed diagnostic support.

> **Disclaimer:** This is an academic/portfolio project. It is **NOT** a real medical device and must not be used for actual patient diagnosis.

## Key Features
-   **Multi-Modal Inputs**: Upload X-rays, paste clinical text, and enter lab values.
-   **Hybrid Retrieval (Planned)**: Combines Vector Search (FAISS) with Knowledge Graphs (Neo4j) for grounded reasoning.
-   **Citation-Backed**: Outputs include references (e.g., PubMed IDs, SNOMED codes) to reduce hallucinations.
-   **Role-Based Access**: Specialized views for Intake, Nurses, Radiologists, and Physicians.

## Tech Stack
### Frontend (Running Prototype)
-   **React** (Vite + TypeScript)
-   **Tailwind CSS** (Custom design system)
-   **Lucide React** (Icons)

### Backend (Planned Implementation)
-   **Python** (FastAPI)
-   **Embedding Models**: BioViL (Images), BioBERT (Text)
-   **Databases**: Neo4j (Graph), FAISS (Vector)
-   **LLM Integration**: LLaVA-Med / OpenAI

## Project Structure
```bash
HealthApp/
├── clinsight-app/      # Main React Frontend Application
│   ├── src/
│   │   ├── screens/    # Page components (Dashboard, Login, etc.)
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # Auth and State management
│   │   └── ...
├── prd.md              # Product Requirements Document
├── FRONTEND_DESIGN.md  # Detailed UI/UX spec
├── overview.md         # High-level concept summary
└── README.md           # This file
```

## Getting Started (Frontend)

To run the interactive frontend prototype:

1.  **Navigate to the app directory**:
    ```bash
    cd clinsight-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Visit `http://localhost:5173` (or the port shown in your terminal).

## Demo Credentials
(The current prototype uses mock authentication):
-   **Physician**: Use username `physician` (Access to Diagnostic Support)
-   **Intake Officer**: Use username `intake`
-   **Nurse**: Use username `nurse`
-   **Password**: Any non-empty string

## Contributing
This is an academic project. Contributions are welcome for bug fixes or further implementation of the backend logic.

## License
MIT License
