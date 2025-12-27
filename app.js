const form = document.getElementById('loginForm');
const msg = document.getElementById('message');
form.addEventListener('submit', async (event) => {});
  event.preventDefault();
  msg.textContent = '';
  msg.className = 'message';

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (!username || !password) {
    msg.textContent = 'Completa todos los campos';
    msg.classList.add('error');
    return;
  }

  // Payload x-www-form-urlencoded
  const body = new URLSearchParams();
  body.append('username', username);
  body.append('password', password);

  try {
    // Ajusta la URL al host de tu backend (ej: http://localhost:8000/token)
    const resp = await fetch('http://127.0.0.1:8000/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body.toString()
    });

    if (!resp.ok) {
      const err = await resp.json().catch(()=>({detail: 'Error desconocido'}));
      msg.textContent = err.detail || 'Credenciales inválidas';
      msg.classList.add('error');
      return;
    }

    const data = await resp.json();
    // data = { access_token: "...", token_type: "bearer" }
    localStorage.setItem('access_token', data.access_token);
    msg.textContent = 'Login exitoso. Redirigiendo...';
    msg.classList.add('ok');

    // Redirigir al panel protegido
    setTimeout(() => window.location.href = 'panel.html', 600);

  } catch (error) {
    console.error(error);
    msg.textContent = 'Error de conexión con el servidor';
    msg.classList.add('error');
  }
