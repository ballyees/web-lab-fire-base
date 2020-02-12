// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyDkrVPg8LfG46CvRli63W_FpiosCSo_8Zw',
    authDomain: 'lab-fire-4ef24.firebaseapp.com',
    projectId: 'lab-fire-4ef24'
});
var values_db = {};
var db = firebase.firestore();
var genders = {
    'm': 'Male',
    'f': 'Female',
    'e': 'Other'
}

// Add a second document with a generated ID.
function submitBtn() {
    if ($('#name_input').val() == '') {
        alert('Name must be filled out')
        return false
    } else if ($('#email_input').val() == '') {
        alert('Email must be filled out')
        return false
    }
    db.collection("contact").add({
            name: $('#name_input').val(),
            gender: $('input[type=radio]:checked').val(),
            email: $('#email_input').val(),
            detail: $('#detail_input').val(),
            date: new Date()
        })
        .then(function(docRef) {
            document.getElementsByName('btnReset')[0].click()
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}

db.collection('contact').orderBy("date").onSnapshot(querySnapshot => {

    let table = $('table')[0]
    if ($('table')[0].innerHTML != '') {
        $('table')[0].innerHTML = ''
    }
    let counter = 1
    querySnapshot.forEach((doc) => {
        let row = table.insertRow(-1);
        row.id = `view${counter}`
        let frow = row.insertCell(0)
        let srow = row.insertCell(1)
        let data = doc.data().email
        let email = ''
        for (const key in data) {
            if (data[key] == '@' || data[key] == '.' || key == 0) {
                email += data[key]
            } else {
                email += 'x'
            }
        }
        frow.textContent = email;
        srow.innerHTML = `<div><button class="btn btn-primary" type="button" data-target="#modal" data-toggle="modal" onclick="clickModal('view${counter}')">View</button><span>&nbsp;&nbsp;</span><button class="btn btn-danger" type="button" onclick="deleteObj('view${counter}')">Delete</button></div>`
            // srow.textContent = doc.data().name;
        console.log(`${doc.id} => ${doc.data()}`);
        values_db['view' + (counter)] = doc.data()
        values_db['view' + (counter++)]['id'] = doc.id
    });

    if (Object.keys(values_db).length > 0) {
        document.getElementById('display_tb').style['visibility'] = ''
    }

});

function clickModal(e) {

    data = values_db[e]
        // console.log(values_db[e])
    let modal = $('.modal-body')[0]
    modal.innerHTML = `
    <h5>Name : ${data['name']}</h5>
    <h5>Gender : ${genders[data['gender']]}</h5>
    <h5>Email : ${data['email']}</h5>
    <h5>Detail : ${data['detail']}</h5>
    <h6>Timestamp(seconds) : ${data['date'].seconds}</h6>
    `
}

function deleteObj(e) {
    let con = confirm('Sure to delete?')
    if (con) {

        db.collection("contact").doc(values_db[e]['id']).delete().then(function() {
            document.getElementById(e).remove()
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }
    console.log(e)
}