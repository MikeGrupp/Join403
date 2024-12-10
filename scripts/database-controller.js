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
    name: "Sofia Müller",
    mail: "sofia.mueller@example.com",
    phone: "015123456789",
  });
  postData("/contacts", {
    name: "Emma Meier",
    mail: "emma.meier@test.de",
    phone: "017654321098",
  });
  postData("/contacts", {
    name: "Lucas Mertens",
    mail: "lucas.mertens@webmail.com",
    phone: "01521987654",
  });
  postData("/contacts", {
    name: "Hannah Schmidt",
    mail: "hannah.schmidt@gmail.com",
    phone: "01623456789",
  });
  postData("/contacts", {
    name: "Jonas Weber",
    mail: "jonas.weber@outlook.de",
    phone: "01755432198",
  });
  postData("/contacts", {
    name: "Anna Fischer",
    mail: "anna.fischer@gmx.net",
    phone: "01876543210",
  });
  postData("/contacts", {
    name: "Maximilian Wagner",
    mail: "maximilian.wagner@hotmail.com",
    phone: "01987654321",
  });
  postData("/contacts", {
    name: "Sophie Klein",
    mail: "sophie.klein@web.de",
    phone: "016234567890",
  });
  postData("/contacts", {
    name: "Felix Hoffmann",
    mail: "felix.hoffmann@email.com",
    phone: "01711234567",
  });
  postData("/contacts", {
    name: "Maria Koch",
    mail: "maria.koch@t-online.de",
    phone: "01907654321",
  });
}
