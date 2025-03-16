Setup - Activate python virtual environment

   ` python -m venv .venv `

   ` source .venv/bin/activate `

Setup - Install dependencies: ` pip install -r requirements.txt `

Start dev server: ` Flask run`

Run test: ` pytest `

Setup using setup script:
1. Make the script executable: `chmod +x setup.sh`
2. Run the script: `./setup.sh`

Dockerize: ` docker build -t muse-backend . `

Run Container: ` docker run -d -p 8000:8000 --name muse-backend muse-backend `