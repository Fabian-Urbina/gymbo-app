# Gymbo: Your AI GymBro

This is a starter Ionic + React + FastAPI + SQL + OpenAI project for a gym assistant app called **Gymbo**.  

## Requirements

Before installing and running the app, make sure you have the following installed:

- [Python](https://www.python.org/) (v3.10+ recommended)
- `venv` (Python virtual environment, usually included with Python)
- [Node.js](https://nodejs.org/)
- [Ionic CLI](https://ionicframework.com/docs/cli) (`npm install -g @ionic/cli`)
- [Capacitor](https://capacitorjs.com/) (optional for native Android builds)
- [Android Studio](https://developer.android.com/studio) for Android development (optional if only running web)

Other needed Python and Node.js libraries are handled by pip and npm.

## Easy Setup & Run

1) **Clone the repository**:

```bash
git clone https://github.com/your-username/gymbo-app.git
```
2) Execute `setup.bat`  to install project dependencies (rebuilds from scrath). 
3) Execute `run.bat`  to run the project at localhost:8100.

## Manual Setup and Run

If the scripts above do not work, you can set up the project manually.

### Backend (Instructions for Windows)

1. **Build the virtual environment:**

```bash
cd backend
python -m venv venv
```

2. **Activate the virtual environment:**

```bash
source venv\Scripts\activate
```

3. **Install Python dependencies:**

```bash
pip install -r requirements.txt
```

4. **Run the backend:**

```bash
cd src
uvicorn main:app --reload
```

### Frontend

1. **Install frontend dependencies:**

```bash
cd frontend
npm install
npm install -g @ionic/cli
```

2. **Run the frontend:**

```bash
ionic serve
```

The frontend will open in your default browser at `localhost:8100`.