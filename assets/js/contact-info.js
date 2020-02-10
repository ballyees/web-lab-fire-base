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
var count_gender = { 'm': 0, 'f': 0, 'e': 0 }



db.collection('contact').orderBy("date").onSnapshot(querySnapshot => {

    let table = $('table')[0]

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
        srow.innerHTML = `<div><button class="btn btn-primary" type="button" data-target="#modal" data-toggle="modal" onclick="clickModal('view${counter}')">View</button></div>`
            // srow.textContent = doc.data().name;
        console.log(`${doc.id} => ${doc.data()}`);
        count_gender[doc.data().gender] += 1
        values_db['view' + (counter)] = doc.data()
        values_db['view' + (counter++)]['id'] = doc.id
    });

    if (Object.keys(values_db).length > 0) {
        document.getElementById('display_tb').style['visibility'] = ''
            // draw chart
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);
        // end draw

        // update stat
        document.getElementById('male_stat').innerText = count_gender['m']
        document.getElementById('female_stat').innerText = count_gender['f']
        document.getElementById('other_stat').innerText = count_gender['e']
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

function drawChart() {

    var data = google.visualization.arrayToDataTable([
        ['Gender', 'Data'],
        ['Male', count_gender['m']],
        ['Female', count_gender['f']],
        ['Other', count_gender['e']]
    ]);

    var options = {
        title: 'genders in contact',
        width: '100%',
        height: '100%'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}