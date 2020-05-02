# loan-project

## How to run frontend
- open terminal and cd into `loan-frontend` directory.
- run `npm install` to install dependencies.
- run `npm start` to start app.
- default email `admin@example.com` and password `secret`


## How to run backend
- make sure you have python3.7 and postgresql installed. 
- create a new database and note the database url e.g. ```postgres://username:password@localhost:5432/loans```
- create new virtual environment in the `loan-backend` directory. Follow these [instructions.](https://djangocentral.com/how-to-a-create-virtual-environment-for-python/)
- activate your virtual environment, and run:
  - `pip install -r requirements.txt` to install dependencies.
  - `set DATABASE_URL=postgres://username:password@localhost:5432/loans`
  - `set FLASK_DEBUG=True`
  - `flask run` to deploy flask server on port 5000
  - to retrain the machine learning model, run `python ml/train.py`
