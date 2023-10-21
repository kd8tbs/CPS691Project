# CPS691AngularApp

## Setup before testing
1) Install [Node Js](https://nodejs.org/en)
2) Install the npm package handler. Use can use command line command: `npm install -g npm`
3) Run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` in the command line to allow angular to run scripts
4) Install the Angular command line interface with the `npm install -g @angular/cli` command
5) If you're running in VSCode you'll probably want to get the **Angular Essentials** extension

## Testing
1) Run `ng serve` in the command line for a local dev server. Navigate to `http://localhost:4200/`.
2) The default page will be the Ball Animation page, fill out the form on the page:
   - **Starting Number of Animations:** The number of animations to have in the test.
   - **Starting Speed:** Will automatically set to 5.
   - **Duration of Test:** The number of seconds to have the test run.
3) Click the **Start Test** button, to begin the test.

**Notes:** 
- Filling out any of the other fields won't affect the program right now.
- The **End Test** button will stop the test that is happening, but you will need to refresh to clear the page of animations.

## Code Information
The main files that relate to the ball animations are:
- `ball.ts` A typescript class file that defines the parameters of a ball object. Path: src => app => Classes => `ball.ts`
- `animation-ball.component.ts` A typescript file that does the heavy lifting for the ball animation. Path: src => app => Views => `animation-ball.component.ts`
