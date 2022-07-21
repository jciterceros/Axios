const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.listen(port, () => console.log(`Localhost rodando na porta ${port}}`));
app.use(cors());
app.use(express.json());

let users = [
    {
        id: 1,
        name: "Fernando Terceros",
        avatar: "https://github.com/jciterceros.png",
        city: "São Paulo",
    },
    {
        id: 2,
        name: "usuario 2",
        // avatar: "http://lorempixel.com.br/400/200",
        avatar: "https://api.unsplash.com/photos/random",
        city: "São Paulo",
    },
];

/* Listando todos os Usuarios do array de objetos */
app.route("/api").get((req, res) =>
    res.json({
        users,
    })
);

/* Consultando um Usuario pelo ID */
app.route("/api/:id").get((req, res) => {
    const userId = req.params.id;
    const user = users.find((user) => Number(user.id) === Number(userId));

    !user
        ? res.status(404).json({ message: "Usuario não encontrado!" })
        : res.json(user);
});

/* Adicionando um novo Usuario */
app.route("/api").post((req, res) => {
    const lastId = users[users.length - 1].id;
    users.push({
        id: lastId + 1,
        name: req.body.name,
        avatar: req.body.avatar,
        city: req.body.city,
    });
    res.json("Usuario salvo com sucesso!");
});

/* Atualizando um Usuario pelo ID */
app.route("/api/:id").put((req, res) => {
    const userId = req.params.id;
    const user = users.find((user) => Number(user.id) === Number(userId));

    !user ? res.status(404).json({ message: "Usuario não encontrado!" }) : "";

    const updatedUser = {
        ...user,
        name: req.body.name,
        avatar: req.body.avatar,
        city: req.body.city,
    };

    users = users.map((user) => {
        Number(user.id) === Number(userId) ? (user = updatedUser) : "";
        return user;
    });

    res.json("Usuario atualizado com sucesso!");
});

/* Excluindo um Usuario pelo ID */
app.route("/api/:id").delete((req, res) => {
    const userId = req.params.id;
    const user = users.find((user) => Number(user.id) === Number(userId));

    !user
        ? res.status(404).json({ message: "Usuario não encontrado!" })
        : (users = users.filter((user) => Number(user.id) !== Number(userId)));

    res.json("Usuario deletado com sucesso!");
});
