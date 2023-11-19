# Comparing Web Frameworks on Animation Performance

The purpose of this document is to inform anyone on how to setup and run the tests that our group performed for our class project in CPS 691. 

**Our Group Consisted of:**
* Stephane Maillard
* Safayet Mohammad
* Jared Dunham
* Gary Pinsky 

## Preliminary Information 

Our project explores the performance of various web frameworks based on how efficiently they run animations on their webpages. The main goal of this project is to compare the performance of JavaScript-based web frameworks vs Web Assembly (based on animations). To test the animations, we designed three different web pages in each framework that performed different styles of animations. 

For each web frame work, we designed a webpage that did one of the following animations:
* Balls bouncing across the screen [Example](https://www.the-art-of-web.com/css/bouncing-ball-animation/)
* Squares fading in and out of the visibility on the screen [Example](https://www.pyxofy.com/css-animation-fade-in-and-out/)
* A pulse effect with squares [Example](https://www.geeksforgeeks.org/css-pulse-animation/)

The web frameworks that we compared are: 
* React
* Vue
* Angular
* Web Assembly

The metrics used to compare these websites are:
* Page Load Time
* Memory Utilization
* Framerate

## Setting up your environment to run all websites

To test all websites, you will have to setup your machine to run the four web frameworks.

### Framework Downloads

Our project requires that you install the following dependencies:
* [Node.js](https://nodejs.org/en/)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) 
* [Vue cli](https://cli.vuejs.org/#getting-started)
* [Angular cli](https://angular.io/cli) 

### Framework specific instructions

Official Documentation for Setting up each framework in an environment:
* [Vue](https://vuejs.org/guide/quick-start.html)
* [Angular](https://angular.io/guide/setup-local)
* [Web Assembly](https://learn.microsoft.com/en-us/aspnet/core/blazor/tutorials/?view=aspnetcore-8.0&preserve-view=true)
* [React](https://react.dev/learn/installation)

### IDEs 

Most of our testing was done by using VSCode as an IDE, however, for Blazor Web Assembly, it's easiest to utlize Visual Studio. 

## Setting up your environment to run the measurement script 

### Setting up Python

We have been using python version 3.11, however, any new version should work. 

### Python Packages

Python packages that should be installed in your environment 
* [psutil](https://psutil.readthedocs.io/en/latest/)
* [selenium](https://selenium-python.readthedocs.io/)
* [pandas](https://pandas.pydata.org/)
* [matplotlib](https://matplotlib.org/) (For creating graphs)

### Chrome Driver 

The Chrome Driver is required to record our tests through python. The easiest way to get the correct driver for the version of Chrome we are using is to use the Chocolatey package manager. 

[Chocolatey Install](https://chocolatey.org/install)

[Chrome Driver Install via Chocolatey](https://community.chocolatey.org/packages/chromedriver)

### Chrome Test Version

We will use the Chrome v118 because it allows us to do automated testing. 

[Chrome v118 zip file download](https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/118.0.5993.70/win64/chrome-win64.zip)

You can unzip these files into the same folder that Chrome is placed within your file system. Generally, `C:\Program Files\Google` is the path. 

### Assigning new file paths

After installing the Chrome Driver and Version of Chrome we are using to test with, you will need to change the file paths of the coinciding variables in the `Main.py` measurement script. 

The variables are: 

`chrome_driver_path` : Point to the location where the bin was placed for the the Chrome Driver. For chocolatey, the path should be `C:\\ProgramData\\chocolatey\\bin\\chromedriver.exe`.

`chrome_binary_path` : Point to the .exe file for Chrome v118. If you put in the Google folder, then the path should be `C:\\Program Files\\Google\\chrome-win64\\chrome.exe`

## Running tests with the measurement script

The example below is using the Angular web framework. 

### Step 1: Start your local dev server

Choose the framework you would like to do tests on and start the local dev server for it. Each have a certain way to start the local dev server. So consult the official documentation for the framework. 

With Angular you use Angular cli command `ng serve` from inside an angular project folder. 

### Step 2: Fill in the terminal prompts in the Main.py script

Navigate to the **Measurement** folder in our project and run the `Main.py` script. 

Answer each of the prompts in the terminal to begin a test:

- `Please enter the development server URL:` enter the specific page you are trying to test
- `Please enter the test duration (in seconds):` 
- `Enter the name of the output file:` enter the name of the csv file that will be output

An example:

![Alt text](image.png)

#### Local Dev Server URLs for Angular

For angular, the URLs that host the test webpages are:

| Animation       | URL                                         |
| --------------- | ------------------------------------------- |
| Bouncing Balls  | http://localhost:4200/Views/animation-ball  |
| Fade In and Out | http://localhost:4200/Views/animation-fade  |
| Pulse Effect    | http://localhost:4200/Views/animation-pulse |

### Step 3: Allow the test to run

After inputting all the infomation and hitting `Enter` one more time. The related webpage will open and an animation will begin. The **Page Load Time** will be outputted for the page and you will be told that you have 30 seconds to change the properties of the page before the test begins. For the webpages with the functionality, you can change the animation speed at this point. 

![Alt text](image-1.png)

After the test runs, the webpage for the animation will automatically be closed and a CSV file for the results will outputted to the **Measurement** folder. 

### Added note on Angular 

For the **Fade In and out** and **Pulse effect** animations in Angular. The animation speed **cannot** be changed on the animation's web page. 

For changing the animation of the **Fade In and Out** animation: 
1. Navigate to the `animation-fade` view that is in the path `\src\app\Views\animation-fade`.
2. Open the `animation-fade.component.ts` file.
3. Set the `animationDuration` variable to half of the full time you'd like one animation to occur (in miliseconds). Example: If you want the squares to fade in and out in one second. Then set this to `500ms`. 
4. Set the `animationIntervalDuration` variable to the full time it takes to do a animaitino (in miliseconds). So for one second, you would set the variable to `1000`. 

For the **Pulse effect** animation, the same process can be followed, except done on the `animation-pulse.component.ts` file. 

## Examining the data via graphs

To compare the results of the different frameworks through graphing, you can add the paths to your CSV files into the `csv_files` list in the `graph.py` script, then run this script. 
