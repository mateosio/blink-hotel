import jwt from "jsonwebtoken";
import Room from "../model/Room";


export const getRooms = async () => {
  try {
    const rooms = await Room.find().toArray();
    return rooms;    
  } catch (error) {
    throw new Error("Internal Server Error")
  }
};

export const getRoomDetail = async (id) => {
  try {  
    //convierto el id en un string que entiende la base de datos.
    const roomId = ObjectId.createFromHexString(id);
    const roomDetail = await Room.findOne({ _id: roomId });
  
    return roomDetail;
    
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

export const updateReservation = async (id, changes, req) => {
  //chequear si tiene un accessToken válido, sino devuelvo un status 403.
  const bearerToken = req.headers["authorization"];
  console.log(bearerToken);
  
  if (!bearerToken) throw new Error("Dont have an access token");

  const accessToken = bearerToken.split(" ")[1];

  try {
    const accessTokenValid = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

  } catch (error) {
    //Mantengo el error original para no perder información y previo lanzarlo le agrego propiedades.
    error.type = "Access Token invalid";
    throw error;
  }

  //Realizo la reserva si no hubo error al verificar el accessToken.
  const roomId = ObjectId.createFromHexString(id);
    const filter = { _id: roomId };
    const newReservation = changes;

    const updateDocument = {
      $push: {
        roomReservations: newReservation,
      },
    };

    const updateOne = await Room.updateOne(filter, updateDocument, function (err, result) {
        if (err) {
          console.log("Error al actualizar el documento:", err);
          return err;
        }

        // Verificar si se realizó alguna actualización
        if (result.modifiedCount > 0) {
          console.log("Documento actualizado exitosamente");
        } else {
          console.log("No se realizó ninguna actualización");
        }
      }
    );

    return updateOne;
};
