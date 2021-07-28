

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


async function sendForm() {


  const submitButton = document.getElementById("submit-button");

  const loadingRing = document.getElementById("loading-ring");
  const buttonTitle = document.getElementById("button-title");


  buttonTitle.style.visibility = "hidden";
  loadingRing.style.visibility = "visible";

  const user = await createUser();

  setTimeout(()=> {
    buttonTitle.style.visibility = "visible";
    loadingRing.style.visibility = "hidden";
  }, 2000)


  console.log(user)

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