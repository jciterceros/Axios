const url = "http://localhost:5000/api";

// let data = {
//     users: [
//         {
//             id: 1,
//             name: "Fernando Terceros",
//             avatar: "https://github.com/jciterceros.png",
//             city: "São Paulo",
//         },
//         {
//             id: 2,
//             name: "usuario 2",
//             avatar: "http://lorempixel.com.br/400/200",
//             city: "São Paulo",
//         },
//     ],
// };

function getUsers() {
    axios
        .get(`${url}`)
        .then((response) => {
            let data = response.data;

            userAvatar.src = data.users[0].avatar;
            userName.textContent = data.users[0].name;
            userId.textContent = data.users[0].id;
            userCity.textContent = data.users[0].city;

            textJSON.textContent = JSON.stringify(data);
            console.log(JSON.stringify(data));
        })
        .catch((error) => {
            textJSON.textContent = error;
            console.log(error);
        });
}

const secretKey = `?client_id=pOpLMacKEa_qQE6sJowZ38H5IYiPRvtsETfUPTABbJY`;
let BASE_URL = "https://api.unsplash.com/photos/random";
BASE_URL += secretKey;
//console.log(BASE_URL);

const getPhotos = async () => {
    const data = await fetch(BASE_URL)
        .then((response) => response.json())
        .catch((error) => console.log(error));
    // console.log(data);
    return data.urls.small;
};

function getUserbyID(id) {
    axios
        .get(`${url}/${id}`)
        .then((response) => {
            const data = response.data;

            // userAvatar.src = data.avatar;
            const loadImg = async () => {
                userAvatar.src = await getPhotos();
            };
            loadImg();
            userName.textContent = data.name;
            userId.textContent = data.id;
            userCity.textContent = data.city;

            textJSON.textContent = JSON.stringify(data);
            console.log(JSON.stringify(data));
        })
        .catch((error) => console.log(error));
}

function addNewUser(newUser) {
    axios
        .post(url, newUser)
        .then((response) => {
            alert(JSON.stringify(response.data));
            getUsers();
        })
        .catch((error) => console.error(error));
}

function updateUser(user, id) {
    axios
        .put(`${url}/${id}`, user)
        .then((response) => {
            alert(JSON.stringify(response.data));
            getUsers();
        })
        .catch((error) => console.error(error));
}

function deleteUser(id) {
    axios
        .delete(`${url}/${id}`)
        .then((response) => {
            alert(JSON.stringify(response.data));
            getUsers();
        })
        .catch((error) => console.error(error));
}

let user = {
    id: null,
    name: null,
    avatar: "https://api.unsplash.com/photos/random",
    city: null,
};

function getPrompt(crudOperation) {
    let id;
    let name;
    let city;
    switch (crudOperation) {
        case "add":
            //{"id":1,"name":"","avatar":"http://lorempixel.com/400/200","city":""}
            user.name = prompt("Ingrese Nome do Usuario: ");
            user.city = prompt("Ingrese a Cidade: ");
            user.name && user.city
                ? addNewUser({
                      name: user.name,
                      avatar: "https://api.unsplash.com/photos/random",
                      city: user.city,
                  })
                : alert("Preencha todos os campos");
            break;

        case "get":
            user.id = prompt("Ingrese el ID do usuario");
            user.id ? getUserbyID(user.id) : alert("Preencha o campo ID");
            break;

        case "update":
            user.id = prompt("Ingrese el ID do usuario");
            user.name = prompt("Ingrese Nome do Usuario: ");
            user.city = prompt("Ingrese a Cidade: ");
            user.id && user.name && user.city
                ? updateUser(
                      {
                          name: user.name,
                          avatar: "https://api.unsplash.com/photos/random",
                          city: user.city,
                      },
                      user.id
                  )
                : alert("Preencha todos os campos");
            break;

        case "delete":
            user.id = prompt("Ingrese el ID do usuario");
            user.id ? deleteUser(user.id) : alert("Preencha o campo ID");
            break;

        default:
            alert("Operacao nao suportada");
            break;
    }
}

// Get all Users
const btnGetUsers = document.getElementById("btnGetUsers");
btnGetUsers.addEventListener("click", getUsers);

// Create a new User
const btnAddUser = document.getElementById("addNewUser");
btnAddUser.addEventListener("click", () => {
    getPrompt("add");
});

// Get User by ID
const btnGetUserbyID = document.getElementById("btnGetUserbyID");
btnGetUserbyID.addEventListener("click", () => {
    getPrompt("get");
});

// Update User
const btnUpdateUser = document.getElementById("updateUser");
btnUpdateUser.addEventListener("click", () => {
    getPrompt("update");
});

// Delete User
const btnDeleteUser = document.getElementById("deleteUser");
btnDeleteUser.addEventListener("click", () => {
    getPrompt("delete");
});
