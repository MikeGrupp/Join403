const BASE_URL =
  "https://join403-42006-default-rtdb.europe-west1.firebasedatabase.app/";

async function initDatabase(pageName) {
  switch (pageName) {
    case "summary":
    case "task":
    case "board":
    case "contacts":
      setStoredContacts(await createLoadContacts());
      break;
    case "help":
    case "privacy":
    case "legal":
      break;
    default:
      break;
  }
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

async function loadUsers() {
  let users = null;
  try {
    let usersJson = await loadData("/users");
    users = mapUsersJson(usersJson);
  } catch (error) {
    console.error(error);
  }
  return users;
}

async function loadTasks() {
  let tasks = null;
  try {
    let tasksJson = await loadData("/tasks");
    tasks = mapTasksJson(tasksJson);
  } catch (error) {
    console.error(error);
  }
  return tasks;
}

async function loadData(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  return await response.json();
}

async function postData(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  return responseData.name;
}

async function patchData(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PATCH",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  return responseData.name;
}

async function deleteData(path = "") {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "DELETE",
    header: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

async function initContactsTable() {
  await postData("/contacts", {
    name: "Sofia Müller",
    initials: "SM",
    mail: "sofia.mueller@example.com",
    phone: "015123456789",
    color: "orange",
  });
  await postData("/contacts", {
    name: "Emma Meier",
    initials: "EM",
    mail: "emma.meier@test.de",
    phone: "017654321098",
    color: "pink_helitrope",
  });
  await postData("/contacts", {
    name: "Lucas Mertens",
    initials: "LM",
    mail: "lucas.mertens@webmail.com",
    phone: "01521987654",
    color: "blue_cerulean",
  });
  await postData("/contacts", {
    name: "Hannah Schmidt",
    initials: "HS",
    mail: "hannah.schmidt@gmail.com",
    phone: "01623456789",
    color: "green_java",
  });
  await postData("/contacts", {
    name: "Jonas Weber",
    initials: "JW",
    mail: "jonas.weber@outlook.de",
    phone: "01755432198",
    color: "violet",
  });
  await postData("/contacts", {
    name: "Anna Fischer",
    initials: "AF",
    mail: "anna.fischer@gmx.net",
    phone: "01876543210",
    color: "orange_tangerine",
  });
  await postData("/contacts", {
    name: "Maximilian Wagner",
    initials: "MW",
    mail: "maxi.wagner@hotmail.com",
    phone: "01987654321",
    color: "blue_ribbon",
  });
  await postData("/contacts", {
    name: "Sophie Klein",
    initials: "SK",
    mail: "sophie.klein@web.de",
    phone: "016234567890",
    color: "yellow_supernova",
  });
  await postData("/contacts", {
    name: "Maria Koch",
    initials: "MK",
    mail: "maria.koch@t-online.de",
    phone: "01907654321",
    color: "red_bittersweet",
  });
  await postData("/contacts", {
    name: "Alexander Schmidt",
    initials: "AS",
    mail: "alex.schmidt@example.com",
    phone: "015223456790",
    color: "violet_blue",
  });
  await postData("/contacts", {
    name: "Claudia Weber",
    initials: "CW",
    mail: "claudia.weber@example.com",
    phone: "016323456801",
    color: "red_coral",
  });
  await postData("/contacts", {
    name: "Christian Wolf",
    initials: "CW",
    mail: "christian.wolf@example.com",
    phone: "016423456802",
    color: "yellow_sin",
  });
  await postData("/contacts", {
    name: "Carmen Werner",
    initials: "CW",
    mail: "carmen.werner@example.com",
    phone: "016523456803",
    color: "purple_minsk",
  });
}
