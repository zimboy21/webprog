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
  await fetch(`/api/picture/${id}`, { method: 'DELETE' })
    .then(() => {
      document.getElementById('announcementRespDiv').innerText = 'Image deleted succesfully!';
      document.getElementById(`picture_${id}`).remove();
    })
    .catch((error) => {
      document.getElementById(`errdiv_picture_${id}`).innerText = error;
    });
};

const deleteAnnouncement = async (id) => {
  await fetch(`api/announcement/${id}`, { method: 'DELETE' })
  .then(() => {
    document.getElementById('nnouncementResponses').innerText = 'Announcement deleted succesfully!';
    document.getElementById(`announcementCard_${id}`).remove();
  })
  .catch((error) => {
    document.getElementById(`announcementCard_`).innerText = error;
  });
}

const deleteMyAnnouncement = async (id) => {
  await fetch(`api/announcement/${id}`, { method: 'DELETE' })
  .then(() => {
    document.getElementById('myAnnouncementResponses').innerText = 'Announcement deleted succesfully!';
    document.getElementById(`myAnnouncementCard_${id}`).remove();
  })
  .catch((error) => {
    document.getElementById(`myAnnouncementResponses`).innerText = error;
  });
}

function openForm(id) {
  document.getElementById(`myForm_${id}`).style.display = 'block';
  document.getElementById(`openFormButton_${id}`).style.display = 'none';
}

function closeForm(id) {
  document.getElementById(`myForm_${id}`).style.display = 'none';
  document.getElementById(`openFormButton_${id}`).style.display = 'inline';
}

const setUserRights = async (uid) => {
  const checkBox = document.getElementById(`checkboxUserRights_${uid}`);
  const userRights = document.getElementById(`userRights_${uid}`);

  let param = '';
  if (userRights.innerText === 'admin') {
    param = 'user';
  } else {
    param = 'admin'
  }
  const params = {
    id: uid,
    privileges: param,
  };

  await fetch(`api/user`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( params )
  })
  .then(() => {
    if (checkBox.checked) {
      userRights.innerText = 'admin';
    } else {
      userRights.innerText = 'user';
    }
  })
  .catch((error) => {
    document.getElementById(`userRightsResp_${uid}`).innerText = error;
  });
  
} 

const deleteUser = async (id) => {
  await fetch(`api/user/${id}`, { method: 'DELETE' })
  .then(() => {
    document.getElementById(`userCard_${id}`).remove();
  })
  .catch((error) => {
    document.getElementById(`userRightsResp_${id}`).innerText = error;
  });
}

function openchangeAvatarForm() {
  document.getElementById('mychangeAvatarForm').style.display = 'block';
}

function closechangeAvatarForm() {
  document.getElementById('mychangeAvatarForm').style.display = 'none';
}

const sendTextMessage = async (to, from) => {
  console.log('iyt');
  const text = document.getElementById('messageTextArea').value;
  const params = {
    to: to,
    from: from,
    text: text,
  };
  console.log(params);
  await fetch(`chat/sendMessage`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( params )
  })
  .catch((error) => {
    document.getElementById(`chatError`).innerText = error;
  });
}
