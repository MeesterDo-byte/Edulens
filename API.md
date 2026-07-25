# EduLens - API Documentation

## Base URL

```
https://edulens.example.com/api
```

## Authentication

All endpoints require valid authentication token in localStorage.

```javascript
// Token stored as
localStorage.getItem('edulens_auth_token')
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "schoolNaam": "Basisschool De Horizon",
  "voornaam": "Marieke",
  "achternaam": "Jansen",
  "email": "marieke@horizonschool.nl",
  "password": "securepassword123",
  "rol": "directeur"
}

Response 201:
{
  "id": "user_1721896201234",
  "schoolNaam": "Basisschool De Horizon",
  "voornaam": "Marieke",
  "achternaam": "Jansen",
  "email": "marieke@horizonschool.nl",
  "rol": "directeur",
  "school_id": "school_1721896201234",
  "created_at": "2024-07-25T20:30:01Z"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "marieke@horizonschool.nl",
  "password": "securepassword123"
}

Response 200:
{
  "user": { ... },
  "token": "token_1721896201234_abc123def456"
}
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer {token}

Response 200:
{
  "message": "Successfully logged out"
}
```

### Students

#### Get All Students
```http
GET /students
Authorization: Bearer {token}

Response 200:
[
  {
    "id": "student_1721896201234",
    "naam": "Emma de Vries",
    "groep": "5A",
    "geboortedatum": "15-03-2013",
    "ouders": "Peter de Vries & Maria de Vries",
    "email": "emma@school.nl",
    "telefoon": "06-12345678",
    "school_id": "school_1721896201234",
    "created_at": "2024-07-25T20:30:01Z"
  },
  ...
]
```

#### Get Student by ID
```http
GET /students/:id
Authorization: Bearer {token}

Response 200:
{
  "id": "student_1721896201234",
  "naam": "Emma de Vries",
  ...
}
```

#### Create Student
```http
POST /students
Authorization: Bearer {token}
Content-Type: application/json

{
  "naam": "Liam van den Berg",
  "groep": "5A",
  "geboortedatum": "22-05-2013",
  "ouders": "Jan van den Berg & Lisa van den Berg",
  "email": "liam@school.nl",
  "telefoon": "06-87654321"
}

Response 201:
{
  "id": "student_1721896201235",
  "naam": "Liam van den Berg",
  ...
}
```

#### Update Student
```http
PUT /students/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "groep": "5B"
}

Response 200:
{
  "id": "student_1721896201234",
  "naam": "Emma de Vries",
  "groep": "5B",
  ...
}
```

#### Delete Student
```http
DELETE /students/:id
Authorization: Bearer {token}

Response 204: No Content
```

#### Get Student Scores
```http
GET /students/:id/scores
Authorization: Bearer {token}

Response 200:
[
  {
    "student_id": "student_1721896201234",
    "periode": "Januari",
    "rekenen": 78,
    "taal": 75,
    "lezen": 80
  },
  ...
]
```

### Interventions

#### Get All Interventions
```http
GET /interventions
Authorization: Bearer {token}

Response 200:
[
  {
    "id": "intervention_1721896201234",
    "school_id": "school_1721896201234",
    "titel": "Leesinterventie groep 7",
    "beschrijving": "Gerichte training begrijpend lezen",
    "duur": "8 weken",
    "start_datum": "01-09-2024",
    "status": "actief",
    "student_ids": ["student_1", "student_2"],
    "voortgang": 65,
    "created_at": "2024-07-25T20:30:01Z"
  },
  ...
]
```

#### Create Intervention
```http
POST /interventions
Authorization: Bearer {token}
Content-Type: application/json

{
  "titel": "Rekenen versnelling",
  "beschrijving": "Uitdagende wiskundetaken",
  "type": "versnelling",
  "duur": "10 weken",
  "start_datum": "01-10-2024",
  "status": "gepland",
  "student_ids": ["student_1", "student_2"]
}

Response 201:
{
  "id": "intervention_1721896201235",
  ...
}
```

#### Update Intervention
```http
PUT /interventions/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "voortgang": 75,
  "status": "actief"
}

Response 200:
{
  "id": "intervention_1721896201234",
  ...
}
```

#### Delete Intervention
```http
DELETE /interventions/:id
Authorization: Bearer {token}

Response 204: No Content
```

### Analytics

#### Get Trends
```http
GET /analytics/trends
Authorization: Bearer {token}

Response 200:
{
  "trends": [
    {
      "month": "January",
      "rekenen": 72,
      "taal": 68,
      "lezen": 65
    },
    ...
  ]
}
```

#### Get Insights
```http
GET /analytics/insights
Authorization: Bearer {token}

Response 200:
{
  "insights": [
    {
      "type": "positive",
      "title": "Sterke trend in rekenen",
      "description": "Rekenen groep 5 laat sterke groei zien..."
    },
    ...
  ]
}
```

## Error Handling

### Common Errors

```json
{
  "401": {
    "message": "Unauthorized - Invalid token"
  },
  "404": {
    "message": "Resource not found"
  },
  "422": {
    "message": "Validation error",
    "errors": {
      "email": ["Email is required"]
    }
  },
  "500": {
    "message": "Internal server error"
  }
}
```

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per authenticated user

## Pagination

Optional query parameters:
```
GET /students?page=1&limit=20
```

## Sorting

```
GET /students?sort=-created_at&sort=naam
```

---

For more info: support@edulens.nl
