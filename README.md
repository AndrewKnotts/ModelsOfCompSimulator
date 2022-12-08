# ModelsOfCompSimulator
A simulator for different models of computation.

# Project Structure
This project was built using React on top of JavaScript. It operates simply as a web application, and there is no need for a database backend. Within our file structure, you can see that there is a folder titled `src` that contains all of our working files. Within `src` exists two important folders: `pages` and `components`. 

The `pages` folder contains information specific to each model type (DFA, NFA, PDA, Turing Machine). While there is some overlap, it is important that 
these remain separate so that corresponding user inputs are handled correctly. The Tape.js file is part of the Turing Machine.

The `components` folder contains many folders that each contain a JS and CSS file to help build a given component. Each component within this folder is used
in either the `App.js` file that is compiled, or in a subfile that is called in `App.js`. An important folder inside of the `components` folder is the `input` 
folder. The `input` folder contains the logic that handles all of our different models. Each model is handled in a separate file.
These components are crucial to building different aspects of our webpage. 

# Running Locally
1. Clone the repository to your device.

2. In the terminal, run “npm install” inside the project directory to make sure you have npm installed.

3. Install bootstrap with “npm install react-bootstrap bootstrap".

4. Run “npm start”.

And voila! You have the web application running on your local device!

To run the unit tests, run "npm start".

# Deployment
1. In the package.json file, make sure you have a homepage field. Ex: "homepage": "https://myusername.github.io/my-app",

2. Run “npm install --save gh-pages”

3. Make sure the following scripts are in the package.json file - "predeploy": "npm run build" and "deploy": "gh-pages -d build"

4. Run “npm run deploy”

Now your updated version should be deployed on github pages!

# Accessing Webpage
To access the deployed version of the webpage, visit this [link](https://andrewknotts.github.io/ModelsOfCompSimulator/).
