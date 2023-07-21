const socket = io("http://localhost:8080/");

const container = document.getElementById("containerCard");
const guardarProduct = document.getElementById("guardar");

guardarProduct.addEventListener("click", (e) => {
  e.preventDefault();

  const newProduct = {
    title: titulo.value,
    description: description.value,
    price: precio.value,
    code: code.value,
    stock: stock.value,
    category: categoria.value,
  };

  axios
    .post("http://localhost:8080/api/products", newProduct)
    .then((res) => {
      console.log(res.data);
      socket.emit("message", "hola desde el cliente");
    })
    .catch((err) => {
      console.log(err);
    });
});

const getProducts = async () => {
  const response = await axios.get("http://localhost:8080/api/products");
  console.log(response.data);
  return response.data;
};

const renderizaProduct = async () => {
  const products = await getProducts();
  products.data.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<div class="card" style="width: 18rem;">
    
    <div class="card-body">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text">${product.title}</p>
    <a href="#" class="btn btn-primary" onclick="deleteProduct(${product.id})"> Eliminar Producto</a>
    </div>
    </div>
    `;
    container.appendChild(card);
  });
};

renderizaProduct();

const deleteProduct = (id) => {
  axios
    .delete(`http://localhost:8080/api/products/${id}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

socket.on("messageAll", (data) => {
  alert(data);
});
