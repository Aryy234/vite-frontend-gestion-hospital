# Endpoints de DoctorResource

## 1. Listar doctores

- **GET** `/doctores`
- **Respuesta:**
```json
[
  {
    "id_doctor": 1,
    "nombre": "Juan Perez",
    "especialidad": "Cardiología",
    "nro_licencia": "12345",
    "id_usuario": 10,
    "links": [
      { "rel": "self", "href": "/doctores/1" },
      { "rel": "citas", "href": "/doctores/1/citas" }
    ]
  },
  // ... más doctores
]
```

---

## 2. Obtener doctor por ID

- **GET** `/doctores/{id}`
- **Respuesta:**
```json
{
  "id_doctor": 1,
  "nombre": "Juan Perez",
  "especialidad": "Cardiología",
  "nro_licencia": "12345",
  "id_usuario": 10,
  "links": [
    { "rel": "self", "href": "/doctores/1" },
    { "rel": "citas", "href": "/doctores/1/citas" }
  ]
}
```

---

## 3. Crear doctor

- **POST** `/doctores`
- **Body (JSON):**
```json
{
  "nombre": "Juan Perez",
  "especialidad": "Cardiología",
  "nro_licencia": "12345",
  "id_usuario": 10
}
```
- **Respuesta:**
- `201 Created` (sin contenido)

---

## 4. Actualizar doctor

- **PUT** `/doctores/{id}`
- **Body (JSON):**
```json
{
  "nombre": "Juan Perez",
  "especialidad": "Cardiología",
  "nro_licencia": "12345",
  "id_usuario": 10
}
```
- **Respuesta:**
- `200 OK` (sin contenido)

---

## 5. Eliminar doctor

- **DELETE** `/doctores/{id}`
- **Respuesta:**
- `204 No Content`

---

## 6. Listar citas de un doctor

- **GET** `/doctores/{id}/citas`
- **Respuesta:**
```json
[
  {
    "id_cita": 100,
    "id_paciente": 200,
    "id_doctor": 1,
    "fecha_hora": "2026-02-10T10:00:00.000Z",
    "estado": "Agendada",
    "links": [
      { "rel": "self", "href": "/citas/100" },
      { "rel": "paciente", "href": "/pacientes/200" },
      { "rel": "doctor", "href": "/doctores/1" }
    ]
  },
  // ... más citas
]
```
