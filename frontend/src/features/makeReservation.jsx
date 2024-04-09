export async function makeReservation({id, changes}) {
  try {
    const response = await fetch(
      `http://localhost:3000/rooms/${id}/reservation`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        // Authorization: ,
        body: JSON.stringify(changes),
      }
    );
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.log(error);
  }
}
