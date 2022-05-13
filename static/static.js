const showExtraData = async (id) => {
  try {
    const resp = await fetch(`/api/announcement/${id}`);
    const obj = await resp.json();
    if (resp.status !== 200) {
      document.getElementById(`errdiv_announcement_${id}`).innerText = 'Data can not be fetched! Try again later';
    } else {
      const body = `
        Area(m2): ${obj[0].announcement_area}
        Rooms: ${obj[0].announcement_room_number}
        This announcement was uploaded on ${obj[0].announcement_date}
      `;
      document.getElementById(`extraData_${id}`).innerText = body;
    }
  } catch (err) {
    document.getElementById(`errdiv_${id}`).innerText = 'Something went wrong!';
  }
};

const deletePicture = async (id) => {
  console.log('bent');
  await fetch(`/api/picture/${id}`, { method: 'DELETE' })
    .then(() => {
      document.getElementById(`picture_${id}`).remove();
    })
    .catch((error) => {
      document.getElementById(`errdiv_picture_${id}`).innerText = error;
    });
};
