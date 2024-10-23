Esta aplicación permite realizar reservas en las habitaciones de un hotel. 
Esta compuesta por un frontend en react y herramientas como datepicker para el calendario y un backend en node.js que guarda la información de las reservas en una base de datos de mongoDB Atlas.
Para la lógica de autenticación y autorización, uso access token, refresh token (este último se guarda en la base de datos y se envía al cliente mediante una cookie http only) un middleware, etc.
