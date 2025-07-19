
# 🧳 TravelWise – Backend Project Requirements Document (PRD)

## 1. Overview

**Project Name:** TravelWise  
**Component:** Backend Services  
**Purpose:** Provide a RESTful backend API to support trip budgeting, planning, and recommendations using third-party services for flights, hotels, and transport.  
**Target Users:** Travelers, Tourists, Group Planners

---

## 2. Functional Requirements

| ID    | Feature                             | Description                                                                                                                                     | Priority |
|-------|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| FR001 | **User Authentication**             | Support user registration, login, logout, hashed passwords, JWT authentication.                                                                | High     |
| FR002 | **Trip Creation & Management**      | Users can create trips (destination, title, date range).                                                                                         | High     |
| FR003 | **Flight Search via API**           | Fetch available flights using Skyscanner API based on location, date, and filters like price/rating.                                            | High     |
| FR004 | **Hotel Search via API**            | Fetch hotel options with filters (rating, price, location) using Skyscanner API.                                                                | High     |
| FR005 | **Transportation Options**          | Fetch transport choices (e.g., Uber, public transport) using RapidAPI (or similar) based on user location and itinerary.                        | Medium   |
| FR006 | **Travel Guide (AI)**               | Recommend locations and tips using OpenAI API based on trip destination, safety, popularity.                                                    | Medium   |
| FR007 | **Itinerary Management**            | Create and edit itinerary entries (date, time, activity, place).                                                                               | High     |
| FR008 | **Expense Tracking**                | Users can log travel expenses by category (food, lodging, etc.) with amount, date, and description.                                             | High     |
| FR009 | **Group Cost Splitting**            | (Future Feature – Stub Only) Set up and manage group cost-sharing (Splitwise-like).                                                             | Low      |
| FR010 | **Saved Searches**                  | Save and retrieve past hotel/flight/transport searches with applied filters.                                                                    | Medium   |
| FR011 | **Local Businesses Listing**        | List local businesses based on category and user location using location-aware API.                                                             | Medium   |
| FR012 | **Booking Integration**             | Allow user to "book" flights or hotels through third-party API redirection and confirm/save booking details.                                   | Medium   |

---

## 3. Non-Functional Requirements

| ID    | Requirement                                | Description                                                                                   |
|-------|--------------------------------------------|-----------------------------------------------------------------------------------------------|
| NFR01 | **Performance**                            | APIs should respond within 500ms on average.                                                  |
| NFR02 | **Scalability**                            | System must scale to handle 1,000 concurrent users.                                           |
| NFR03 | **Security**                               | Use HTTPS, password hashing, JWT token expiration, API rate limits, and validation checks.    |
| NFR04 | **Data Storage**                           | Use MongoDB Atlas for persistent storage; implement backup and recovery plan.                 |
| NFR05 | **Responsiveness**                         | Backend should support mobile and desktop clients equally (JSON responses).                   |
| NFR06 | **Integration**                            | APIs must support third-party integrations (Skyscanner, RapidAPI, GPT, etc.) securely.        |

---

## 4. API Endpoints Overview

**Authentication**
- `POST /api/auth/register`  
- `POST /api/auth/login`  
- `GET /api/auth/logout`

**Trips**
- `POST /api/trips`  
- `GET /api/trips/:userId`  
- `PUT /api/trips/:tripId`  
- `DELETE /api/trips/:tripId`

**Flights / Hotels**
- `GET /api/flights/search`  
- `GET /api/hotels/search`  
- `POST /api/flights/save`  
- `GET /api/flights/saved`

**Itinerary**
- `POST /api/itinerary/:tripId`  
- `PUT /api/itinerary/:entryId`  
- `DELETE /api/itinerary/:entryId`

**Expenses**
- `POST /api/expenses`  
- `GET /api/expenses/:tripId`  
- `PUT /api/expenses/:expenseId`  
- `DELETE /api/expenses/:expenseId`

**Local Guide**
- `GET /api/guide/:location`  
- `GET /api/ai/recommendations/:destination`

---

## 5. Data Models (Simplified)

**User**
```json
{
  "username": "string",
  "email": "string",
  "passwordHash": "string",
  "createdTrips": ["tripId"]
}
```

**Trip**
```json
{
  "userId": "string",
  "destination": "string",
  "startDate": "date",
  "endDate": "date",
  "title": "string",
  "itinerary": ["itineraryEntryId"],
  "expenses": ["expenseId"]
}
```

**Expense**
```json
{
  "tripId": "string",
  "category": "enum",
  "amount": "number",
  "description": "string",
  "date": "date"
}
```

**ItineraryEntry**
```json
{
  "tripId": "string",
  "location": "string",
  "activity": "string",
  "startTime": "datetime",
  "endTime": "datetime"
}
```

---

## 6. Dependencies and Integrations

| API            | Purpose                        | Authentication |
|----------------|--------------------------------|----------------|
| Skyscanner     | Flight & Hotel Listings        | API Key        |
| RapidAPI       | Currency & Transport APIs      | API Key        |
| OpenAI (GPT-4) | Travel recommendations         | API Key        |

---

## 7. Risks & Mitigation

| Risk                          | Mitigation Strategy                                                                 |
|-------------------------------|--------------------------------------------------------------------------------------|
| API Downtime                  | Add retry logic, fallbacks, and cache previous results                              |
| Third-party rate limiting     | Monitor usage; switch to premium tier or throttle requests                          |
| Data inconsistency            | Add validations and database constraints                                            |
| Payment integration failures  | Use placeholder data (MVP phase), then integrate secure payment provider later      |

---

## 8. Future Enhancements (Post-MVP)

- Group chat and collaborative itinerary editing  
- Real-time currency conversion  
- Local event calendar based on destination  
- In-app booking engine  
- Mobile app (React Native)  
