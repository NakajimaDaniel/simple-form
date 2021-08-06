module.exports = {createUser, dbConection, addUser, sendForm, nameValidation, emailValidation, cpfValidation, phoneValidation, insertData, getUserData, dbConection2 }


document.addEventListener('DOMContentLoaded', function () {
  const nameInput = document.getElementById("name-input");
  nameInput.addEventListener("input", nameValidation);
  
  const emailInput = document.getElementById("email-input");
  emailInput.addEventListener("input", emailValidation);
  
  const cpfInput = document.getElementById("cpf-input");
  cpfInput.addEventListener("input", cpfValidation);
  
  const phoneInput = document.getElementById("number-input");
  phoneInput.addEventListener("input", phoneValidation);
  
  const userForm = document.getElementById("user-form");
  userForm.addEventListener("submit", function() {sendForm(event)})
});



function nameValidation() {
  const name = document.getElementById("name-input").value;

  if (name.length < 3) {
    document.getElementById("name-span").style.visibility = "visible"
    document.getElementById("name-input").style.borderBottom = "1px solid #EB4A46"
  } else {
    document.getElementById("name-span").style.visibility = "hidden"
    document.getElementById("name-input").style.borderBottom = "1px solid #efeeed"
  }
}


function emailValidation() {
  
  const email = document.getElementById("email-input");

  if(email.validity.typeMismatch) {
    document.getElementById("email-span").style.visibility = "visible";
    document.getElementById("email-input").style.borderBottom = "1px solid #EB4A46";
  } else {
    document.getElementById("email-span").style.visibility = "hidden";
    document.getElementById("email-input").style.borderBottom = "1px solid #efeeed";
  }

}


function cpfValidation() {

  const cpf = document.getElementById("cpf-input");

  if (cpf.validity.patternMismatch) {
    document.getElementById("cpf-span").style.visibility = "visible";
    document.getElementById("cpf-input").style.borderBottom = "1px solid #EB4A46";
  } else {
    document.getElementById("cpf-span").style.visibility = "hidden";
    document.getElementById("cpf-input").style.borderBottom = "1px solid #efeeed";
  }
}


function phoneValidation() {
  const phone = document.getElementById("number-input");

  if (phone.validity.patternMismatch) {
    document.getElementById("number-span").style.visibility = "visible";
    document.getElementById("number-input").style.borderBottom = "1px solid #EB4A46";
  } else {
    document.getElementById("number-span").style.visibility = "hidden";
    document.getElementById("number-input").style.borderBottom = "1px solid #efeeed";
  }
}



async function createUser() {
  const id = Date.now();
  const name = document.getElementById("name-input").value;
  const email = document.getElementById("email-input").value;
  const cpf = document.getElementById("cpf-input").value;
  const phoneNumber = document.getElementById("number-input").value;

  const user = new Object();
  user.id = id;
  user.name = name;
  user.email = email;
  user.cpf = cpf;
  user.phoneNumber = phoneNumber;

  return JSON.parse(JSON.stringify(user));
}




let db = null;

function dbConection() {

  if(db) {
    return;
  }

  const request  = indexedDB.open('simpleForm-db', 1);

  request.onsuccess = (e) => {
    db = e.target.result;
  }

  request.onupgradeneeded = (e) => { 
    db = e.target.result;
  
    var objectStore = db.createObjectStore("user", { keyPath: "id" });
    
    objectStore.createIndex("name", "name", { unique: false });

    objectStore.createIndex("email", "email", { unique: true });

  }

}

dbConection();

async function addUser() {
 
  const transaction = db.transaction("user", "readwrite");

  const users = transaction.objectStore("user");

  const user = await createUser();

  users.add(user);

  // transaction.oncomplete = () => {
  //   alert("usuario cadastrado")
  // }
  transaction.onerror = () => {
    alert("user and/or email already register")
  }

}


async function sendForm(event) {
  event.preventDefault();

  const submitButton = document.getElementById("submit-button");

  const loadingRing = document.getElementById("loading-ring");
  const buttonTitle = document.getElementById("button-title");


  buttonTitle.style.visibility = "hidden";
  loadingRing.style.visibility = "visible";
  
  addUser();

  setTimeout(()=> {
    buttonTitle.style.visibility = "visible";
    loadingRing.style.visibility = "hidden";
  }, 2000)


}













document.addEventListener('DOMContentLoaded', function () {

  dbConection2(() => {
    getUserData((info) => {
      insertData(info)
    })
  
  });

});



function dbConection2(callback) {

  if(db) {
    callback();
    return;
  }

  const request  = indexedDB.open('simpleForm-db', 1);

  request.onsuccess = (e) => {
    db = e.target.result;
    callback();
  }

  request.onupgradeneeded = (e) => { 
    db = e.target.result;
  
    var objectStore = db.createObjectStore("user", { keyPath: "id" });
    
    objectStore.createIndex("name", "name", { unique: false });

    objectStore.createIndex("email", "email", { unique: true });

  }

}



function getUserData(callback) {
  const transaction = db.transaction("user", "readwrite");

  const users = transaction.objectStore("user");

  const gelAllUsers = users.getAll();

  gelAllUsers.onsuccess = (e) => {
    // insertData(e.target.result);
    callback(e.target.result);
  }

}

// function returnData(data) {
//   console.log(data[0]);
// }


function insertData(data) {

  const wrapper = document.getElementById("users-list");

  data.map((user)=> {
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

    //delete user

    const deleteButton = document.createElement("a");
    const deleteButtonContent = document.createTextNode("x");
    deleteButton.appendChild(deleteButtonContent);
    deleteButton.id = `delete-user ${user.id}`;
    userDiv.appendChild(deleteButton);

    const deleteButtonDom = document.getElementById(`delete-user ${user.id}`);
    deleteButtonDom.addEventListener("click", function(){deleteUser(user.id)});

  })


}




function deleteUser(userId) {

  const transaction = db.transaction("user", "readwrite");

  const users = transaction.objectStore("user");

  const request = users.delete(userId);

  request.onsuccess = (e) => {
    alert("User deleted");
  }

}
