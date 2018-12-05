# HealthQueery

HealthQueery is a site to curate, find, and review healthcare professionals that provide LGBTQ+ inclusive healthcare.

## Tech

The frontend of this project was built with **React**, along with **Redux** and **React-Router**. The server is built on **Node** and **Express**, with a **postgresSQL** database. Other technologies used include **moment.js**, the **Google Maps API**, and **Massive**.

## Features

The most important feature of HealthQueery is the ability to search a metroplex for relevant healthcare providers. You can filter by demographic or services provided. The map displays all the results so it's easy to tell how far away a provider is from the user.

Speaking of users, authorization is done via Auth0 and are stored in the database. Users can review listings and save them to their favorites. Admin users can also edit or add new listings, along with approve user submitted listings.

## PostgreSQL Database

Designing my database was a big part of this project. Search results require up to 5 joins, and I wanted data to be organized and consistent. I chose to make join tables for specialties and demographics to avoid duplicate data and every entry would link back to a description.
![Database Schema](https://firebasestorage.googleapis.com/v0/b/gitchat-app.appspot.com/o/other%2FHQDB.png?alt=media&token=788a31bb-3bfd-4b98-9a15-0cfe79339897)
