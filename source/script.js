//[IP Geolocation API by IPify](https://geo.ipify.org/). 
//To generate the map, we recommend using [LeafletJS](https://leafletjs.com/).

const ipifyApiKey = "at_orYhYr8XFPqwQqAbQnC1aRcG4wWRb";
let ipAddress = "8.8.8.8";

const [form, searchBar, submit] = [$("form"), $("#ip-search"), $("button")];
const [ipAddressP, locationP, timezoneP, ispP] = [$(".ip-address p"), $(".location p"), $(".timezone p"), $(".isp p")];

let map = L.map("map", {zoomControl: false});

form.submit(e => {
    e.preventDefault();
    searchValue = searchBar.val();
    searchData(searchValue);
    searchBar.val("");
})

let searchData = (searchValue) => {
    ipAddress = searchValue;
    let ipifyUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${ipifyApiKey}&ipAddress=${ipAddress}`;
    fetch(ipifyUrl)
    .then(response => response.json())
    .then(data => {
        ipAddressP.text(data.ip);
        locationP.text(`${data.location.region}, ${data.location.country}`);
        timezoneP.text(`UTC ${data.location.timezone}`);
        ispP.text(data.isp);
        let lat = data.location.lat;
        let lng = data.location.lng;
        generateMap(lat, lng);
    });
}

let generateMap = (lat, lng) => {
    map.setView([lat, lng], 13)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    console.log(L.Icon.Default.prototype._getIconUrl());

    let blackIcon = L.icon({
        iconUrl: "./source/images/icon-location.svg",
        iconSize: [50, 60],
        iconAnchor: [lat, lng]
    });


    let marker = L.marker([lat, lng], {icon: blackIcon}).addTo(map);
}


searchData(ipAddress);


