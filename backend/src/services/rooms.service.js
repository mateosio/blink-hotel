import {MongoClient, ObjectId} from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db("hotel-blink")
const roomsCollection = db.collection("rooms");

export async function getRooms(){
        await client.connect();
        const rooms = await roomsCollection.find().toArray();
        console.log(rooms);
        return rooms;
};    

export async function getRoomDetail(id){
        await client.connect();

        //convierto el id en un string particular que entiende la base de datos.
        const roomId = ObjectId.createFromHexString(id);
        const roomDetail = await roomsCollection.findOne({ _id: roomId });       

        return roomDetail;
};

export async function updateReservation(id, changes){
    await client.connect();

    const roomId = ObjectId.createFromHexString(id);
    const filter = {_id: roomId};
    const newReservation = changes;
    const updateDocument = {
        $push: {
                roomReservations: newReservation
        }
    }

    const updateOne = await roomsCollection.updateOne(filter, updateDocument, function(err, result) {
        if (err) {
          console.log('Error al actualizar el documento:', err);
          return err;
        }
      
        // Verificar si se realizó alguna actualización
        if (result.modifiedCount > 0) {
          console.log('Documento actualizado exitosamente');
        } else {
          console.log('No se realizó ninguna actualización');
        }
        
        // Cierra la conexión al finalizar
         client.close();
      });

      return updateOne;

}