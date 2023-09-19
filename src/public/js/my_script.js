/* const api_key =
  "live_NwayuDj41G5N2KutBkCObfTFw9lFVd26IRVIcjjmhqvLHxWfKU182CxItSMXAOWd"; */
console.log("API CONECTADO")

const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=4";

const API_URL_FAVOTITES =
  "https://api.thecatapi.com/v1/favourites?api_key=live_NwayuDj41G5N2KutBkCObfTFw9lFVd26IRVIcjjmhqvLHxWfKU182CxItSMXAOWd";

const API_URL_FAVOURITES_DELETE = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_NwayuDj41G5N2KutBkCObfTFw9lFVd26IRVIcjjmhqvLHxWfKU182CxItSMXAOWd`;

const spanError = document.getElementById("error");

const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");

async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log("Random");
  console.log(data);
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const img3 = document.getElementById("img3");
    const img4 = document.getElementById("img4");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");
    const btn4 = document.getElementById("btn4");
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    img4.src = data[3].url;
    btn1.onclick = () => saveFavouriteMichi(data[0].id);
    btn2.onclick = () => saveFavouriteMichi(data[1].id);
    btn3.onclick = () => saveFavouriteMichi(data[2].id);
    btn4.onclick = () => saveFavouriteMichi(data[3].id);
  }
}

async function loadFavouriteMichis() {
  const res = await fetch(API_URL_FAVOTITES);
  const data = await res.json();
  console.log("Favoritos");
  console.log(data);
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    const section = document.getElementById("favoriteMichis");
    section.innerHTML = "";
    // const h2 = document.createElement("h2");
    // h2.classList.add("text-warning");
    // const h2Text = document.createTextNode("Michis favoritos");
    // h2.appendChild(h2Text);
    // section.appendChild(h2);
    data.forEach((michi) => {
      const article = document.createElement("article");
      const img = document.createElement("img");

      // const btn = document.createElement("button");
      // const btnText = document.createTextNode("Sacar al michi de favoritos");

      // Crear un elemento SVG
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "16");
      svg.setAttribute("height", "16");
      svg.setAttribute("viewBox", "0 0 16 16");
      svg.setAttribute("fill-rule", "evenodd");
      svg.setAttribute("fill", "currentColor");

      svg.classList.add("bi", "bi-heart-fill");

      // Crear un elemento <path> y definir el atributo 'd' con los datos del camino SVG
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute(
        "d",
        "M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
      );

      // Agregar el elemento <path> al elemento SVG

      img.src = michi.image.url;
      svg.onclick = () => deleteFavouriteMichi(michi.id);
      article.appendChild(img);
      // article.appendChild(btn);
      svg.appendChild(path);
      article.appendChild(svg);
      section.appendChild(article);

      // estilos
      article.style.padding = "8px";
      article.style.position = "relative";

      section.style.display = "flex";
      section.style.flexWrap = "wrap";
      section.style.alignItems = "center";
      section.style.justifyContent = "center";
      // section.style.justifyContent = "space-between";

      article.style.display = "flex";
      article.style.alignItems = "center";
      article.style.justifyContent = "center";
      article.style.maxWidth = "100%";
      article.style.padding = "4px";

      // article.style.alignItems = "center";
      img.style.width = "300px";
      img.style.height = "200px";
      // img.style.marginRight = "10px";
      // img.style.margin("auto");
      img.classList.add("rounded", "d-block");
      // img.classList.add("image rounded mx-auto d-block")
      // section.style.position = "relative";
      svg.style.zIndex = "100";
    });
  }
}

async function saveFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOTITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const data = await res.json();
  console.log("Save");
  console.log(res);
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("Michi guardado en favoritos");
    /*  btn.classList.remove("bi-heart");
    btn.setAttribute("height", "16");
    btn.setAttribute("width", "16");
    btn.setAttribute("viewBox", "0 0 16 16");
    btn.setAttribute("fill-rule", "evenodd");
    btn.setAttribute("fill", "currentColor");
    btn.classList.add("bi", "bi-heart-fill");

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    path.setAttribute(
      "d",
      "M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
    );
    btn.appendChild(path);
 */
    loadFavouriteMichis();
  }
}

async function deleteFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
    method: "DELETE",
  });
  const data = await res.json();
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("Michi eliminado de favoritos");
    loadFavouriteMichis();
  }
}

loadRandomMichis();
loadFavouriteMichis();
