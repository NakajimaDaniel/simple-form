

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


function sendForm() {
  
}

