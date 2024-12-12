const BASE_URL = "https://join403-42006-default-rtdb.europe-west1.firebasedatabase.app/";

async function initDatabase() {
  setStoredContacts(await createLoadContacts());
  initContacts();
}

async function createLoadContacts() {
  let contacts = null;
  try {
    let contactsJson = await loadData("/contacts");
    contacts = mapContactsJson(contactsJson);
    if (contacts == null) {
      await initContactsTable();
      let contactsJson = await loadData("/contacts");
      return mapContactsJson(contactsJson);
    }
  } catch (error) {
    console.error(error);
  }
  return contacts;
}

async function loadData(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  return await response.json();

}

function mapContactsJson(json) {
  if (json == null) {
    return null;
  }
  return Object.entries(json).map(([firebaseId, contact]) => ({
    id: firebaseId,
    name: contact.name,
    mail: contact.mail,
    phone: contact.phone,
  }));
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

async function initContactsTable() {
  await postData("/contacts", {
    name: "Sofia Müller",
    mail: "sofia.mueller@example.com",
    phone: "015123456789",
  });
  await postData("/contacts", {
    name: "Emma Meier",
    mail: "emma.meier@test.de",
    phone: "017654321098",
  });
  await postData("/contacts", {
    name: "Lucas Mertens",
    mail: "lucas.mertens@webmail.com",
    phone: "01521987654",
  });
  await postData("/contacts", {
    name: "Hannah Schmidt",
    mail: "hannah.schmidt@gmail.com",
    phone: "01623456789",
  });
  await postData("/contacts", {
    name: "Jonas Weber",
    mail: "jonas.weber@outlook.de",
    phone: "01755432198",
  });
  await postData("/contacts", {
    name: "Anna Fischer",
    mail: "anna.fischer@gmx.net",
    phone: "01876543210",
  });
  await postData("/contacts", {
    name: "Maximilian Wagner",
    mail: "maximilian.wagner@hotmail.com",
    phone: "01987654321",
  });
  await postData("/contacts", {
    name: "Sophie Klein",
    mail: "sophie.klein@web.de",
    phone: "016234567890",
  });
  await postData("/contacts", {
    name: "Felix Hoffmann",
    mail: "felix.hoffmann@email.com",
    phone: "01711234567",
  });
  await postData("/contacts", {
    name: "Maria Koch",
    mail: "maria.koch@t-online.de",
    phone: "01907654321",
  });
}
