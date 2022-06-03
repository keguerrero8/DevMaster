# DevMaster

## Description

DevMaster is a workflow and project management application tailored for software engineers.  As a previous system engineer, I worked closely with software engineers to communicate and review ideas for a path forward before feature implementation.  Additionally, features needed to be complete within sprints between a small group of engineers.  This application was made with inspiration from the Scrum framework, to facilitate communication of design ideas between engineers while also providing tools to manage the status of a project all in one application. 

![Screen Shot 2022-05-27 at 7 42 33 AM](https://user-images.githubusercontent.com/91296112/170692953-5e11c9bc-85ed-469d-baf6-eae959b9deb5.png)       


## Features

* Diagram creation and customization 
* Share diagrams with other users signed up for the application
* Project Folders to manage tasks for projects across different completion status 
* Share project folders and taskboard with other users signed up for the application
* Github API integrated to create link between project folders and github repository
* Authentication and Authorization for user account creation
* Chat Feature to allow for instant messaging across different users

## Back End Technologies and Architecture

Backend was built with Ruby on Rails with a Postgres database.  Highlights of the backend architecture include the following:

* Authentication and Authorization using Bcrypt for password hashing
* Action Cable for Websocket integration to allow for real time features
* Validations to ensure valid user inputs
* RESTful API with full CRUD functionality for multiple resources
* Multiple many-to-many database relationships (ERD shown below)

![Screen Shot 2022-06-02 at 9 49 40 AM](https://user-images.githubusercontent.com/91296112/171644487-d4f11df5-6332-41df-ae3b-68e00a78f1de.png)


## Front End Technologies and Architecture

Frontend was built with React. Highlights of the frontend architecture include the following:

* User Interface designed with Material UI 
* React Flow to allow for diagram creation and customization
* Recharts library to integrate bar graph used for project summary
* React-beautiful-dnd for creation of interactivity with project taskboard
* Material UI integrated media queries for mobile responsiveness


## Installation and Usage

Prerequisites: Install Node.js and the npm command line interface using either a Node version manager or a Node installer.  Also make sure the latest Ruby version is installed as well as rails which can be done through RubyGems.

1. Fork and clone the repository
2. cd into the main folder directory
3. To install for the first time:
       a) `bundle install` (backend)
       b) `npm install --prefix client` (frontend)
4. To start the application:
       a) `rails s` (backend)
       b) `npm start --prefix client` (frontend)

