import useAxios from "../utils/axios.js"

export async function makeReservation({id, changes}) {
  const axiosInstanse = useAxios();

  try {
    const response = await axiosInstanse.patch(
      `http://localhost:3000/rooms/${id}/reservation`, changes);

    return response.data;
    
  } catch (error) {
    throw error;
  }
}
