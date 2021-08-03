



let db = null;

function dbConection() {

  const request  = indexedDB.open('simpleForm-db', 1);

  request.onsuccess = (e) => {
    db = e.target.result;
    getUserData();
  }

  request.onupgradeneeded = (e) => { 
    db = e.target.result;
  
    var objectStore = db.createObjectStore("user", { keyPath: "id" });
    
    objectStore.createIndex("name", "name", { unique: false });

    objectStore.createIndex("email", "email", { unique: true });

  }

}

dbConection();


function getUserData() {
  const transaction = db.transaction("user", "readwrite");

  const users = transaction.objectStore("user");

  const gelAllUsers = users.getAll();

  gelAllUsers.onsuccess = (e) => {
    insertData(e.target.result);
  }


}

function insertData(users) {

  const wrapper = document.getElementById("users-list");

  users.map((user)=> {
    const userDiv = document.createElement('div')
    wrapper.appendChild(userDiv);
    userDiv.className = `user ${user.id}`;

    const userDataDiv = document.createElement('div');
    userDiv.appendChild(userDataDiv);
    userDataDiv.className = "user-data";

    const userNameSpan = document.createElement("span");
    const userNameData = document.createTextNode(`Full name: ${user.name}`);
    userDataDiv.appendChild(userNameSpan);
    userNameSpan.appendChild(userNameData);

    const userEmailSpan = document.createElement("span");
    const userEmailData = document.createTextNode(`E-mail: ${user.email}`);
    userDataDiv.appendChild(userEmailSpan);
    userEmailSpan.appendChild(userEmailData);

    const userCPFSpan = document.createElement("span");
    const userCPFData = document.createTextNode(`CPF: ${user.cpf}`);
    userDataDiv.appendChild(userCPFSpan);
    userCPFSpan.appendChild(userCPFData);

    const userPhoneSpan = document.createElement("span");
    const userPhoneData = document.createTextNode(`Phone number: ${user.phoneNumber}`);
    userDataDiv.appendChild(userPhoneSpan);
    userPhoneSpan.appendChild(userPhoneData);

    //delete

    const deleteButton = document.createElement("a");
    const deleteButtonContent = document.createTextNode("x");
    deleteButton.appendChild(deleteButtonContent);
    deleteButton.id = `delete-user ${user.id}`;
    userDiv.appendChild(deleteButton);

  })


}