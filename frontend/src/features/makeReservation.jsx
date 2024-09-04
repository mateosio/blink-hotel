
export async function makeReservation({id, changes, accessToken, axiosInstance}) {
  try {
    console.log("Se lanza makereservations");
    const response = await axiosInstance.patch(
      `/rooms/${id}/reservation`, 
      changes,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

    console.log("Llego la respuesta del backend", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
