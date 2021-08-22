var db = firebase.firestore();

hashSplit = location.hash.substr(1).split('-');
carcollection = hashSplit[0];
carindex = hashSplit[1];
isAdd = hashSplit[2] == 'add';
isEdit = hashSplit[2] == 'edit';

firebase.auth().onAuthStateChanged(function(user) {
    if (!user && (isEdit  || isAdd)) {
        
        window.alert("You haven't signed in yet..");
        
      } else {
      
      if((user.uid != "2tKrwK81DbODzPMowafneRu18rD2") && (isEdit  || isAdd))
      {
          window.alert("Your account doesn't have the privileges to edit or add any cars..");
      }
      else {
            
      if(isAdd)
      {
          var carName = prompt("Car name:");
          var carPrice = prompt("Car price:");
          var carDesc = prompt("Car desc:");
          var carThumbnail = prompt("Car thumbnail:");
      
          //He wants to edit a specific car
          // Add a new document in collection "cities"
          db.collection(carcollection).doc(carindex).set({
              name: carName,
              price: carPrice,
              desc: carDesc,
              thumbnail: carThumbnail
          })
          .then(() => {
              console.log("Document successfully written!");
              window.location.href = window.location.href.substring(0, window.location.href.length - (5 + carindex.length));
      
          })
          .catch((error) => {
              console.error("Error writing document: ", error);
          }); 
      
          
      }
      else if(isEdit)
      {
          db.collection(carcollection).doc(carindex).get().then(doc => {
              var carName = prompt("Car name:", doc.data().name);
              var carPrice = prompt("Car price:", doc.data().price);
              var carDesc = prompt("Car desc:", doc.data().desc);
              var carThumbnail = prompt("Car thumbnail:", doc.data().thumbnail);
      
              //He wants to edit a specific car
              // Add a new document in collection "cities"
              db.collection(carcollection).doc(carindex).set({
                  name: carName,
                  price: carPrice,
                  desc: carDesc,
                  thumbnail: carThumbnail
              })
              .then(() => {
                  console.log("Document successfully written!");
                  window.location.href = window.location.href.substring(0, window.location.href.length - (6 + carindex.length));
                 
      
              })
              .catch((error) => {
                  console.error("Error writing document: ", error);
              }); 
      
          })
      }
      }}
});


function rigesterNewCar()
{
    if(window.location.hash == '')
    {
        alert("Please select a car brand first and try again..");
        return;
    }

    carid = prompt("Type the new car id");


    if(carid == null)
        return;
    window.location.hash += '-' + carid + '-add';
    location.reload();
}
//  
var collectionRef = db.collection(carcollection)

collectionRef.get().then(snapshot => {
    snapshot.forEach(doc => {

        const user = firebase.auth().currentUser;

        var toggleClass = 'favourite'

        function createElement() {
            document.getElementById('list-holder').innerHTML+= `
        <li>
        <div class="box">
        <div class="img">
        <a href="/bmw-218-2020 New Generation"><img src="./../pics/` + doc.data().thumbnail + `" alt="img"></a>
        </div>
        <div class="formtxt"> <h2>  `+ doc.data().name + `<p>` + doc.data().price + `$<br><br>` + doc.data().desc + `</p></div> 
        <button type="button" class="`+ toggleClass +`" onclick="toggleFav(this, '`+ carcollection + doc.id +`')"></button>
            </div>
        </li>`;
        }

        if(user)
        {
            var query = firebase.database().ref('users/' + user.uid).orderByKey();
            var qureyResult = query.once("value")
            .then(function(snapshot) {
                
            return snapshot.forEach(function(childSnapshot) {
            var pkey = childSnapshot.key; 
            var chval = childSnapshot.val();
    
            //check if remove this child
                if(chval.favCarId ==  carcollection + doc.id){
                    return true;
                }
    
                });
            }).then(result => {
                if(result)
                toggleClass ='favouriteToggeled';
                createElement();
            });
        }
        else 
            createElement();

    });
});


async function toggleFav(element, carId)
{
    const userId = await firebase.auth().currentUser.uid;
    
    if(element.classList.contains('favourite'))
    {
        firebase.database().ref('users/' + userId).push().set({
            favCarId: carId
        });

        element.classList.remove('favourite');
        element.classList.add('favouriteToggeled');
    }
    else 
    {
        element.classList.add('favourite');
        element.classList.remove('favouriteToggeled');

        var query = firebase.database().ref('users/' + userId).orderByKey();
        query.once("value")
        .then(function(snapshot) {
            
        snapshot.forEach(function(childSnapshot) {
        var pkey = childSnapshot.key; 
        var chval = childSnapshot.val();

        //check if remove this child
        if(chval.favCarId == carId){
            firebase.database().ref().child("users/"+ userId + "/" + pkey).remove();
        }

         });
        });
    }
}