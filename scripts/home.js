import { loginRequest, red, green } from "./requests.js";
import { toast } from "./toast.js";

const redirectUserPage = () => {
  open("../pages/userPage.html", "_self");
};

const hasToken = () => {
  const localToken = localStorage.getItem("@diamond:token");
  if (localToken !== null) {
    redirectUserPage();
  }
};

const handleLogin = async () => {
  const inputs = document.querySelectorAll("input");
  const formLogin = document.querySelector(".form__login");
  let count = 0;
  let userCredentials = {};

  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    inputs.forEach((input) => {
      if (input.value.trim() == "") {
        count++;
      }

      userCredentials[input.name] = input.value;
    });

    if (count != 0) {
      count = 0;
      toast(red, "Por favor preencha todos os campos do formulário");
    } else {
      const token = await loginRequest(userCredentials);

      if (token !== null) {
        toast(green, "Login realizado com sucesso");

        localStorage.setItem("@diamond:token", JSON.stringify(token.token));
        localStorage.setItem("@diamond:user-id", JSON.stringify(token.id));

        userCredentials = {};

        inputs.forEach((input) => {
          input.value = "";
        });

        setTimeout(() => {
          redirectUserPage();
        }, 3000);
      } else {
        userCredentials = {};

        inputs.forEach((input) => {
          input.value = "";
        });
      }
    }
  });
};

hasToken();
handleLogin();
