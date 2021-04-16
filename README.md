# ssb-backend

Backend repository for Spice Spice Baby recipe app containing code related to the application server and the Neo4j database. 

## ssb-app-server

Application server written in Typescript, utilising Express to handle web traffic, and Swagger for documentation. A GitHub Action has been set-up to automatically deploy the latest version of the application server onto Google App Engine. The Neo4j database is hosted on Google Compute Engine.


### Available API calls

API documentation can be found <a href="https://project-ssb-310204.ts.r.appspot.com/swagger/">here</a>.


## ssb-db

Folder containing python scripts used to obtain, clean and format recipe data. Also contains cypher scripts used to import data into Neo4j amongst other queries.

Current database schema:
<br>
<img src="https://i.imgur.com/eaebdOb.png" height=600px></img>

# Future Steps

## ssb-app-server

<ul>
  <li>Implement Jest unit testing.</li>
  <li>Implement POST requests</li>
  <li>Develop interface for managing database through app server</li>
</ul>

## ssb-db

Format data to fit new schema:
<br>
<img src="https://i.imgur.com/oUG9AJ6.png" height=600px></img>
