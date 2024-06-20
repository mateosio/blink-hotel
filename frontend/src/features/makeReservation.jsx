
export async function makeReservation({id, changes, auth, axiosInstance}) {
  console.log("previo makereservations");
 
  try {
    console.log("Se lanza makereservations");
    const response = await axiosInstance.patch(
      `/rooms/${id}/reservation`, 
      changes,
    {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    }
  );

    console.log("Llego la respuesta del backend", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
