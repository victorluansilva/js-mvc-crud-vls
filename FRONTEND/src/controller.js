import { view } from "./view/view.js";
import { Usuario } from "./model/usuario.model.js";
import { dataService } from "./api/data.service.js";

let users = [];
let userId = null;
const nullUser = new Usuario("", null, "", "");

const submitType = { NEW: 0, UPDATE: 1 };
let submitState = submitType.NEW;


const loadData = async () => {
  const data = await dataService.load();
  users = data.map(
    (user) => new Usuario(user.nome, user.idade, user.login, user.senha)
  );
  view.update(users, nullUser);
};


//ES6
const getFormInputs = () => {
  return new Usuario(nome.value, idade.value, login.value, senha.value);
};

const handleSubmit = (event) => {
  event.preventDefault();
  const user = getFormInputs();
  if (submitState == submitType.NEW) {
    addUser(user);
  } else if (submitState == submitType.UPDATE) {
    updateUser(userId, user);
    submitState = submitType.NEW;
    btnSub.innerText = "Save";
  }
  view.update(users, nullUser);
};

//CRUD
const addUser = (newUser) => {
  users.push(newUser);
  dataService.save(users);
};

const updateUser = (index, userToUpdate) => {
  users[index] = userToUpdate;
  dataService.save(users);
};

const deletUser = (index) => {
  users.splice(index, 1);
  dataService.save(users);
};
//FIM CRUD


const handleClick = (event) => {
  userId = event.target.closest("tr").id.split("")[4];
  if (event.type === "click") {
    const confirmarEdicao = window.confirm(
      `Clicou com o botão esquerdo, e o ${users[userId]
        .getNome()
        .toUpperCase()} será carregado para edição`
    );
    if (confirmarEdicao) {
      view.updateForm(users[userId]);
      submitState = submitType.UPDATE;
      btnSub.innerText = "Update";
    }
  } else if (event.type === "contextmenu") {
    event.preventDefault();
    if (event.button == 2) {
      const confirmarDelecao = window.confirm(
        `Clicou com o botão direito, e o ${users[userId]
          .getNome()
          .toUpperCase()} será deletado`
      );

      if (confirmarDelecao) {
        deletUser(userId);
        view.update(users, nullUser);
      }
    }
  }
};

const setEventsListeners = () => {
  const form = document.getElementById("signForm");
  form.addEventListener("submit", handleSubmit);
  const userList = document.getElementById("users-result");
  userList.addEventListener("click", handleClick);
  userList.addEventListener("contextmenu", handleClick);
};

const controller = {
  run: () => {
    view.render();
    setEventsListeners();
    window.onload = () => {
      loadData();
    };
  },
};

export { controller };
