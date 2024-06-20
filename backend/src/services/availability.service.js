import Room from "../model/Room.js";

export const getAvailables = async (dates) => {

  try {
    console.log(dates);
    console.log(dates.endDate);
    const reservedRooms = await Room.find({
      "roomReservations.startDate": { $lte: dates.endDate },
      "roomReservations.endDate": { $gte: dates.startDate },
    });
  
    console.log("habitaciones reservadas en el servicio", reservedRooms);
    const allRooms = await Room.find();
    
    if(reservedRooms.length === 0) return allRooms;
    
    const roomsAvailable = allRooms.filter((room) => {
      return !reservedRooms.some((reserved) => {
        return room._id.toString() === reserved._id.toString();
        
      });
    });

    console.log("habitaciones disponibles en el servicio", roomsAvailable);
    return roomsAvailable;
  } catch (error) {
    throw error
  } 
};



