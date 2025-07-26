
# TravelWise – Project Milestones & Acceptance Criteria


## Milestone 1: Requirements Finalization

**Description:**  
All functional and non-functional requirements for TravelWise are gathered, validated, and approved by all stakeholders.

**Acceptance Criteria:**
- Functional and non-functional requirements documented in the SRS.
- UI mockups reviewed and accepted by stakeholders.
- Business rules and use case specifications traceable.
- Technical feasibility validated (AI, API integrations, responsive UI).
- Stakeholder and team approval received.

---

## Milestone 2: MVP Architecture & Environment Setup

**Description:**  
Establish the core infrastructure for full-stack development.

**Acceptance Criteria:**
- GitHub repository and version control in place.
- Front-end (Next.js), back-end (Node.js), and MongoDB Atlas initialized.
- CI/CD configured with GitHub Actions.
- Environments deployed on Vercel/AWS/Netlify.
- Linting, testing, and security tools integrated.

---

## Milestone 3: Authentication & Dashboard (Sprint 1)

**Description:**  
Build secure user authentication and personalized dashboard.

**Acceptance Criteria:**
- Secure registration and login (JWT + password hashing).
- Two-factor authentication implemented.
- Dashboard displays itineraries and expenses.
- Profile settings editable.
- Input validation and unit tests > 80% coverage.

---

## Milestone 4: Booking System (Sprint 2)

**Description:**  
Develop booking features with third-party API integrations.

**Acceptance Criteria:**
- Flight and hotel search with filters.
- Saved searches persist for logged-in users.
- Live booking via APIs (Skyscanner/RapidAPI).
- Payment flow implemented (mock/test).
- Booking confirmation page added to itinerary.
- Error handling and loading states implemented.

---

## Milestone 5: Itinerary Builder & Guide Interaction (Sprint 3)

**Description:**  
Allow users to build itineraries and message local guides.

**Acceptance Criteria:**
- Add/edit/delete itineraries with time blocks.
- AI-generated destination suggestions appear contextually.
- Drag-and-drop or list/calendar views supported.
- Local guide browsing and chat feature functional.
- All changes persist to MongoDB.

---

## Milestone 6: Expense Tracking System (Sprint 3)

**Description:**  
Enable users to manage their travel expenses.

**Acceptance Criteria:**
- Add/edit/delete expenses with category and currency.
- Multi-currency support via API integration.
- Visual dashboard of expenses by category/date.
- Expense changes reflected in itinerary budget.
- Receipt upload (optional) and validation logic added.

---

## Milestone 7: AI Integration & Recommendations (Sprint 4)

**Description:**  
Provide AI-powered travel suggestions via OpenAI API.

**Acceptance Criteria:**
- Personalized suggestions (destinations, food, hotels).
- AI-generated content clearly labeled.
- Option to add AI-suggested items to itinerary.
- Fallbacks for API failures and disclaimers in UI.
- User feedback loop available for AI suggestions.

---

## Milestone 8: Final Testing, Accessibility & Production Release

**Description:**  
Prepare the product for production with full testing and accessibility compliance.

**Acceptance Criteria:**
- System and integration tests complete (>90% coverage).
- Responsive design and accessibility tested (WCAG 2.1).
- Final deployment to production environment (Vercel/AWS).
- Analytics and metrics implemented for usage tracking.
- All core features verified through QA sign-off.

---

# Sprint Timeline (Gantt-Style Allocation)

> 📅 **Development Phase:** August – December 2025  
> 🌀 **Sprint Duration:** 4 Sprints (~3–4 weeks each)

| Sprint      | Timeline             | Focus Areas                                                                 | Key Milestones Delivered                                 |
|-------------|----------------------|------------------------------------------------------------------------------|-----------------------------------------------------------|
| **Sprint 1** | Aug 1 – Aug 21       | 🔐 Authentication & Profile Setup<br>📊 Dashboard UI                          | ✅ Requirements Finalized<br>✅ MVP Setup<br>✅ Dashboard MVP |
| **Sprint 2** | Aug 22 – Sep 15      | ✈️ Hotel & Flight Booking<br>🔌 Third-Party API Integration                   | ✅ Booking System<br>✅ Live Search & Save Features        |
| **Sprint 3** | Sep 16 – Oct 10      | 🗺 Itinerary Builder<br>🧾 Expense Tracking<br>💬 Guide Messaging              | ✅ Itinerary & Expenses<br>✅ Messaging Features           |
| **Sprint 4** | Oct 11 – Nov 5       | 🤖 AI Recommendations<br>♿ Accessibility<br>🧪 QA & Final Polish              | ✅ AI Suggestion Engine<br>✅ Accessibility & QA Passed     |
| **Buffer**   | Nov 6 – Dec 1        | 🛠 Bug Fixes<br>📈 Analytics<br>🎯 Stakeholder Review                         | ✅ Final Release<br>✅ Stakeholder Sign-off                |

---
