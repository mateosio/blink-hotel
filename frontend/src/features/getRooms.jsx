export async function getRooms(){
    const data = await fetch("https://blink-hotel-server.vercel.app/rooms");
    const rooms = await data.json();
    return rooms;
}

