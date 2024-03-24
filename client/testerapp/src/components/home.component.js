import React, { useState, useEffect } from "react";
import UserService from "../services/auth/user.service";

function Home() {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      response => {
        setContent(response.data);
      },
      error => {
        setContent(
          (error.response && error.response.data) ||
          error.message ||
          error.toString()
        );
      }
    );
  }, []); // Пустой массив зависимостей означает, что эффект будет вызываться только при монтировании компонента

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
}

export default Home;