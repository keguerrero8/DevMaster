# DevMaster

## Description

DevMaster is a workflow and project management application tailored for software engineers.  As a previous system engineer, I worked closely with software engineers to communicate and review ideas for a path forward before feature implementation.  Additionally, features needed to be complete within sprints between a small group of engineers.  This application was made with inspiration from the Scrum framework, to facilitate communication of design ideas between engineers while also providing tools to manage the status of a project all in one application. 

![Screen Shot 2022-05-27 at 7 42 33 AM](https://user-images.githubusercontent.com/91296112/170692953-5e11c9bc-85ed-469d-baf6-eae959b9deb5.png)


## Installation

Prerequisites: Install Node.js and the npm command line interface using either a Node version manager or a Node installer.  Also make sure the latest Ruby version is installed as well as rails which can be done through RubyGems.

1. Fork and clone the repository
2. cd into the main folder directory
3. To install for the first time:
       a) `bundle install` (backend)
       b) `npm install --prefix client` (frontend)
4. To start the application:
       a) `rails s` (backend)
       b) `npm start --prefix client` (frontend)
       

## Usage

Provide instructions and examples for use. Include screenshots as needed.

To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

    ```md
    ![alt text](assets/images/screenshot.png)
    ```

## License

The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/).

---

🏆 The previous sections are the bare minimum, and your project will ultimately determine the content of this document. You might also want to consider adding the following sections.


## Features

If your project has a lot of features, list them here.

## Back End Architecture

Backend was built with Ruby on Rails with a Postgres database.  Highlights of the backend architecture include the following:

1. Authentication and Authorization using Bcrypt for password hashing
2. Action Cable for Websocket integration to allow for real time features
3. RESTful API with full CRUD functionality for multiple resources
4. Multiple many-to-many database relationships (ERD shown below)

![Screen Shot 2022-06-02 at 9 49 40 AM](https://user-images.githubusercontent.com/91296112/171644487-d4f11df5-6332-41df-ae3b-68e00a78f1de.png)


## Front End Architecture

