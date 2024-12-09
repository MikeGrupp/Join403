const BASE_URL = "https://join403-42006-default-rtdb.europe-west1.firebasedatabase.app/";

function initDatabase() {
  initContactsIfNeeded();
}

async function initContactsIfNeeded() {
  try {
    let contacts = await loadData("/contacts");
    if (contacts == null) {
      initContactsTable();
    }
  } catch (error) {
    console.error(error);
  }
}

async function loadData(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  return (responseToJson = await response.json());
}

async function postData(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
}

function initContactsTable() {
  postData("/contacts", {
    "last-name": "Müller",
    "first-name": "Sofia",
    mail: "sofia.mueller@example.com",
    phone: "015123456789",
  });
  postData("/contacts", {
    "last-name": "Meier",
    "first-name": "Emma",
    mail: "emma.meier@test.de",
    phone: "017654321098",
  });
  postData("/contacts", {
    "last-name": "Mertens",
    "first-name": "Lucas",
    mail: "lucas.mertens@webmail.com",
    phone: "01521987654",
  });
  postData("/contacts", {
    "last-name": "Schmidt",
    "first-name": "Hannah",
    mail: "hannah.schmidt@gmail.com",
    phone: "01623456789",
  });
  postData("/contacts", {
    "last-name": "Weber",
    "first-name": "Jonas",
    mail: "jonas.weber@outlook.de",
    phone: "01755432198",
  });
  postData("/contacts", {
    "last-name": "Fischer",
    "first-name": "Anna",
    mail: "anna.fischer@gmx.net",
    phone: "01876543210",
  });
  postData("/contacts", {
    "last-name": "Wagner",
    "first-name": "Maximilian",
    mail: "maximilian.wagner@hotmail.com",
    phone: "01987654321",
  });
  postData("/contacts", {
    "last-name": "Klein",
    "first-name": "Sophie",
    mail: "sophie.klein@web.de",
    phone: "016234567890",
  });
  postData("/contacts", {
    "last-name": "Hoffmann",
    "first-name": "Felix",
    mail: "felix.hoffmann@email.com",
    phone: "01711234567",
  });
  postData("/contacts", {
    "last-name": "Koch",
    "first-name": "Maria",
    mail: "maria.koch@t-online.de",
    phone: "01907654321",
  });
}
