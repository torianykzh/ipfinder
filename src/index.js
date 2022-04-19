import 'leaflet/dist/leaflet.css'
import 'babel-polyfill'
import L from 'leaflet'
import {addOffset, addTileLayer,getAddress,validateIp} from './helpers'
import icon from '../images/icon-location.svg'

const ipInput = document.querySelector(".search-bar__input")
const btn = document.querySelector(".search-bar__btn")
const ipInfo = document.querySelector('#id')
const locationInfo = document.querySelector('#location')
const timezoneInfo = document.querySelector('#timezone')
const ispInfo = document.querySelector('#isp')
const mapArea = document.querySelector('.map')

const map = L.map(mapArea,{
    center: [51.505, -0.09],
    zoom: 13,
});

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30,40],
})
addTileLayer(map)
L.marker([51.505, -0.09], {icon: markerIcon}).addTo(map)


btn.addEventListener("click", getData)
ipInput.addEventListener('keydown', handleKey)
function handleKey(event){
    if(event.key === 'Enter'){
        getData()
    }
}
function getData(){
    if (validateIp(ipInput.value)){
        getAddress(ipInput.value)
            .then(setInfo)
    }
}
function setInfo(setInfo){
    const {lat, lng, country, city, timezone} = setInfo.location
    console.log(setInfo)
    ipInfo.innerText = setInfo.ip;
    locationInfo.innerText = setInfo.location.region+' '+ country;
    timezoneInfo.innerText = timezone;
    ispInfo.innerText = setInfo.isp

    map.setView([lat, lng])
    L.marker([lat, lng], {icon: markerIcon}).addTo(map)
    if(matchMedia("(max-width: 1023px)").matches)(
        addOffset(map)
    )
}

document.addEventListener('DOMContentLoaded', ()=>{
    getAddress('122.22.222.1').then(setInfo)
})