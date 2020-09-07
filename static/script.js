//const userName = document.getElementById("Username");
//const password = document.getElementById("Password");
//const loginForm = document.getElementById("loginForm");
//
//loginForm.addEventListener("submit", (e) => {
//  e.preventDefault();
//});
var createAccount_bttn = document.querySelector(".createAccount-button");
var createAccount = document.querySelector(".createAccount-model");
var modelclose = document.querySelector(".model-close");
var eye = document.querySelector(".fa.fa-eye");
var pass = document.getElementById("createacc-passwd");
var indicator = document.querySelector(".indicator");
var strong = document.querySelector(".strong");
var medium = document.querySelector(".medium");
var weak = document.querySelector(".weak");
var password_message = document.querySelector(".password_message");

$(".createAccount-button").click(() => {
  createAccount.classList.add("createAccount-active");
});

// createAccount_bttn.addEventListener("click", () => {
//   createAccount.classList.add("createAccount-active");
// });

$(modelclose).click(() => {
  createAccount.classList.remove("createAccount-active");
});

$(eye).click(() => {
  if (pass.type == "password") x.type = "text";
  else pass.type = "password";
});

// $(document).ready(() => {
//   $("#register").submit((e) => {
//     e.preventDefault();
//     var name = $("#register-name").val();
//     var username = $("#register-username").val();
//     var email = $("#register-email").val();
//     var subrub = $("#register-suburb").val();
//     var passwd = $("#register-password").val();
//     var submit = $("#register-submit").val();

//     $("form-message").load("/createAcc", {
//       name: name,
//       username: username,
//       email: email,
//       subrub: subrub,
//       password: passwd,
//       submit: submit,
//     });
//   });
// });
$("#createacc-passwd").onkeyup(() => {
  if (pass.value != "") {
    indicator.style.display = "block";
    indicator.style.display = "flex";
  } else {
  }
});
