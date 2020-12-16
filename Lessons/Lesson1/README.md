# File Structure Module

A file structure contains the files for one or more projects. A project is the set of files that comprise an application on a shareable library. An angular module is used to group related angular components, services, directives, etc.

![](./assets/file-structure.png?raw=true "File Structure")

## Files used in Angular 8 app folder

- **Src folder:** It is the folder which contains the main code files related to our angular application.
- **app folder:** It contains the files which we have created for app components.
- **app.component.css:** The file contains theCSS(cascading style sheets) code in our app component.
- **app.component.html:** The file contains the HTML file related to its app component. Itis the template file which is specially used by angular to the data binding.
- **app.component.spec.ts:** This file is a unit testing file is related to the app component. This file is used across with more other unit tests. It is run from angular CLI by command ng test.
- **app.component.ts:** It is the essential typescript file which includes the view logic beyond the component.
- **app.module.ts:** It is also a typescript file which consists of all dependencies for the website. The data is used to define the needed modules has been imported, the components to be declared, and the main element to be bootstrapped.

## Other Important Files in Angular 8

- **package.json:** It is the npm configuration file. It includes details of our website’s and package dependencies with more information about our site being a package itself.
- **package-lock.json:** This is an auto-generated and transforms file that gets updated when npm does an operation related to the node_modules or package.json file.
- **angular.json:** It is a necessary configuration file related to our angular application. It defines the structure of our app and includes any setting to accomplish with the application.
- **.gitignore:** The record is related to the source code git.
- **.editorconfig:** This is a standard file which is used to maintain consistency in code editors to organizing some basics. such as indentation and whitespaces.
- **Assets folder:** This folder is a placeholder for the resource files which are used in the application such as images, locales, translations, etc.
- **Environment folder:** The environment folder is used to grasp the environment configuration constants that help when we are building the angular application.
- **Browser list:** This file specifies a small icon that appears next to the browser tab of a website.
- **favicon.ico:** It defines a small image that appears next to the browser tab of any website.
- **Index.html:** It is the entry file which holds the high-level container for the angular application.
- **main.ts:** This is the main ts file that will run; first, It is mainly used to define the global configurations.
- **polyfills.ts:** The record is a set of code that can be used to provide compatibility support for older browsers. Angular 8 code is written in ES6+ specifications.
- **styles.css:** It is the angular application uses a global CSS.
- **tsconfig.json:** This is a typescript compiler of the configuration file.
- **tsconfig.app.json:** It is used to override the ts.config.json file with app-specific configurations.
- **tsconfig.spec.json:** It overrides the tsconfig.json file with the app-specific unit test cases.
