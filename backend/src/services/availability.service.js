import Room from "../model/Room.js";

export const getAvailables = async (dates) => {

  try {
    const reservedRooms = await Room.find({
      roomReservations: {
        $elemMatch: {
          startDate: { $lte: dates.endDate },
          endDate: { $gte: dates.startDate },
        },
      },
    });
  
    console.log("habitaciones reservadas en la fecha seleccionada", reservedRooms);
    const allRooms = await Room.find();
    console.log("todas las habitaciones", allRooms);
    
    if(reservedRooms.length === 0) return allRooms;
    
    const roomsAvailable = allRooms.filter((room) => {
      return !reservedRooms.some((reserved) => {
        return room._id.toString() === reserved._id.toString();
        
      });
    });

    console.log("habitaciones que no estan reservadas en la fecha seleccionada", roomsAvailable);
    return roomsAvailable;
  } catch (error) {
    throw error
  } 
};



