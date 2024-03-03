// Function pour récupérer l'id d'utilisateur et le token

const getAuth = () => {
  const authData = localStorage.getItem("auth");
  if (authData) {
    const token = JSON.parse(authData).token;
    return "Bearer " + token;
  } else {
    return null;
  }
};

const isConnected = () => {
  return !!getAuth(); // Convertit explicitement la valeur de retour de getAuth en booléen
};
