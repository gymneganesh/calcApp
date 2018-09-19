Run the Application
---------------------
npm start


Build a production version
-------------------------
npm run build

Serve the distribution folder
-------------------------

npm run serve:dist

Unit tests
-------------------------
npm test


End to end testing
-------------------------
In order to start running your end-to-end tests, first start your web server with:

npm start

start e22 in new terminal and exec below command

npm run protractor



Calculator App components :
-------------------------
Homepage component (src/app/home/home.controller.js) :
---------------------------------------------------------------------------
      - Act as the master template for the calculator application
      
      
Page Header (src/app/page-header/page-header.directive.js)
---------------------------------------------------------------------------
       - directive for the app header
       
Calc container (src/app/calc-container/calc-container.directive.js)
---------------------------------------------------------------------------
      - directive for the calculator 
      - performs all the required operation via a service component (calc-containerservice.js)
      
      


- Unit tests can be found inside the respective component.

-E2E tests can be found e2e-tests/scenarios.js


note : configure your proxy accordingly in (.npmrc  or .bowerrc) if you find any issues while installing the packages via NPM or bower.

or try to clear your local cache. bower clean cache


       
       
  
