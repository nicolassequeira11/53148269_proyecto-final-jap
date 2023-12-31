const containerProduct = document.getElementById("container-product"); // Obtener el div para agregar la info del producto
const containerComment = document.getElementById("container-comments"); // Obtener el div para agregar los comentarios del producto

const productID = localStorage.getItem("productID"); // Obtener valor del localStorage productID
const urlProduct = "https://japceibal.github.io/emercado-api/products/" + productID + ".json"; // URL con los JSON de los productos
const urlComment = "https://japceibal.github.io/emercado-api/products_comments/" + productID + ".json"; // URL con los JSON de los comentarios

const productCatID = localStorage.getItem("catID"); // Obtener valor del localStorage catID
const containerProdsRel = document.getElementById("prodsRelContainer"); //Obtener el div para agregar los productos relacionados al producto
const urlCatProd = "https://japceibal.github.io/emercado-api/cats_products/" + productCatID + ".json"; // URL con los JSON de los productos relacionados

/* ---------- FETCH PRODUCT INFO ---------- */

fetch(urlProduct)
  .then((response) => response.json())
  .then((data) => {
    let productInfo = data; // Obtener la info de cada producto
    showProductInfo(productInfo);
  })
  /* Mensaje por si ocurre un error al cargar el fetch */
  .catch((error) => {
    console.error("Error al cargar los productos:", error);
  });

/* ---------- FETCH COMMENTS ---------- */

let commentHTML = "";

fetch(urlComment)
  .then((response) => response.json())
  .then((data) => {
    let commentInfo = data; // Obtener la info de cada producto
    showComments(commentInfo);
  });

/* Evento para añadir el nuevo comentario */
const url = "https://jsonplaceholder.typicode.com/users"; // API para enviar datos del formulario

let hoy = new Date(); // Obtener fecha actual
let date = hoy.toLocaleString("en-US"); // Formatear fecha

document.getElementById("commentForm").addEventListener("submit", (e) => {
  e.preventDefault();

  let newCommentHTML = ""; // Contenedor vacío en donde añadir nuevos comentarios

  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      score: document.getElementById("rating").value, // Puntuación
      description: document.getElementById("comment").value, // Comentario
      user: localStorage.getItem("usuario"), // Usuario
      dateTime: date,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((datos) => {
      /* Añadir elementos HTML del nuevo comentario */
      newCommentHTML += `
                    <div class="comment col-12 col-lg-11 m-auto ps-4">
                        <p class="py-2 m-auto mt-3"><strong>${datos.user}</strong> - ${datos.dateTime} -
                    `;
      for (let i = 1; i <= 5; i++) {
        if (i <= datos.score) {
          newCommentHTML += `<span class="fa fa-star checked"></span>`;
        } else {
          newCommentHTML += `<span class="fa fa-star"></span>`;
        }
      }
      newCommentHTML += ` 
                        </p>
                        <p class="desc m-auto py-2 mb-3">${datos.description} </p>
                    </div>
                    `;
      containerComment.innerHTML += newCommentHTML;
    });
});

/* ---------- FETCH PRODUCTOS RELACIONADOS ---------- */

fetch (urlCatProd)
    .then((response) => response.json())
    .then((data) => {
      let prodsRela = data.products; // Obtener la info de cada producto 
      getProdsRela (prodsRela);
    });

/* ---------- FUNCIONES ---------- */

/* Mostrar info del producto */
function showProductInfo(array) {
  containerProduct.innerHTML = `
    <div class="col-12 row card product-info-container flex-row">
        <div class="m-auto col-12 col-lg-7">
                    
            <div id="carouselExample" class="carousel slide">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="${array.images[0]}" class="d-block w-100" alt="..."> 
                    </div>
                    <div class="carousel-item">
                        <img src="${array.images[1]}" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="${array.images[2]}" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="${array.images[3]}" class="d-block w-100" alt="...">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                  <i class="bi bi-arrow-left btn-primary btn-carousel"></i>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                  <i class="bi bi-arrow-right btn-primary btn-carousel"></i>
                </button>
            </div>

        </div>

        <div class="col-12 col-lg-5 m-auto container-product-info">
            <h2 class="card-title title-product-info"><strong>${array.name}</strong></h2>
            <p class="card-description description-product-info">${array.description}</p>
            <p class="card-description category-product-info"><strong>Categoría</strong> <br> ${array.category}</p>
            <p class="card-soldcount soldCount-product-info"><strong>Cantidad de vendidos</strong> <br> ${array.soldCount}</p>
            <p class="card-cost cost-product-info"><strong>Precio</strong> <br> ${array.currency} ${array.cost}</p>
            <button class="button-product-info" 
              onclick="
              addToCart('${array.name}', ${array.cost}, '${array.images[0]}', '${array.id}');">Añadir al carrito</button>
        </div>
    </div>
  `;
}

/* Mostrar comentarios */

function showComments(array) {
  array.forEach((element) => {
    commentHTML += `
              <div class="comment col-lg-11 m-auto ps-4">
                  <p class="py-2 m-auto mt-3"><strong>${element.user}</strong> - ${element.dateTime} -
          `;

    addStars(element);

    commentHTML += `    
                  </p>
                  <p class="desc m-auto py-2 mb-3">${element.description} </p>
              </div>
              `;
  });
  containerComment.innerHTML += commentHTML;
}

/* Agregar estrellas */

function addStars(data) {
  for (let i = 1; i <= 5; i++) {
    if (i <= data.score) {
      commentHTML += `<span class="fa fa-star checked"></span>`;
    } else {
      commentHTML += `<span class="fa fa-star"></span>`;
    }
  }
}

/* Filtrar productos relacionados */

function getProdsRela (arr){
  arr.forEach(element => {
    if (element.id != productID){
      showProductsRela(element);
    }
  });
}

//Funcion para agregar productos a carrito
function addToCart(name, cost, image, id) {
  // Obtener el carrito actual desde el `localStorage`
  let currentCart = JSON.parse(localStorage.getItem('cart')) || [];

  // Crear un nuevo artículo
  const newArticle = {
      id: id,
      name: name,
      unitCost: cost,
      currency: 'USD',
      image: image,
      count: 1 
  };

  //Fetch POST para agregar productos a la base de datos
  fetch('http://localhost:3000/cart', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newArticle),
      })
  .then((response) => response.json())    

  // Agregar el nuevo artículo al carrito
  currentCart.push(newArticle);

  // Guardar el carrito actualizado en el `localStorage`
  localStorage.setItem('cart', JSON.stringify(currentCart));
  location.reload();
}


/* Crear un localStorage para guardar el id de cada producto y usarlo al clickear en el */

function setProductID(id) {
  localStorage.setItem("productID", id); // Crea el localStorage con la key "productID"
  window.location = "product-info.html"; // Redirige a product-info.html
}

/* Mostrar productos relacionados */

function showProductsRela(element){
  containerProdsRel.innerHTML +=`
  <div onclick="setProductID(${element.id})" class="productRel-container col-10 col-md-3">
    <img src="${element.image}" class="col-12">
    <p class="m-auto pt-3">${element.name}</p>
    <p class="m-auto pb-3">U$S${element.cost}</p>
  </div>
  `;
}

/* Controles para el carousel de productos relacionados */

document.getElementById("prev").addEventListener("click", ()=>{
  document.getElementById("prodsRelContainer").scrollLeft -= 350;
});

document.getElementById("next").addEventListener("click", ()=>{
  document.getElementById("prodsRelContainer").scrollLeft += 350;
});
