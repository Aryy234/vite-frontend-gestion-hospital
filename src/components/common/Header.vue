<template>
  <header class="header-global">
    <div class="header-content">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="header-icon">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="#fff" stroke-width="1.5"/>
        <path d="M12 7v10M7 12h10" stroke="#fff" stroke-width="1.5"/>
      </svg>
      <h2>Gestión de Citas - Hospital</h2>
    </div>
  </header>
</template>

<style scoped>
.header-global {
  width: 100%;
  background: linear-gradient(135deg, #1a2332 0%, #2c3e50 100%);
  color: #fff;
  padding: 16px 32px;
  box-shadow: 0 4px 20px rgba(26,35,50,0.15);
  position: relative;
  z-index: 200;
}
.header-global::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 3px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
}
.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.header-icon {
  display: block;
}
.header-global h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
</style>