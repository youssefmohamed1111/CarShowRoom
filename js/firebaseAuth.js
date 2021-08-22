var config = {
    apiKey: "AIzaSyB_Nglab4XFv5WuzSuUoUg0MTDSehDgUJk",
  authDomain: "assistprodatabase.firebaseapp.com",
  databaseURL: "https://assistprodatabase.firebaseio.com",
  projectId: "assistprodatabase",
  storageBucket: "assistprodatabase.appspot.com",
  messagingSenderId: "856578818550",
  appId: "1:856578818550:web:05ec5bca2bc7506ce187d7",
  measurementId: "G-KZTWDND21M"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {

  var addBtn = document.getElementById('addNewCarBtn')
  
  if(addBtn)
    addBtn.style.visibility = user && user.uid == '2tKrwK81DbODzPMowafneRu18rD2' ? 'visible' : 'hidden';
    
  document.getElementById("login_link").innerText = user? user.email : 'login';
});


