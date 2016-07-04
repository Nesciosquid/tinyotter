# TinyOtter: 
Slightly smaller than your average-sized otter.

## Live Demo
### [http://tinyotter.com](http://tinyotter.com)

## Running the Python Scripts

To run the scripts in the `Python` folder, please be sure to first run `pip install -r requirements.txt` from that folder, which will ensure the `PyMySql` dependency is installed correctly.

Next, you'll need to open `code_sample.py` the file and change the values in `default_login_data` to contain the correct login credentials.

Then, run `code_sample.py` from the command line.

## API

The `serverless-tinyotter` folder contains a serverless implementation of an API which exposes a single endpoint at [api.tinyotter.com/getWordCounts](http://api.tinyotter.com/getWordCounts).
This will return a JSON object which contains an array of all words found in all utterances in the target database.

This is hosted on Amazon AWS using their Lambda, Cloudfront, and API Gateway features. It is also configured to prevent database information (login, password, etc.) from being accessed by unauthoriazed personnel.

## JavaScript

The Javascript application compiled to the 'build' folder uses the exposed API to retrieve the unique word counts from AWS, which abstracts away the database call. 
It then uses React and Redux to render a webpage which allows the user to select which words to display, bsaed on the minimum number of times each word appears in the database.

Without an API, it would be extremely difficult to create a live application which securely accesses the database via JavaScript without exposing login information to the public.

### Compiling, Running, and Syncing the JavaScript Application

   * If you don't have it, install [node-js](https://nodejs.org/en/)
   * Run `npm install` from the main project directory (with package.json)
   * Run `npm start` to start a local webserver, which will recompile the code after any changes. 
      * Access this server at `http://localhost:8080`
   * Run `npm run build` to build the application to the `/build` directory.
   * Run `npm run sync` to sync the application to Amazon S3. 
      * You probably won't be able to do this without my credentials!





