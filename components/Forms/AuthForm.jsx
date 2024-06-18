import React, { useState } from "react";
import { Modal, Button, TextField, Typography } from "@mui/material";

const LoginModal = ({ open, onClose, setLoginModalOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);

  const validateInputs = () => {
    if (creatingAccount) {
      if (!firstName.trim() || !lastName.trim()) {
        setErrorMessage("First name and last name are required.");
        return false;
      }
    }
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Email and password are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateInputs()) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (creatingAccount) {
      const userExists = users.some((user) => user.email === email);
      if (userExists) {
        setErrorMessage("An account with this email already exists.");
        return;
      }
      const id = users.length + 1;
      users.push({ id, firstName, lastName, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      console.log("Account created successfully!");
      onClose();
    } else {
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        localStorage.setItem(
          "userSession",
          JSON.stringify({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
          })
        );
        console.log("Logged in successfully!");
        setLoginModalOpen(false);
      } else {
        setErrorMessage("Incorrect email or password.");
      }
    }
  };

  const modalStyle = {
    position: "absolute",
    width: 400,
    backgroundColor: "#fcfcca",
    // border: "2px solid #000",
    borderRadius: "8px",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    padding: "20px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <div style={modalStyle}>
        <Typography variant="h6" component="h2" id="login-modal-title">
          {creatingAccount ? "Crear cuenta" : "Iniciar sesión"}
        </Typography>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <form onSubmit={handleSubmit}>
          {creatingAccount && (
            <>
              <TextField
                id="first-name"
                label="Nombre"
                variant="outlined"
                fullWidth
                value={firstName}
                onChange={handleFirstNameChange}
                sx={{ marginTop: 2 }}
                required
              />
              <TextField
                id="last-name"
                label="Apellido"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={handleLastNameChange}
                sx={{ marginTop: 2 }}
                required
              />
            </>
          )}
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            sx={{ marginTop: 2 }}
            required
          />
          <TextField
            id="password"
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            sx={{ marginTop: 2 }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ backgroundColor: '#29a636', color: 'white', '&:hover': { backgroundColor: '#29a636' }, marginTop: 2}}
            fullWidth
          >
            {creatingAccount ? "Registrarse" : "Iniciar sesión"}
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          {creatingAccount
            ? "¿Ya tienes una cuenta?"
            : "¿Aún no tienes cuenta?"}
          <Button onClick={() => setCreatingAccount(!creatingAccount)}>
            {creatingAccount ? "Inicia sesión" : "Crea una cuenta"}
          </Button>
        </Typography>
      </div>
    </Modal>
  );
};

export default LoginModal;
