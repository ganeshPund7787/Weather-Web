//  Theam of web
const locations = document.querySelector(".location");
const time = document.querySelector(".time p span");
const img = document.querySelector(".img-box img");
const temp = document.querySelector("#temp");
const fills_l = document.querySelector(".fills-l");
const TempUnit = document.querySelector(".temp-unit");
const msg_text = document.querySelector(".msg-text");
const cloud = document.querySelector(".cloud");
const Humidity = document.querySelector(".Humidity");
const Visibilty = document.querySelector(".Visibilty");
const pressure = document.querySelector(".Pressure");
const Uv = document.querySelector(".Uv");

const input = document.querySelector("input");
const body = document.body;
const c_sym = document.querySelector(".c");
const f_sym = document.querySelector(".f");
const form = document.querySelector("form");

f_sym.addEventListener("click", () => {
    f_sym.classList.add("bg-dark");
    c_sym.classList.remove("bg-dark");
    fetchData(locations.innerHTML);
});
c_sym.addEventListener("click", () => {
    c_sym.classList.add("bg-dark");
    f_sym.classList.remove("bg-dark");
    fetchData(locations.innerHTML);
});


form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchData(input.value);
});

const fetchData = async (data) => {
    const responce = await fetch(`https://api.weatherapi.com/v1/current.json?key=5b27a6ef3547402582e62007222306&q=${data}`);
    const result = await responce.json();
    if (result.error) {
        alert(result.error.message);
    } else {
        showTemp(result);
    }
    input.value = "";
}

const showTemp = (result) => {
    msg_text.innerHTML= "";
    if (c_sym.classList.contains("bg-dark")) {
        temp.innerHTML = result.current.temp_c + " C";
        fills_l.innerHTML = result.current.feelslike_c + " c";
    } else {
        temp.innerHTML = result.current.temp_f + " F";
        fills_l.innerHTML = result.current.feelslike_f + " F ";
    }
    msg_text.innerHTML = result.current.condition.text;
    ShowBgImg(result.current.condition.text);
    locations.innerHTML = result.location.name + ", " + result.location.region + ", " + result.location.country;
    time.innerHTML = result.location.localtime;
    img.src = result.current.condition.icon;
    cloud.innerHTML = result.current.cloud;
    Humidity.innerHTML = result.current.humidity;
    Visibilty.innerHTML = result.current.vis_km;  //  visibility
    pressure.innerHTML = result.current.pressure_mb;
    Uv.innerHTML = result.current.uv; // ultraviolet (UV) radiation
}
const ShowBgImg = (msg) => {
    body.classList.remove(body.classList.item(0));// for Next change Img remove
    
    if (msg == "Sunny") body.classList.add("Sunny");
    else if(msg == "Cloudy" || msg == "Overcast")  body.classList.add("Cloudy");
    else if(msg == "rain" || msg == 'Patchy rain nearby' || msg == 'Light drizzle') body.classList.add("rain");
    else if(msg == "Light rain shower") body.classList.add("Light-rain");
    else if(msg == "Moderate or heavy rain with thunder") body.classList.add("heavy-rain");
    else if(msg == "Thundery outbreaks in nearby") body.classList.add("heavy-rain");
    else if(msg == "light-snow" || msg == "Heavy snow") body.classList.add("light-snow");
    else if(msg == "Heavy snow") body.classList.add("Heavy-snow");
    else if(msg == "Mist" || msg == 'fog') body.classList.add("Mist");// 
    else if(msg == "Partly cloudy" || msg == 'Partly Cloudy') body.classList.add("PartlyCloudy");
}


fetchData("Ahmednagar Maharashtra India");


