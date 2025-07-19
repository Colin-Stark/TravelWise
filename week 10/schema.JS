const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema - Core user management with travel-specific fields
const userSchema = new Schema({
    // Basic Information
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,

        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\+?[\d\s-()]+$/, 'Please enter a valid phone number']
    },

    // Home Address
    homeAddress: {
        street: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        zipCode: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true, default: 'USA' }
    },

    // Emergency Contact - REQUIRED for travel safety
    emergencyContact: {
        name: {
            type: String,
            required: [true, 'Emergency contact name is required'],
            trim: true,
            maxlength: [100, 'Emergency contact name cannot exceed 100 characters']
        },
        relationship: {
            type: String,
            required: [true, 'Relationship to emergency contact is required'],
            enum: ['spouse', 'parent', 'sibling', 'child', 'friend', 'relative', 'colleague', 'other'],
            trim: true
        },
        phoneNumber: {
            type: String,
            required: [true, 'Emergency contact phone number is required'],
            match: [/^\+?[\d\s-()]+$/, 'Please enter a valid phone number']
        },
        alternatePhoneNumber: {
            type: String,
            match: [/^\+?[\d\s-()]+$/, 'Please enter a valid alternate phone number']
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
        },
        address: {
            street: { type: String, trim: true },
            city: { type: String, trim: true },
            state: { type: String, trim: true },
            zipCode: { type: String, trim: true },
            country: { type: String, trim: true }
        },
        notes: {
            type: String,
            maxlength: [500, 'Notes cannot exceed 500 characters'],
            trim: true
        }
    },

    // Travel Documents - ADDED: Essential for international travel
    travelDocuments: {
        passport: {
            number: { type: String, trim: true },
            expirationDate: { type: Date },
            issuingCountry: { type: String, trim: true },
            hasVisa: { type: Boolean, default: false }
        },
        drivingLicense: {
            number: { type: String, trim: true },
            expirationDate: { type: Date },
            issuingState: { type: String, trim: true },
            hasInternationalLicense: { type: Boolean, default: false }
        }
    },

    // Default Currency and Budget Preferences - ADDED: For budget calculations
    preferences: {
        defaultCurrency: {
            type: String,
            default: 'USD',
            enum: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CNY', 'INR', 'MXN', 'BRL']
        },
        budgetAlerts: {
            enabled: { type: Boolean, default: true },
            threshold: { type: Number, default: 80 } // Alert when 80% of budget is reached
        },
        notifications: {
            email: { type: Boolean, default: true },
            push: { type: Boolean, default: true },
            sms: { type: Boolean, default: false }
        },
        theme: {
            type: String,
            enum: ['light', 'dark', 'auto'],
            default: 'auto'
        },
        language: {
            type: String,
            default: 'en'
        }
    },

    profilePicture: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

// Virtual for age calculation
userSchema.virtual('age').get(function () {
    if (!this.dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ createdAt: -1 });

// Trip Schema - ADDED: Core entity for trip planning and budgeting
const tripSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Trip name is required'],
        trim: true,
        maxlength: [100, 'Trip name cannot exceed 100 characters']
    },
    description: {
        type: String,
        maxlength: [1000, 'Description cannot exceed 1000 characters'],
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    companions: [{
        name: { type: String, required: true, trim: true },
        email: { type: String, trim: true },
        phoneNumber: { type: String, trim: true },
        relationship: { type: String, trim: true }
    }],
    destination: {
        country: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, trim: true },
        coordinates: {
            latitude: { type: Number },
            longitude: { type: Number }
        },
        timezone: { type: String, trim: true }
    },
    dates: {
        startDate: { type: Date, required: [true, 'Start date is required'] },
        endDate: { type: Date, required: [true, 'End date is required'] },
        duration: { type: Number } // Auto-calculated in days
    },
    budget: {
        totalBudget: { type: Number, required: [true, 'Total budget is required'], min: 0 },
        currency: {
            type: String,
            required: true,
            enum: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CNY', 'INR', 'MXN', 'BRL'],
            default: 'USD'
        },
        categoryBudgets: {
            accommodation: { type: Number, default: 0 },
            transportation: { type: Number, default: 0 },
            food: { type: Number, default: 0 },
            activities: { type: Number, default: 0 },
            shopping: { type: Number, default: 0 },
            emergency: { type: Number, default: 0 },
            other: { type: Number, default: 0 }
        }
    },
    status: {
        type: String,
        enum: ['planning', 'booked', 'in-progress', 'completed', 'cancelled'],
        default: 'planning'
    },
    isPublic: { type: Boolean, default: false },
    tags: [String]
}, {
    timestamps: true
});

// Pre-save middleware to calculate trip duration
tripSchema.pre('save', function (next) {
    if (this.dates.startDate && this.dates.endDate) {
        const diffTime = Math.abs(this.dates.endDate - this.dates.startDate);
        this.dates.duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    next();
});

// Virtual for total spent calculation
tripSchema.virtual('totalSpent').get(function () {
    // This would be calculated from related expenses
    return 0; // Placeholder - would sum related expenses
});

// Index for efficient querying
tripSchema.index({ user: 1, createdAt: -1 });
tripSchema.index({ 'dates.startDate': 1 });
tripSchema.index({ status: 1 });

// Expense Schema - ADDED: Track all trip expenses for budget management
const expenseSchema = new Schema({
    trip: {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
        required: [true, 'Trip is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    title: {
        type: String,
        required: [true, 'Expense title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot exceed 500 characters'],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0, 'Amount cannot be negative']
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CNY', 'INR', 'MXN', 'BRL']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['accommodation', 'transportation', 'food', 'activities', 'shopping', 'emergency', 'other']
    },
    date: {
        type: Date,
        required: [true, 'Expense date is required'],
        default: Date.now
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'credit_card', 'debit_card', 'mobile_payment', 'bank_transfer', 'traveler_check'],
        required: true
    },
    receipt: {
        imageUrl: { type: String },
        uploadedAt: { type: Date }
    },
    location: {
        name: { type: String, trim: true },
        address: { type: String, trim: true },
        coordinates: {
            latitude: { type: Number },
            longitude: { type: Number }
        }
    },
    splitWith: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        amount: { type: Number, required: true }
    }],
    tags: [String],
    notes: {
        type: String,
        maxlength: [500, 'Notes cannot exceed 500 characters']
    }
}, {
    timestamps: true
});

// Index for expense queries
expenseSchema.index({ trip: 1, date: -1 });
expenseSchema.index({ user: 1, date: -1 });
expenseSchema.index({ category: 1 });

// Accommodation Schema - ADDED: Track hotel/lodging bookings
const accommodationSchema = new Schema({
    trip: {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
        required: [true, 'Trip is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    name: {
        type: String,
        required: [true, 'Accommodation name is required'],
        trim: true
    },
    type: {
        type: String,
        enum: ['hotel', 'hostel', 'airbnb', 'resort', 'motel', 'guesthouse', 'apartment', 'other'],
        required: true
    },
    address: {
        street: { type: String, trim: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, trim: true },
        zipCode: { type: String, trim: true },
        country: { type: String, required: true, trim: true },
        coordinates: {
            latitude: { type: Number },
            longitude: { type: Number }
        }
    },
    checkIn: {
        type: Date,
        required: [true, 'Check-in date is required']
    },
    checkOut: {
        type: Date,
        required: [true, 'Check-out date is required']
    },
    guests: {
        type: Number,
        required: true,
        min: 1
    },
    rooms: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    cost: {
        amount: { type: Number, required: true, min: 0 },
        currency: { type: String, required: true },
        perNight: { type: Boolean, default: true }
    },
    booking: {
        confirmationNumber: { type: String, trim: true },
        platform: { type: String, trim: true }, // Booking.com, Airbnb, etc.
        status: {
            type: String,
            enum: ['confirmed', 'pending', 'cancelled'],
            default: 'confirmed'
        }
    },
    amenities: [String],
    notes: {
        type: String,
        maxlength: [1000, 'Notes cannot exceed 1000 characters']
    }
}, {
    timestamps: true
});

// Index for accommodation queries
accommodationSchema.index({ trip: 1, checkIn: 1 });
accommodationSchema.index({ user: 1 });

// Transportation Schema - ADDED: Track flights, trains, buses, etc.
const transportationSchema = new Schema({
    trip: {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
        required: [true, 'Trip is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    type: {
        type: String,
        enum: ['flight', 'train', 'bus', 'car_rental', 'taxi', 'rideshare', 'ferry', 'other'],
        required: true
    },
    departure: {
        location: { type: String, required: true, trim: true },
        date: { type: Date, required: true },
        time: { type: String, trim: true }
    },
    arrival: {
        location: { type: String, required: true, trim: true },
        date: { type: Date, required: true },
        time: { type: String, trim: true }
    },
    provider: {
        name: { type: String, trim: true }, // Airline, train company, etc.
        confirmationNumber: { type: String, trim: true }
    },
    cost: {
        amount: { type: Number, required: true, min: 0 },
        currency: { type: String, required: true }
    },
    passengers: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    details: {
        flightNumber: { type: String, trim: true },
        seatNumber: { type: String, trim: true },
        class: { type: String, enum: ['economy', 'business', 'first', 'premium_economy'] },
        duration: { type: String, trim: true }
    },
    notes: {
        type: String,
        maxlength: [500, 'Notes cannot exceed 500 characters']
    }
}, {
    timestamps: true
});

// Index for transportation queries
transportationSchema.index({ trip: 1, 'departure.date': 1 });
transportationSchema.index({ user: 1 });

// Budget Alert Schema - ADDED: Track budget alerts and notifications
const budgetAlertSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    trip: {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
        required: true
    },
    type: {
        type: String,
        enum: ['budget_exceeded', 'budget_warning', 'category_exceeded', 'low_funds'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    threshold: {
        type: Number,
        required: true
    },
    currentAmount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['accommodation', 'transportation', 'food', 'activities', 'shopping', 'emergency', 'other']
    },
    isRead: {
        type: Boolean,
        default: false
    },
    sentAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for alert queries
budgetAlertSchema.index({ user: 1, isRead: 1, createdAt: -1 });
budgetAlertSchema.index({ trip: 1 });

// Create and export models
const User = mongoose.model('User', userSchema);
const Trip = mongoose.model('Trip', tripSchema);
const Expense = mongoose.model('Expense', expenseSchema);
const Accommodation = mongoose.model('Accommodation', accommodationSchema);
const Transportation = mongoose.model('Transportation', transportationSchema);
const BudgetAlert = mongoose.model('BudgetAlert', budgetAlertSchema);

module.exports = {
    User,
    Trip,
    Expense,
    Accommodation,
    Transportation,
    BudgetAlert,
    mongoose
};