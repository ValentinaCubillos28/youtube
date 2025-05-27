import { useState } from 'react'
import { supabase } from '../../supabase'
import { useNavigate } from "react-router-dom";
import './style.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert('Usuario o contraseña no válidos');
    else navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Inicia sesión</h2>
        <br></br>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" type="submit">Iniciar sesión</button>
        </form><br></br>
        <p className="login-text">¿No tienes cuenta?</p>
        <button className="register-button" onClick={() => navigate('/registro')}>
          Regístrate
        </button>
      </div>
    </div>
  );
}

export default Login;