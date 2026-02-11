<template>
  <RouterView />
</template>

<script setup>
</script>

<style>
/* Reset y estilos globales */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.5;
  color: #1a2332;
  background-color: #ffffff;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
}

input,
select,
textarea {
  font-family: inherit;
}

/* Variables CSS */
:root {
  --color-primary: #1a2332;
  --color-secondary: #e8eef3;
  --color-white: #ffffff;
  --color-accent: #2c3e50;
  --color-text-gray: #5a6c7d;
  --color-border: #e0e0e0;
  --color-success: #28a745;
  --color-danger: #dc3545;
  --color-warning: #ffc107;
  
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.15);
  
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  
  --transition: 200ms ease;
}
</style>
