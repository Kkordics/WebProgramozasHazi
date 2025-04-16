function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("location").innerHTML = "A böngésző nem támogatja a geolocation API-t.";
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    document.getElementById("location").innerHTML = 
        "Szélesség: " + latitude + "<br>Hosszúság: " + longitude;
    
    const destinationLat = 46.8962; 
    const destinationLon = 19.6690; 
    
    const map = L.map('map').setView([latitude, longitude], 10);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup("Az Ön helyzete").openPopup();
    
    L.marker([destinationLat, destinationLon]).addTo(map)
        .bindPopup("Legjobb kajálda").openPopup();
    
    L.polyline([
        [latitude, longitude],
        [destinationLat, destinationLon]
    ], {color: 'blue'}).addTo(map);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("location").innerHTML = "Felhasználó elutasította a helymeghatározást.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("location").innerHTML = "A helyzetadatok nem érhetők el.";
            break;
        case error.TIMEOUT:
            document.getElementById("location").innerHTML = "Időtúllépés történt a helyzet meghatározásakor.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("location").innerHTML = "Ismeretlen hiba történt.";
            break;
    }
}
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const destinationLat = 46.8953;
    const destinationLon = 19.6680;

    
    const R = 6371; 
    const dLat = toRad(destinationLat - latitude);
    const dLon = toRad(destinationLon - longitude);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(latitude)) * Math.cos(toRad(destinationLat)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 
    
    
    const deliverySpeed = 30;
    const deliveryTime = (distance / deliverySpeed) * 60; 

    document.getElementById("delivery-time").innerHTML = 
        "Kb. " + Math.round(deliveryTime) + " perc";
    
    const map = L.map('map').setView([latitude, longitude], 10);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup("Az Ön helyzete").openPopup();
    
    L.marker([destinationLat, destinationLon]).addTo(map)
        .bindPopup("Legjobb Kajálda").openPopup();
    
    L.polyline([
        [latitude, longitude],
        [destinationLat, destinationLon]
    ], {color: 'blue'}).addTo(map);
}

function toRad(deg) {
    return deg * (Math.PI / 180);
}


document.addEventListener("DOMContentLoaded", function () {
    
    if (window.location.pathname.includes("rolunk.html")) {
        //console.log("Rólunk oldal aktív");

        const chartElement = document.getElementById('myChart');
        if (chartElement) {
            //console.log("Canvas elem létezik, inicializáljuk a Chart.js-t");
            const ctx = chartElement.getContext('2d');
            
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Szeptember','Október','November','December','Január', 'Február', 'Március', 'Május'],
                    datasets: [{
                        label: 'Látogatottság',
                        data: [280,252,302,310,423,481,468,521],
                        borderColor: 'green',
                        backgroundColor: 'rgba(0, 128, 0, 0.2)',
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        } else {
            console.error("HIBA: Az #myChart elem nem található!");
        }

        // SSE betöltése
        if (typeof(EventSource) !== "undefined") {
            //console.log("SSE támogatott");
            const eventSource = new EventSource("traffic.php");

            eventSource.onmessage = function(event) {
                //console.log("Új adat érkezett:", event.data);
                document.getElementById("traffic").textContent = "Mai Látogatottság: " + event.data.toString();
            };

            /*eventSource.onerror = function() {
                console.error("HIBA: SSE nem működik!");
                document.getElementById("traffic").textContent = "Probléma akadt a SSE api-val!";
                document.getElementById("traffic").style.color = "Red";
                eventSource.close();
            };*/
        } else {
            console.warn("SSE nem támogatott ebben a böngészőben");
            document.getElementById("traffic").textContent = "A böngésző nem támogatja a SSE api-t!";
        }
    }
});




function drag(ev){
    ev.dataTransfer.setData("text", ev.target.id);
    
}

var vendegek_szama = 0;
function drop(ev){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
   
    try{
        var name = document.getElementById(data).querySelector("textarea").value;
        vendegek_szama++;
        document.getElementById(data).querySelector("textarea").value = "Vendég "+(vendegek_szama+1).toString()
        document.getElementById(data).id = "vendeg"+vendegek_szama.toString();
    }catch{
        var name = document.getElementById(data).querySelector("p").innerHTML;
        document.getElementById(data).querySelector("p").innerHTML = "";
    }
    
    
    //console.log(name);
    ev.currentTarget.querySelector("p").innerHTML = name;
    //console.log(ev.currentTarget.querySelector("p").innerHTML);
    
    //ev.target.appendChild(document.getElementById(data));
    storeCurrecntState();
}
function removeDrop(ev){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    try{
        document.getElementById(data).querySelector("p").innerHTML = "";   
        storeCurrecntState();
    }catch{

    }
}
function allowDrop(ev){
    ev.preventDefault();
}

function asztalRend(){
    if(asztalEll()){
        var foglalt_szekek = 0;
        for(let i = 1; i <= 48;i++){
            if(document.getElementById("szek"+i.toString()).querySelector("p").innerHTML != ""){
                foglalt_szekek++;
            }
        }
        if(foglalt_szekek > 0){
           
            document.getElementById("rendeles_visszajelzes").style.visibility = "visible";
            document.getElementById("a_rend_hiba").innerHTML = "";
            localStorage.clear();
        }else{
            document.getElementById("a_rend_hiba").innerHTML = "*Nincs kiválasztott ülésrend!";
        }
       
    }else{
        document.getElementById("rendeles_visszajelzes").style.visibility = "hidden";
    }
}
function asztalEll(){
    var hiba = document.getElementById("a_rend_hiba");
    //kitöltött mezők ell
    if(document.getElementById("a_rend_nev").value == ""){
        hiba.innerHTML = "*Nincs minden mező kitöltve!";
        return false;
    }
    if(document.getElementById("a_rend_email").value == ""){
        hiba.innerHTML = "*Nincs minden mező kitöltve!";
        return false;
    }
    if(document.getElementById("a_rend_tel").value == ""){
        hiba.innerHTML = "*Nincs minden mező kitöltve!";
        return false;
    }
    if(!document.getElementById("a_rend_date").value){
        hiba.innerHTML = "*Nincs minden mező kitöltve!";
        return false;
    }
    hiba.innerHTML = "";
    storeCurrecntState();
    return true;
}


//Local storage, elementi az adott állapotát az oldal értékainek
function storeCurrecntState(){
    if (typeof(Storage) !== "undefined"){
        localStorage.clear();
        //input mezők
        localStorage.setItem("a_rend_nev", document.getElementById("a_rend_nev").value);
        localStorage.setItem("a_rend_email", document.getElementById("a_rend_email").value);
        localStorage.setItem("a_rend_tel", document.getElementById("a_rend_tel").value);
        localStorage.setItem("a_rend_date", document.getElementById("a_rend_date").value);
        
        //Székek
        for(let i = 1;i <=48;i++){
            if(document.getElementById("szek"+i.toString()).querySelector("p").innerHTML != ""){
                localStorage.setItem("szek"+i.toString(), document.getElementById("szek"+i.toString()).querySelector("p").innerHTML);
                //console.log("asd");
            }
        }
    }else{
        console.error("A böngésző nem támogatja a local storage funkciót!");
    }
}

function restoreCurrentSTate(){
        document.getElementById("a_rend_nev").value = localStorage.getItem("a_rend_nev");
       document.getElementById("a_rend_email").value = localStorage.getItem("a_rend_email");
       document.getElementById("a_rend_tel").value = localStorage.getItem("a_rend_tel");
       document.getElementById("a_rend_date").value = localStorage.getItem("a_rend_date");

       for(let i = 1;i <=48;i++){
            document.getElementById("szek"+i.toString()).querySelector("p").innerHTML = localStorage.getItem("szek"+i.toString());
            //console.log(i);
        }
};


window.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname === "/asztal_fog.html") {
       restoreCurrentSTate();
       
    }
});

function menuAnimation(){
    const circle = document.getElementById("login_circle");
    circle.classList.add("animate_login_circle");
    
    setTimeout(() => {
        circle.style.transform = "scale(2)";
        document.getElementById("login").style.visibility = "visible";
      }, 300);
}
function resetAnimation(){
    document.getElementById("login").style.visibility = "hidden";
    document.getElementById("login_circle").classList.remove("animate_login_circle");
    document.getElementById("login_circle").style.transform = "scale(0)";
}
function login(){
    if(document.getElementById("login_text").value == "admin" && document.getElementById("login_pass").value == "admin"){
        //console.log("Tudja a jelszót");
        window.open("admin.html","_parent");
    }
}

var webWorker;
window.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname === "/admin.html") {
        if(typeof(Worker) !== "undefined") {
            if(typeof(w) == "undefined") {
              w = new Worker("countdown.js");
            }
            w.onmessage = function(event) {
             
              if (event.data.done) {
                window.alert("A munka menet lejárt! \nVissza irányítás a fő menüre.");
                window.open("index.html","_parent");
                // Handle the end of the countdown (e.g., display a message)
                } else {
                    const { minutes, seconds } = event.data;
                    //console.log(`Time remaining: ${minutes}m ${seconds}s`);
                    document.getElementById("work_time").innerHTML = "0:"+minutes.toString()+":"+seconds.toString();
                    // Update your UI with the remaining time
                }
            };
          } else {
            document.getElementById("work_time").innerHTML = "Sorry, your browser does not support Web Workers...";
          }

        //crud load
        loadTable();
    }
});

function loadTable(){
    const table = this.document.getElementById("crud_table")
    
    table_clear();

    rendelesek.forEach(rendeles => {
        table.innerHTML += rendeles.describe();
    });
}

function reloadTable(){
    const rows = document.querySelectorAll("#crud_table tr");
    let i = 0;
    rows.forEach((row, index) => {
        if(index >0){
            i = index-1;
            
            if(i<rendelesek.length){
                rendelesek.id = i;
                row.innerHTML = rendelesek[i].describe();
            }else{//törli az utolsó sort ha kell
                if((rows.length-1)>rendelesek.length){
                
                    row.remove();
                }
            }
        }
        
      });
      
}

class Rendeles{
    constructor(id, name, food, date, debt, disabled) {
        this.id = id;
        this.name = name;
        this.food = food;
        this.date = date;
        this.debt = debt;
        this.disabled = disabled;
    }
    describe() {
        if(this.disabled){
            return `<tr>
                    <td><input type="number" minlength="5" maxlength="20" onchange="table_change(this)" class="crud_area"  value=${this.id}></td>
                    <td><input type="text" minlength="5" maxlength="20" onchange="table_change(this)" class="crud_area"  value="${this.name}"></td>
                    <td><input type="text" minlength="5" maxlength="20" onchange="table_change(this)" class="crud_area"  value="${this.food}"></td>
                    <td><input type="datetime-local" minlength="5" maxlength="20" onchange="table_change(this)" class="crud_area"  value=${this.date}></td>
                    <td><input type="number" minlength="5" maxlength="20" onchange="table_change(this)" class="crud_area"  value=${this.debt}></td>
                    <td><button value=${this.id} onclick="table_removeRow(this)">Törlés</button></td>
                    <td><button value=${this.id} onclick="table_allowEdit(this)" >Szerkesztés</button></td>
                </tr>`;
        }else{
            return `<tr>
                    <td><input type="number" minlength="5" maxlength="20" onchange="table_change(this)" class="crud_area" disabled="false" value=${this.id}></td>
                    <td><input type="text" minlength="5" maxlength="20" onchange="table_change(this)" class="crud_area" disabled="false" value="${this.name}"></td>
                    <td><input type="text" minlength="5" maxlength="20" onchange="table_change(this)" class="crud_area" disabled="false" value="${this.food}"></td>
                    <td><input type="datetime-local" minlength="5" maxlength="20" onchange="table_change(this)" class="crud_area" disabled="false" value=${this.date}></td>
                    <td><input type="number" minlength="5" maxlength="20" onchange="table_change(this)" class="crud_area" disabled="false" value=${this.debt}></td>
                    <td><button value=${this.id} onclick="table_removeRow(this)" >Törlés</button></td>
                    <td><button value=${this.id} onclick="table_allowEdit(this)" >Szerkesztés</button></td>
                </tr>`;
        }

        
      }
}

let rendelesek = [
    new Rendeles(0,"Ferenc", "Pizza", "2025-04-15T20:52", 0,false),
    new Rendeles(1,"Sanyi", "Burger", "2025-04-15T20:53",2100, false),
    new Rendeles(2,"Péter", "Keksz", "2025-05-15T20:53",6000, false),
    new Rendeles(3,"Elek asd", "Rakott kell bab", "2025-05-15T20:53",0, false),
]

function table_allowEdit(button){
    
    rendelesek.forEach(rendeles => {
        if(rendeles.id == button.value){
            rendeles.disabled = true;
        }else{
            rendeles.disabled = false;
        }
    });
    reloadTable();
}
function table_removeRow(button){

    rendelesek.forEach((rendeles,index) => {
        if(rendeles.id == button.value){
           
            rendelesek.splice(index, 1);
        }
    });

    
    reloadTable();
}

function table_change(input){
    const inputs = document.querySelectorAll(".crud_area");
    let i = 0;
    let selected_inputs = [];
    inputs.forEach((input, index) => {
        //console.log(input.disabled);
        if(input.disabled == false){
            //console.log(input.value);
            selected_inputs.push(input);
        }
        
    });
    rendelesek.forEach(rendeles => {
        if(rendeles.disabled == true){
            //console.log(rendeles);
            rendeles.id = selected_inputs[0].value;
            rendeles.name = selected_inputs[1].value;
            rendeles.food = selected_inputs[2].value;
            rendeles.date = selected_inputs[3].value;
            rendeles.debt = selected_inputs[4].value;
            return;
        }
    });
}


function table_sort(button){
    
    switch(button.value){
        case "id":{
            rendelesek.sort((a, b)=> a.id - b.id);
            break;
        }
        case "name":{
            rendelesek.sort((a, b) => a.name.localeCompare(b.name));
            break;
        }
        case "food":{
            rendelesek.sort((a, b) => a.food.localeCompare(b.food));
            break;
        }
        case "date":{
            rendelesek.sort((a, b) => new Date(a) - new Date(b));
            break;
        }
        case "debt":{
            rendelesek.sort((a, b)=> a.debt - b.debt);
            break;
        }
    }
    
    reloadTable();
}

function table_clear(){
    const table = this.document.getElementById("crud_table")
    table.innerHTML = '<tr><th><button onclick="table_sort(this)" value="id" class="sort_btn">ID</button></th><th><button onclick="table_sort(this)" value="name" class="sort_btn">Név</button></th><th><button onclick="table_sort(this)" value="food" class="sort_btn">Étel</button></th><th><button onclick="table_sort(this)" value="date" class="sort_btn">Dátum</button></th><th><button onclick="table_sort(this)" value="debt" class="sort_btn">Tartozás</button></th></tr>';
}

function table_search(value){
    
    if(value.value !== ""){
        let output = [];
        rendelesek.forEach((rendeles,index) => {
            if([...value.value].every(char=>rendeles.id.toString().includes(char))){
                output.push(rendeles);
            }else if([...value.value].every(char=>rendeles.name.includes(char))){
                output.push(rendeles);
            }else if([...value.value].every(char=>rendeles.food.includes(char))){
                output.push(rendeles);
            }else if([...value.value].every(char=>rendeles.date.toString().includes(char))){
                output.push(rendeles);
            }else if([...value.value].every(char=>rendeles.debt.toString().includes(char))){
                output.push(rendeles);
            }
        });
        const table = this.document.getElementById("crud_table")
        table_clear();
        output.forEach(rendeles => {
            table.innerHTML += rendeles.describe();
        });
    }else{
        
        loadTable();
    }
    
}
function table_add(){
    const inputs = document.querySelectorAll(".crud_input");
    let empty_space = 0;
    inputs.forEach((input,index) => {
        if(input.value === "" && index >0){
            empty_space++;
        }
    });
    
    

    if(empty_space > 1){
        alert("Ki nem töltött mező!");
        return;
    }else{
        
        let maxId = Math.max(...rendelesek.map(r => r.id))+1;
        const uj = new Rendeles(maxId, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value);
        rendelesek.push(uj);
    }
    loadTable();
    inputs.forEach((input,index) => {
        if(index >0){
            input.value =""; 
        }
    });
}