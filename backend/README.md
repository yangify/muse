Setup - Activate python virtual environment

   `python -m venv .venv`

   `source .venv/bin/activate`

Setup - Install dependencies: ` pip install -r requirements.txt `

----

Setup using setup script:
1. Make the script executable: `chmod +x setup.sh`
2. Run the script: `./setup.sh`

---

Start dev server: `flask run`

Run test: `pytest`

---

Dockerize: `docker build -t muse-backend .`

Run Container: `docker run -d -p 8000:8000 --name muse-backend muse-backend`