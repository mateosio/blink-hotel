export async function getRoomDetail(id){
    const data = await fetch(`http://localhost:3000/rooms/${id}`);
    const rooms = await data.json();
    return rooms;
}