import React from "react";

// strapi functions
import loginUser from "../strapi/loginUser";
import registerUser from "../strapi/registerUser";

// handle User
import { useHistory } from "react-router-dom";

// import userContext
import { UserContext } from "../context/user";

export default function Login() {
  const history = useHistory();
  // setup user context
  const { userLogin, alert, showAlert } = React.useContext(UserContext);

  // state values
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("default");
  const [isMember, setIsMember] = React.useState(true);

  let isEmpty = !email || !password || !username || alert.show;

  const toggleMember = () => {
    setIsMember(prevMember => {
      let isMember = !prevMember;
      isMember ? setUsername("default") : setUsername("");
      return isMember;
    });
  };

  const handleSubmit = async e => {
    showAlert({ msg: "Accessing user data, please wait...." });
    // alert
    e.preventDefault();
    let response;
    if (isMember) {
      // response =await loginUser
      response = await loginUser({ email, password });
    } else {
      // response = await registerUser
      response = await registerUser({ email, password, username });
    }
    if (response) {
      //
      const {
        jwt: token,
        user: { username }
      } = response.data;
      const newUser = { token, username };
      userLogin(newUser);
      showAlert({
        msg: `congratulations you have made it : ${username}. now gimme all your money`
      });
      history.push("/products");
    } else {
      // show alert
      showAlert({
        msg: `well you blew it. but no worries try again`,
        type: "danger"
      });
    }
  };

  return (
    <section className="form section">
      <h2 className="section-title">{isMember ? "sign in" : "register"}</h2>

      <form className="login-form">
        {/* single input */}
        <div className="form-control">
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        {/* End of single input */}

        {/* single input */}
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {/* End of single input */}

        {/* single input */}
        {!isMember && (
          <div className="form-control">
            <label htmlFor="username">username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
        )}

        {/* End of single input */}
        {/* empty form text */}

        {isEmpty && <p className="form-empty">please fill out form fields</p>}

        {/* submit btn */}
        {!isEmpty && (
          <button
            type="submit"
            className="btn btn-block btn-primary"
            onClick={handleSubmit}
          >
            submit
          </button>
        )}

        {/* register link */}
        <p className="register-link">
          {isMember ? "need to register" : "already a member"}
          <button type="button" onClick={toggleMember}>
            click here
          </button>
        </p>
      </form>
    </section>
  );
}
