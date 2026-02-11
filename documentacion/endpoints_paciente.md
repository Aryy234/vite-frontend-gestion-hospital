# Endpoints de PacienteResource

## 1. Listar pacientes

- **GET** `/pacientes`
- **Respuesta:**
```json
[
  {
    "id_paciente": 1,
    "nombre": "Ana López",
    "ci": "1234567890",
    "telefono": "0999999999",
    "id_usuario": 20
  },
  // ... más pacientes
]
```

---

## 2. Obtener paciente por ID

- **GET** `/pacientes/{id}`
- **Respuesta:**
```json
{
  "id_paciente": 1,
  "nombre": "Ana López",
  "ci": "1234567890",
  "telefono": "0999999999",
  "id_usuario": 20
}
```

---

## 3. Crear paciente

- **POST** `/pacientes`
- **Body (JSON):**
```json
{
  "nombre": "Ana López",
  "ci": "1234567890",
  "telefono": "0999999999",
  "id_usuario": 20
}
```
- **Respuesta:**
- `201 Created` (sin contenido)

---

## 4. Actualizar paciente

- **PUT** `/pacientes/{id}`
- **Body (JSON):**
```json
{
  "nombre": "Ana López",
  "ci": "1234567890",
  "telefono": "0999999999",
  "id_usuario": 20
}
```
- **Respuesta:**
- `200 OK` (sin contenido)

---

## 5. Eliminar paciente

- **DELETE** `/pacientes/{id}`
- **Respuesta:**
- `204 No Content`

---

## 6. Listar citas de un paciente

- **GET** `/pacientes/{id}/citas`
- **Respuesta:**
```json
[
  {
    "id_cita": 100,
    "id_paciente": 1,
    "id_doctor": 10,
    "fecha_hora": "2026-02-10T10:00:00.000Z",
    "estado": "Agendada",
    "links": [
      { "rel": "self", "href": "/citas/100" },
      { "rel": "paciente", "href": "/pacientes/1" },
      { "rel": "doctor", "href": "/doctores/10" }
    ]
  },
  // ... más citas
]
```
