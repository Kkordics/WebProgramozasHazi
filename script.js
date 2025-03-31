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
    console.log("DOM betöltődött");
    
    if (window.location.pathname.includes("rolunk.html")) {
        console.log("Rólunk oldal aktív");

        const chartElement = document.getElementById('myChart');
        if (chartElement) {
            console.log("Canvas elem létezik, inicializáljuk a Chart.js-t");
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
            console.log("SSE támogatott");
            const eventSource = new EventSource("traffic.php");

            eventSource.onmessage = function(event) {
                console.log("Új adat érkezett:", event.data);
                document.getElementById("traffic").textContent = "Mai Látogatottság: " + event.data.toString();
            };

            eventSource.onerror = function() {
                console.error("HIBA: SSE nem működik!");
                document.getElementById("traffic").textContent = "Probléma akadt a SSE api-val!";
                document.getElementById("traffic").style.color = "Red";
                eventSource.close();
            };
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
        //input mezők
        localStorage.setItem("a_rend_nev", document.getElementById("a_rend_nev").value);
        localStorage.setItem("a_rend_email", document.getElementById("a_rend_email").value);
        localStorage.setItem("a_rend_tel", document.getElementById("a_rend_tel").value);
        localStorage.setItem("a_rend_date", document.getElementById("a_rend_date").value);
        
        //Székek
        for(let i = 1;i <=48;i++){
            if(document.getElementById("szek"+i.toString()).querySelector("p").innerHTML != ""){
                localStorage.setItem("szek"+i.toString(), document.getElementById("szek"+i.toString()).querySelector("p").innerHTML);
                console.log("asd");
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
        console.log("Tudja a jelszót");
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
    }
});

