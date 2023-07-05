//[IP Geolocation API by IPify](https://geo.ipify.org/). 
//To generate the map, we recommend using [LeafletJS](https://leafletjs.com/).

const ipifyApiKey = "at_orYhYr8XFPqwQqAbQnC1aRcG4wWRb";
let ipAddress = "8.8.8.8";


const [form, searchBar, submit] = [$("form"), $("#ip-search"), $("button")];
const [ipAddressP, locationP, timezoneP, ispP] = [$(".ip-address p"), $(".location p"), $(".timezone p"), $(".isp p")];

form.submit(e => {
    e.preventDefault();
    searchValue = searchBar.val();
    searchData(searchValue);
    searchBar.val("");
})

let searchData = (searchValue) => {
    ipAddress = searchValue;
    let ipifyUrl = `https://geo.ipify.org/api/v2/country?apiKey=${ipifyApiKey}&ipAddress=${ipAddress}`; 
    fetch(ipifyUrl)
    .then(response => response.json())
    .then(data => {
    ipAddressP.text(data.ip);
    locationP.text(`${data.location.region}, ${data.location.country}`);
    timezoneP.text(`UTC ${data.location.timezone}`);
    ispP.text(data.isp);
});
}

searchData(ipAddress);


