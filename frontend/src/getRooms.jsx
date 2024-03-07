export async function getRooms(){
    const data = await fetch("http://localhost:3000/rooms");
    const rooms = await data.json();
    return rooms;
}

