# Portfolio Website

This is a portfolio website built using **Django**, **Next.js**, and **Material UI**, that uses a **PostgreSQL** database to store data.

### Dark mode:

![plot](https://github.com/BobsProgrammingAcademy/Portfolio-Website-Deployment/blob/main/public/images/dark_theme.png?raw=true)

### Light mode:

![plot](https://github.com/BobsProgrammingAcademy/Portfolio-Website-Deployment/blob/main/public/images/light_theme.png?raw=true)


## Table of Contents 
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the application](#run-the-application)
- [Adding data to the application](#add-data-to-the-application)
- [Customizing the application](#customize-the-application)
- [Deployment to Heroku](#deployment-to-heroku)


## Prerequisites

Install the following prerequisites:

1. [Python](https://www.python.org/downloads/)
2. [Node.js](https://nodejs.org/en/)
3. [PostgreSQL](https://www.postgresql.org/download/)
4. [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
5. [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
4. [Visual Studio Code](https://code.visualstudio.com/download)

Other prerequisites:
1. [Heroku account](https://signup.heroku.com/)


## Installation

### Backend

#### 1. Create a virtual environment

From the **root** directory run:

```bash
python -m venv venv
```

#### 2. Activate the virtual environment

From the **root** directory run:

```bash
source venv/bin/activate
```

#### 3. Install required backend dependencies

From the **root** directory run:

```bash
pip install -r requirements.txt
```

#### 4. Set up a PostgreSQL database

With **PostgreSQL** up and running, in a new Terminal window run:

```bash
dropdb --if-exists portfolio
```

Start **psql**, which is a terminal-based front-end to PostgreSQL, by running the command:

```bash
psql postgres
```

Create a new PostgreSQL database:

```sql
CREATE DATABASE portfolio;
```

Create a new database admin user:

```sql
CREATE USER yourusername WITH SUPERUSER PASSWORD 'yourpassword';
```

To quit **psql**, run:

```bash
\q
```

#### 5. Set up backend environment variables

From the **root** directory run:

```bash
touch config/.env
```

The **touch** command will create the **.env** file in the **config** directory. This command works on Mac and Linux but not on Windows. If you are a Windows user, instead of using the command line, you can create the **.env** file manually by navigating in Visual Studio Code to the Explorer, clicking on the **config** directory, and selecting the option **New File**.


Next, declare environment variables in the **.env** file. Make sure you don't use quotation marks around the strings.

```bash
SECRET_KEY=yoursecretkey
DEBUG=FALSE
DATABASE_NAME=portfolio
DATABASE_USER=yourusername
DATABASE_PASS=yourpassword
DATABASE_HOST=localhost
```

#### 6. Run migrations

From the **root** directory run:

```bash
python manage.py makemigrations
```
```bash
python manage.py migrate
```

#### 7. Create an admin user to access the Django Admin interface

From the **root** directory run:

```bash
python manage.py createsuperuser
```

When prompted, enter a username, email, and password.

### Frontend

#### 1. Install required frontend dependencies

From the **root** directory run:

```bash
npm install
```

#### 2. Set up frontend environment variables

From the **root** directory run:

```bash
touch .env.development && touch .env.production
```

Next, declare environment variables in both the **.env.development** and **.env.production** files. Make sure you don't use quotation marks around the strings.

```bash
BACKEND_URL=http://127.0.0.1:8000
```

## Run the application

To run the application, you need to have both the backend and the frontend up and running.

#### 1. Run backend

From the **root** directory run:

```bash
python manage.py runserver
```

#### 2. Run frontend

From the **root** directory run:

```bash
npm run dev
```

#### 3. View the application

Go to http://localhost:3000/ to view the application.


## Add data to the application

Add data through Django Admin.

Go to http://127.0.0.1:8000/admin to access the Django Admin interface and sign in using the admin credentials.


## Customize the application

This section describes how to customize the application. 

### Changing Section Titles and Subtitles 

#### 1. About

To modify the title and subtitle of the **About** section, make changes in the ```src/components/About.js``` file.

#### 2. Projects

To modify the title and subtitle of the **Projects** section, make changes in the ```src/components/Projects.js``` file.

#### 3. Technologies

To modify the title and subtitle of the **Technologies** section, make changes in the ```src/components/Technologies.js``` file.

#### 4. Contact

To modify the title and subtitle of the **Contact** section, make changes in the ```src/components/Contact.js``` file.

### Changing Colors

To modify the colors in the application, make changes in the ```src/theme/theme.js``` file.

### Changing Fonts

To modify the fonts in the application, first, add a new font to the ```src/pages/_document.js``` file, and then make changes in the ```frontend/src/theme/typography.js``` file.

### Changing Logo

To modify the logo in the application, make changes in the ```src/layout/Header.js``` file.

### Displaying your location on the map

To display your location on the map in the **Contact** section, you need to set the coordinates (latitude and longitude) of your location in the ```src/components/Contact.js``` file.


## Deployment to Heroku

#### 1. Create Procfile

From the **root** directory run:

```bash
touch Procfile
```

Next, in the **Procfile**, specify the processes your application should run. The processes specified in this file will automatically boot on deploy to Heroku.

```bash
web: gunicorn config.wsgi --log-file -
```

The **web** process is where we pass our **Gunicorn** config. First, we pass the **WSGI** file, which is located in the **config** directory. Next, we pass the **--logfile** flag, which specifies that the log file should get routed to Heroku.

#### 2. Create runtime.txt

Heroku will install a default Python version if you don't specify one, but if you want to pick your Python version, you need to create a **runtime.txt** file.

Python versions supported by Heroku are listed on:
https://devcenter.heroku.com/articles/python-support#supported-runtimes

From the **root** directory run:

```bash
touch runtime.txt
```

Next, in the **runtime.txt** file, specify your Python version with the prefix **python-**, followed by the **major**, **minor**, and **patch** version that you want your application to run on.

```bash
python-X.X.XX
```

#### 3. Specify Node.js and npm versions in package.json

Specify the **Node.js** and **npm** versions to be used on Heroku in the **engines** section of the **package.json** file.

```bash
"engines": {
    "node": "XX.X.X",
    "npm": "X.XX.X"
},
```

Always specify the Node.js and npm versions that match the runtime you’re developing and testing with. To find your versions locally run:

```bash
node --version
```

```bash
npm --version
``` 

#### 4. Add a deploy script to package.json

Add the following deploy script to the **scripts** section of the **package.json** file:

```bash
"deploy": "npm run build && rm -rf output static && next export -o output && mv output static && python integration_script.py -d static",
```

#### 5. Run the deploy script

From the **root** directory run:

```bash
npm run deploy
```

This will create an optimized production build.

#### 6. Collect static files into STATIC_ROOT

From the **root** directory run:

```bash
python manage.py collectstatic
```

This will collect the static files into a location defined in **STATIC_ROOT** in the **config/settings.py** file.

#### 7. Log in to your Heroku account

Log in to your Heroku account:

https://id.heroku.com/login

#### 8. Create a new app using Heroku Dashboard

Go to https://dashboard.heroku.com/apps and click the **Create new app** button.

Next, select an **app name** and specify a **region** where your application will be deployed. 

Finally, click the **Create app** button.

#### 9. Add your app to ALLOWED_HOSTS in settings.py

Add your app to the **ALLOWED_HOSTS** list in the **config/settings.py** file.

```bash
'yourappname.herokuapp.com',
```

#### 10. Add Heroku Buildpacks

On Heroku Dashboard, go to **Settings**, scroll down to the **Buildpacks** section, and click **Add buildpack**.
 
Add two buildpacks:
- nodejs
- python

#### 11. Add Config Vars

On Heroku Dashboard, go to **Settings**, scroll down to the **Config Vars** section, and click **Reveal Config Vars**.

Here, add all the variables stored in the **config/.env** and **.env.production** files, and one additional variable:  DISABLE_COLLECTSTATIC.

```bash
SECRET_KEY=yoursecretkey
DEBUG=FALSE
DATABASE_NAME=portfolio
DATABASE_USER=yourusername
DATABASE_PASS=yourpassword
DATABASE_HOST=localhost
BACKEND_URL=http://127.0.0.1:8000
DISABLE_COLLECTSTATIC=1
```

#### 12. Set up PostgreSQL on Heroku

With **Heroku CLI** installed, from the **root** directory run:

```bash
heroku login
```
Enter any key to go to your web browser to complete the login. The Heroku CLI then logs you in automatically. 

Next, provision **Heroku Postgres** by running the command:

```bash
heroku addons:create heroku-postgresql:<PLAN_NAME> --app <APP_NAME>
```

Finally, push your local PostgreSQL database to Heroku Postgres by running the command:

```bash
PGUSER=<USERNAME> PGPASSWORD=<PASSWORD> heroku pg:push postgres://<HOST>/<DB_NAME> <HEROKU_POSTGRES_DB_NAME> --app <APP_NAME>
```

#### 13. Select the Deployment method

On Heroku Dashboard, go to **Deploy**, scroll down to the **Deployment method** section, and select your preferred deployment method to see the deployment instructions.

#### Deployment method: Heroku Git (using the Heroku CLI)

If you haven't already, log in to your Heroku account by running the command:

```bash
heroku login
```

Next, initialize a Git repository in the project's **root** directory. From the **root** directory run:

```bash
git init
```

Next, create a Heroku Remote. From the **root** directory run:

```bash
heroku git:remote -a <APP_NAME>
```

Finally, deploy your application by running the commands:

```bash
git add .
```

```bash
git commit -am "Your comment"
```

```bash
git push heroku master
```

#### 14. View the application

Go to Heroku Dashboard and click the **Open app** button to view the deployed application.
