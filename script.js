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

