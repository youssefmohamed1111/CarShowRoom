firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
  
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
        document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
      }
  
    } else {
      // No user is signed in.
  
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "block";
  
    }
  });


function login(){
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
  
      // ...
    });
  
  }

  function register(){
    var userEmail = document.getElementById("email_field").value;
    var userPass1 = document.getElementById("password_field1").value;
    var userPass2 = document.getElementById("password_field2").value;

    if(userPass1 != userPass2)
    {
      alert("User password doesn't match..");
      return;
    }
  
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass1)
    .then((userCredential) => {
    // Signed in
    alert("You have created a new account, Welcome: " + userEmail); 
    var user = userCredential.user;
    // ...
    })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    console.error(errorMessage);
    // ..
  });
  }
  
  function logout(){
    firebase.auth().signOut();
  }
  