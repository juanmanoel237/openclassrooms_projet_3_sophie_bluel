// Function pour récupérer l'id d'utilisateur et le token

const getAuth = () => {
  const token = JSON.parse(localStorage.getItem("auth").token);
  return "Bearer" + token;
};

const isConnected = () => {
  const connection = getAuth() ? true : false;
  return connection;
};
