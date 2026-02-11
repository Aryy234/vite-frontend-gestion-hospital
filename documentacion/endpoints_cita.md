# Endpoints de CitaResource

## 1. Listar todas las citas

- **GET** `/citas`
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
  }
  // ... más citas
]
```

---

## 2. Obtener cita por ID

- **GET** `/citas/{id}`
- **Respuesta:**
```json
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
}
```

---

## 3. Crear cita

- **POST** `/citas`
- **Body (JSON):**
```json
{
  "id_paciente": 1,
  "id_doctor": 10,
  "fecha_hora": "2026-02-10T10:00:00.000Z"
}
```
- **Respuestas:**
  - `201 Created` (sin contenido) - Cita creada exitosamente
  - `409 Conflict` - Ya existe una cita agendada en la misma fecha y hora

- **Validación:**
  - El sistema valida que no exista otra cita con estado "Agendada" en la misma fecha y hora
  - Si no se proporciona el campo `estado`, se asigna automáticamente "Agendada"

- **Respuesta de error (409 Conflict):**
```json
{
  "error": "Ya existe una cita agendada para la fecha y hora: 2026-02-10T10:00:00.000Z. No se puede crear una nueva cita en el mismo horario."
}
```

---

## 4. Actualizar cita

- **PUT** `/citas/{id}`
- **Body (JSON):**
```json
{
  "id_paciente": 1,
  "id_doctor": 10,
  "fecha_hora": "2026-02-10T10:00:00.000Z",
  "estado": "Agendada"
}
```
- **Respuesta:**
- `200 OK` (sin contenido)

---

## 5. Eliminar cita

- **DELETE** `/citas/{id}`
- **Respuesta:**
- `204 No Content`

---

## 6. Cancelar cita

- **PUT** `/citas/{id}/cancelar`
- **Respuesta:**
- `200 OK` (sin contenido)

---

## 7. Listar citas por doctor

- **GET** `/citas/doctor/{id}`
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
  }
  // ... más citas
]
```

---

## 8. Listar citas por paciente

- **GET** `/citas/paciente/{id}`
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
  }
  // ... más citas
]
```
