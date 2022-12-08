# ModelsOfCompSimulator
A simulator for different models of computation.

# Project Structure
This project was built using React on top of JavaScript. It operates simply as a web application, and there is no need for a database backend. Within our file structure, you can see that there is a folder titled `src` that contains all of our working files. Within `src` exists two important folders: `pages` and `components`. 

The `pages` folder contains information specific to each model type (DFA, NFA, PDA, Turing Machine). While there is some overlap, it is important that 
these remain separate so that corresponding user inputs are handled correctly.

The `components` folder contains many folders that each contain a JS and CSS file to help build a given component. Each component within this folder is used
in either the `App.js` file that is compiled, or in a subfile that is called in `App.js`. An important folder inside of the `components` folder is the `input` 
folder. The `input` folder contains the logic that handles all of our different models. Each model is handled in a separate file.
These components are crucial to building different aspects of our webpage. 
