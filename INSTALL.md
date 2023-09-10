# Installation (for back-end)

The installation is required to create all the tables for SQL, collections for NoSQL and configure your cms-settings.json. This step is essential to setting up your HazeCMS content management system. Follow the steps below for installation.

For more detailed informations and steps, you can visit https://hazecms.com/documentation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/techfever-soft/hazecms-backend.git
   ```

2. Install necessary dependencies

   ```bash
   cd ./backend
   npm install
   ```

3. Start the development server

   ```bash
   npm run build
   npm run start
   ```

4. Your backend server should now be running on port 3500. It will serve API endpoints to your HazeCMS front-end.
   You can always change the port inside `./backend/index.ts` but don't forget to update the port used in your front-end code inside `./frontend/src/environments/` (**dataAPIUrl**)
