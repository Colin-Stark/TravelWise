# Trip Budgeting App - MongoDB Schema Documentation

## Overview
This document outlines the MongoDB schema design for a comprehensive trip budgeting application built with Node.js, Express.js, and Mongoose. The schema is designed to handle all aspects of travel planning, expense tracking, and budget management with a focus on safety and user experience.

## Key Findings & Design Decisions

### 1. **Core Schema Components**
The application consists of 6 main collections:
- **Users**: User management with travel-specific fields
- **Trips**: Core trip planning and budgeting entity
- **Expenses**: Detailed expense tracking and categorization
- **Accommodations**: Hotel/lodging booking management
- **Transportation**: Flight, train, bus, and other transport bookings
- **Budget Alerts**: Smart notification system for budget monitoring

### 2. **Safety & Emergency Features**
- **Emergency Contact System**: Complete emergency contact information with multiple phone numbers
- **Travel Document Management**: Passport and driving license tracking
- **Multi-level Contact Options**: Primary phone, alternate phone, and email for emergencies

### 3. **Budget Management Features**
- **Multi-Currency Support**: Handles 10 major world currencies (USD, EUR, GBP, JPY, CAD, AUD, CNY, INR, MXN, BRL)
- **Category-Based Budgeting**: 7 expense categories (accommodation, transportation, food, activities, shopping, emergency, other)
- **Real-Time Alerts**: Configurable budget threshold alerts (default: 80% of budget)
- **Expense Splitting**: Share costs among travel companions

### 4. **Advanced Features Added**

#### **Travel Planning Enhancements:**
- **Geolocation Support**: GPS coordinates for destinations and expense locations
- **Trip Companions**: Add and manage travel partners with contact information
- **Multi-Modal Transportation**: Support for flights, trains, buses, car rentals, rideshares
- **Accommodation Variety**: Hotels, hostels, Airbnb, resorts, and more

#### **User Experience Improvements:**
- **Virtual Fields**: Auto-calculated age and full name
- **Receipt Management**: Image upload for expense receipts
- **Search Optimization**: Text indexing for trips and expenses
- **Timezone Support**: Handle different time zones for destinations

#### **Data Integrity & Performance:**
- **Comprehensive Validation**: Email validation, phone number patterns, budget constraints
- **Strategic Indexing**: Optimized queries for users, trips, expenses, and dates
- **Middleware Hooks**: Auto-calculation of trip duration and timestamps
- **Relationship Management**: Proper ObjectId references between collections

### 5. **Security & Validation**
- **Input Validation**: Comprehensive validation rules for all fields
- **Unique Constraints**: Email and username uniqueness
- **Data Sanitization**: Trim whitespace, lowercase emails
- **Enum Validation**: Controlled values for categories, statuses, and types

### 6. **Scalability Considerations**
- **Efficient Indexing**: Strategic database indexes for performance
- **Modular Design**: Separate schemas for different business domains
- **Flexible Structure**: Extensible design for future features
- **Optimized Queries**: Compound indexes for common query patterns

## Schema Relationships

### **One-to-Many Relationships:**
- User → Trips (One user can have multiple trips)
- Trip → Expenses (One trip can have multiple expenses)
- Trip → Accommodations (One trip can have multiple accommodations)
- Trip → Transportation (One trip can have multiple transportation bookings)
- User → Budget Alerts (One user can have multiple alerts)

### **Many-to-Many Relationships:**
- Users ↔ Expenses (Expense splitting among companions)
- Users ↔ Trips (Trip companions)

## Technical Implementation Details

### **MongoDB Features Utilized:**
- **Embedded Documents**: Address objects, travel documents, preferences
- **Array Fields**: Companions, amenities, tags, split expenses
- **Virtual Properties**: Calculated fields not stored in database
- **Pre-save Middleware**: Auto-calculations and data updates
- **Compound Indexing**: Multi-field indexes for complex queries

### **Express.js Integration:**
- **Mongoose ODM**: Full integration with Express.js applications
- **Validation Middleware**: Built-in data validation
- **Population Support**: Easy relationship queries
- **Error Handling**: Comprehensive error messages for API responses

## Usage Examples

### Creating a New Trip:
```javascript
const newTrip = await Trip.create({
  name: "European Adventure",
  user: userId,
  destination: { 
    country: "France", 
    city: "Paris",
    coordinates: { latitude: 48.8566, longitude: 2.3522 }
  },
  dates: { 
    startDate: "2025-08-01", 
    endDate: "2025-08-15" 
  },
  budget: {
    totalBudget: 5000,
    currency: "USD",
    categoryBudgets: {
      accommodation: 2000,
      transportation: 1500,
      food: 1000,
      activities: 500
    }
  }
});
```

### Adding an Expense:
```javascript
const expense = await Expense.create({
  trip: tripId,
  user: userId,
  title: "Hotel Night 1",
  amount: 150,
  currency: "USD",
  category: "accommodation",
  paymentMethod: "credit_card",
  location: {
    name: "Hotel Royal Paris",
    coordinates: { latitude: 48.8566, longitude: 2.3522 }
  }
});
```

## Performance Optimizations

### **Database Indexes:**
- User: `email`, `username`, `createdAt`
- Trip: `user + createdAt`, `startDate`, `status`
- Expense: `trip + date`, `user + date`, `category`
- Accommodation: `trip + checkIn`, `user`
- Transportation: `trip + departure.date`, `user`
- Budget Alert: `user + isRead + createdAt`, `trip`

### **Query Optimization:**
- Text search on trip names and descriptions
- Geospatial queries for location-based features
- Efficient date range queries for trip planning
- Category-based expense aggregations

## Future Enhancement Opportunities

1. **Integration APIs**: Currency conversion, weather, flight booking
2. **Social Features**: Trip sharing, reviews, recommendations
3. **Analytics**: Spending patterns, budget optimization suggestions
4. **Mobile Features**: Offline support, GPS tracking, photo uploads
5. **AI Features**: Smart budget recommendations, expense categorization
6. **Reporting**: Detailed trip reports, tax documentation, spending analytics

## Conclusion

This MongoDB schema provides a robust foundation for a professional trip budgeting application. It balances comprehensive functionality with performance optimization, ensuring the app can scale from individual users to enterprise-level travel management platforms. The inclusion of emergency contacts, multi-currency support, and real-time budget alerts makes it particularly suitable for serious travelers who need reliable trip planning and budget management tools.

## Class Diagram - Schema Visualization

```
┌─────────────────────────────────────┐
│                USER                 │
├─────────────────────────────────────┤
│ - _id: ObjectId                     │
│ - username: String (unique)         │
│ - email: String (unique)            │
│ - password: String                  │
│ - firstName: String                 │
│ - lastName: String                  │
│ - dateOfBirth: Date                 │
│ - phoneNumber: String               │
│ - homeAddress: {                    │
│   • street: String                  │
│   • city: String                    │
│   • state: String                   │
│   • zipCode: String                 │
│   • country: String                 │
│ }                                   │
│ - emergencyContact: {               │
│   • name: String                    │
│   • relationship: String            │
│   • phoneNumber: String             │
│   • alternatePhoneNumber: String    │
│   • email: String                   │
│   • address: Object                 │
│   • notes: String                   │
│ }                                   │
│ - travelDocuments: {                │
│   • passport: Object                │
│   • drivingLicense: Object          │
│ }                                   │
│ - preferences: {                    │
│   • defaultCurrency: String         │
│   • budgetAlerts: Object            │
│   • notifications: Object           │
│   • theme: String                   │
│   • language: String                │
│ }                                   │
│ - profilePicture: String            │
│ - isActive: Boolean                 │
│ - lastLogin: Date                   │
│ - createdAt: Date                   │
│ - updatedAt: Date                   │
├─────────────────────────────────────┤
│ + fullName (virtual)                │
│ + age (virtual)                     │
└─────────────────────────────────────┘
                    │
                    │ 1:n
                    ▼
┌─────────────────────────────────────┐
│                TRIP                 │
├─────────────────────────────────────┤
│ - _id: ObjectId                     │
│ - name: String                      │
│ - description: String               │
│ - user: ObjectId → User             │
│ - companions: [{                    │
│   • name: String                    │
│   • email: String                   │
│   • phoneNumber: String             │
│   • relationship: String            │
│ }]                                  │
│ - destination: {                    │
│   • country: String                 │
│   • city: String                    │
│   • state: String                   │
│   • coordinates: Object             │
│   • timezone: String                │
│ }                                   │
│ - dates: {                          │
│   • startDate: Date                 │
│   • endDate: Date                   │
│   • duration: Number (auto-calc)    │
│ }                                   │
│ - budget: {                         │
│   • totalBudget: Number             │
│   • currency: String                │
│   • categoryBudgets: Object         │
│ }                                   │
│ - status: String                    │
│ - isPublic: Boolean                 │
│ - tags: [String]                    │
│ - createdAt: Date                   │
│ - updatedAt: Date                   │
├─────────────────────────────────────┤
│ + totalSpent (virtual)              │
└─────────────────────────────────────┘
           │              │              │
           │ 1:n          │ 1:n          │ 1:n
           ▼              ▼              ▼
┌──────────────────┐ ┌─────────────────┐ ┌──────────────────┐
│     EXPENSE      │ │  ACCOMMODATION  │ │ TRANSPORTATION   │
├──────────────────┤ ├─────────────────┤ ├──────────────────┤
│ - _id: ObjectId  │ │ - _id: ObjectId │ │ - _id: ObjectId  │
│ - trip: ObjectId │ │ - trip: ObjectId│ │ - trip: ObjectId │
│ - user: ObjectId │ │ - user: ObjectId│ │ - user: ObjectId │
│ - title: String  │ │ - name: String  │ │ - type: String   │
│ - description    │ │ - type: String  │ │ - departure: {   │
│ - amount: Number │ │ - address: {    │ │   • location     │
│ - currency       │ │   • street      │ │   • date         │
│ - category       │ │   • city        │ │   • time         │
│ - date: Date     │ │   • state       │ │ }                │
│ - paymentMethod  │ │   • zipCode     │ │ - arrival: {     │
│ - receipt: {     │ │   • country     │ │   • location     │
│   • imageUrl     │ │   • coordinates │ │   • date         │
│   • uploadedAt   │ │ }               │ │   • time         │
│ }                │ │ - checkIn: Date │ │ }                │
│ - location: {    │ │ - checkOut: Date│ │ - provider: {    │
│   • name         │ │ - guests: Number│ │   • name         │
│   • address      │ │ - rooms: Number │ │   • confirmation │
│   • coordinates  │ │ - cost: {       │ │ }                │
│ }                │ │   • amount      │ │ - cost: {        │
│ - splitWith: [{  │ │   • currency    │ │   • amount       │
│   • user         │ │   • perNight    │ │   • currency     │
│   • amount       │ │ }               │ │ }                │
│ }]               │ │ - booking: {    │ │ - passengers     │
│ - tags: [String] │ │   • confirmation│ │ - details: {     │
│ - notes: String  │ │   • platform    │ │   • flightNumber │
│ - createdAt      │ │   • status      │ │   • seatNumber   │
│ - updatedAt      │ │ }               │ │   • class        │
└──────────────────┘ │ - amenities: [] │ │   • duration     │
                     │ - notes: String │ │ }                │
                     │ - createdAt     │ │ - notes: String  │
                     │ - updatedAt     │ │ - createdAt      │
                     └─────────────────┘ │ - updatedAt      │
                                         └──────────────────┘

┌─────────────────────────────────────┐
│            BUDGET ALERT             │
├─────────────────────────────────────┤
│ - _id: ObjectId                     │
│ - user: ObjectId → User             │
│ - trip: ObjectId → Trip             │
│ - type: String                      │
│   • budget_exceeded                 │
│   • budget_warning                  │
│   • category_exceeded               │
│   • low_funds                       │
│ - message: String                   │
│ - threshold: Number                 │
│ - currentAmount: Number             │
│ - category: String (optional)       │
│ - isRead: Boolean                   │
│ - sentAt: Date                      │
│ - createdAt: Date                   │
│ - updatedAt: Date                   │
└─────────────────────────────────────┘

RELATIONSHIPS:
═══════════════
User 1 ──────→ n Trip
User 1 ──────→ n BudgetAlert
Trip 1 ──────→ n Expense
Trip 1 ──────→ n Accommodation  
Trip 1 ──────→ n Transportation
Trip 1 ──────→ n BudgetAlert

INDEXES:
═══════════
User: email, username, createdAt
Trip: user+createdAt, dates.startDate, status
Expense: trip+date, user+date, category
Accommodation: trip+checkIn, user
Transportation: trip+departure.date, user
BudgetAlert: user+isRead+createdAt, trip

SPECIAL FEATURES:
════════════════
• Virtual Properties: fullName, age, totalSpent
• Pre-save Middleware: Trip duration auto-calculation
• Multi-currency Support: 10 major currencies
• Geolocation: GPS coordinates for destinations/expenses
• Emergency Contacts: Required safety feature
• Expense Splitting: Share costs among companions
• Receipt Management: Image upload capability
• Budget Alerts: Real-time spending notifications
```

This class diagram illustrates the complete schema structure with:

1. **Core Entities**: All 6 main collections with their properties
2. **Relationships**: Clear 1:n relationships between entities
3. **Key Features**: Emergency contacts, travel documents, budget management
4. **Database Optimization**: Strategic indexing for performance
5. **Advanced Functionality**: Virtual properties, middleware, and travel-specific features

The diagram demonstrates how the schema supports comprehensive trip planning and budgeting while maintaining data integrity and performance optimization for a professional travel application.