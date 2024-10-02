// muilogin/page.js
"use client";

import React from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import styles from './muilogin.module.css'; // Importação dos estilos personalizados

export default function LoginPage() {
  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    
    console.log({
      email: email,
      password: password,
    });

    alert('Login realizado com sucesso!');
  };

  return (
    <Container component="main" className={styles.container}>
      <Box
        className={styles.loginBox}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" className={styles.loginTitle}>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            className={styles.loginInput}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            className={styles.loginInput}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={styles.loginButton}
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
