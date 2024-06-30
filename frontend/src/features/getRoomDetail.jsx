export async function getRoomDetail(id){
    const data = await fetch(`https://blink-hotel-server.vercel.app/rooms/${id}`);
    const rooms = await data.json();
    return rooms;
}
