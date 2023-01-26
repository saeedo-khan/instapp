# How I worked in this project

● I tried to clone the Instagram app design and functionality

# How to Navigate this project
##  FrontEnd
* build and create responsive MUI design
* somewhat complex logic stateful
* integrate server endpoints and client side

##  backend
* setup express server
* protect auth with jwt and send data with cookies thorough https only
* build prisma postgress relational database models
* contollers and routes integrate with prisma to create restful Api

## deployment
* deployed backend and frontend on Vercal

# why i built the project this way
* i didn't use state management library like redux on purpose. for this app simple useState is sufficient.<br />
i relaized more and more projects dont use Redux anymore since GraphQl<br/> and react-query, swr are often used for data management.
* MUI is massive library for styling and customizable component.
