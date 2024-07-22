## About the project
An e-commerce hotel/accomodation booking website based on the MERN Stack (MongoDB, Express.js, React.js, Node.js) </br> </br>
The website is implemented with the following features:
- User login/logout 
- Buyers can browse for the available hotels at the homepage, plus making a booking.
- Sellers can upload and manage the hotel room for sale.

See the final results here: [Website Preview](https://github.com/junwai7159/mern-project/edit/master/README.md#website-preview)

## Usage
#### Step 1: Clone the repository

```bash
git clone https://github.com/junwai7159/mern-project.git
cd mern-project
```

#### Step 2: Create Your MongoDB Account and Database/Cluster

- Create your own MongoDB account by visiting the MongoDB website and signing up for a new account.

- Create a new database or cluster by following the instructions provided in the MongoDB documentation. Remember to note down the "Connect to your application URI" for the database, as you will need it later. Also, make sure to change `<password>` with your own password

- add your current IP address to the MongoDB database's IP whitelist to allow connections (this is needed whenever your ip changes)

#### Step 3: Update MongoDB URL

In the .env file, find the line that reads:

`MONGO_URL="your-mongodb-url"`

Replace "your-mongodb-url" with the actual URL of your MongoDB database.

#### Step 4: Install Backend Dependencies

In your terminal, navigate to the /backend directory of the project and run the following command to install the backend dependencies:

```bash
cd api
yarn install
```

This command will install all the required packages specified in the package.json file.

#### Step 5: Run the Backend Server

In the same terminal, run the following command to start the backend server:

```bash
node index.js
```

This command will start the backend server, and it will listen for incoming requests.

#### Step 6: Install Frontend Dependencies

Open a new terminal window , and run the following command to install the frontend dependencies:

```bash
cd client
yarn install
```

This command will navigate to the frontend directory within the project and install all the required packages for the frontend.

#### Step 7: Run the Frontend Server

After installing the frontend dependencies, run the following command in the same terminal to start the frontend server:

```bash
yarn start
```
The website link will be provided in the same terminal.

## Demonstrations
#### Entity-Relationship Diagram
![image](https://github.com/user-attachments/assets/8537b1ae-3f1e-4e6d-828f-b2db0fe56a85)

#### Video Showcase
https://github.com/user-attachments/assets/172b33c1-abe0-471a-b7bd-c603b7320d5a

