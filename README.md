# Leftovers Front end
Created by GrubMod Incorporated

## Description
Leftovers was created with the intention to eliminate food waste...

## Technologies Used
- Django
- React
- Heroku

## Deployment Sites
- 
- 

## Installation Instructions for Backend App
- Run the following commands on your terminal
```
git clone
cd front_leftovers
pipenv install
pipenv shell
psql -U <YOUR USERNAME> --f settings.sql
./manage.py createsuperuser
```

## Installation Instructions for Frontend App
- Run the following commands on your terminal
```
git clone
cd front_leftovers
npm i

npm start
``` 

## Heroku
```
heroku run python manage.py migrate --app leftovers-back
```
