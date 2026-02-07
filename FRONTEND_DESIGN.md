# ClinSight — Frontend UX Design Document

**Application:** ClinSight (Clinical Decision Support System)  
**Scope:** Frontend only — screens, roles, workflows, UI behavior  
**Design system:** See `design.json` (teal primary, Inter typography, card/sidebar/table components)

---

## 1. Secure Login Screen

**Purpose:** Single entry point; user identifies and authenticates. Session begins after successful login.

**Layout:**
- Centered card (max-width ~400px) on light gray background
- Hospital logo and “ClinSight” wordmark at top
- Form: Username, Password, optional “Remember me”
- MFA step: second card or inline prompt (e.g., “Enter code from your authenticator app”) — UI only; no implementation detail
- Primary button: “Sign in”
- Footer: short security disclaimer (e.g., “Authorized use only. Activity may be logged.”)

**UI components:**
- Text inputs (design system: border, focus ring teal, error state red)
- Primary button (teal)
- Link: “Forgot password?” (subtle, below form)

**User actions:**
- Type username/password, submit
- If MFA required: enter code, submit
- See error message for invalid credentials (e.g., “Invalid username or password. Try again.”)

**Error / edge states:**
- Invalid credentials: inline error below form, no field-level hint
- Account locked: message “Account temporarily locked. Contact IT.”
- Session already active: optional message “You are already signed in on another device.”

**Role-based access:** None; all roles use the same login. Role is determined after authentication and drives the next screen.

---

## 2. Role-Aware Home Dashboard

**Purpose:** First screen after login. Content and shortcuts adapt to the signed-in role so each user sees only relevant actions.

**Layout:**
- App shell: sidebar (nav) + main area
- Main: welcome line (“Welcome, [First Name]”), then a grid of shortcut cards and/or small widgets

**Role-specific content:**

| Role | What user sees |
|------|----------------|
| **Patient Intake Officer** | “Patient Registration” and “Bulk Document Upload” as large shortcut cards; optional “Recent registrations” list |
| **Nurse / Clinical Staff** | “Patient worklist” / “My patients,” “Labs & vitals” shortcut; optional “Tasks due today” |
| **Radiologist** | “Imaging worklist,” “Pending studies,” “Imaging review” shortcut |
| **Physician** | “Patient worklist,” “Diagnostic support,” “Clinical notes” shortcuts; optional “Patients needing review” |
| **Hospital Admin** | “User management,” “System usage,” “Audit log” overview cards; no patient list |
| **Compliance / Audit** | “Audit & activity log” as primary card; read-only dashboard summary |

**UI components:**
- Stat/shortcut cards (icon, title, short description, click → navigates)
- Optional list cards (e.g., last 5 items) with “View all” link
- Sidebar and header (see “App shell” below)

**User actions:**
- Click a card → go to the corresponding screen
- Use sidebar for persistent navigation

**Error / edge states:**
- No data: show empty state message (e.g., “No recent activity”) instead of blank

---

## 3. Patient Registration (Intake Officer Only)

**Purpose:** Create a new patient record. Used only by Intake Officers.

**Layout:**
- Single scrollable page or stepped form
- Sections: Demographics, Visit details, optional Contact/Guardian
- Actions fixed at bottom: “Save draft,” “Create patient record” (primary)

**UI components:**
- Demographics: Full name, DOB, Gender, MRN (optional/auto), Phone, Address (street, city, state, ZIP), ID type/number
- Visit: Visit type (e.g., Outpatient, Emergency), Chief complaint (short text), Date/time of visit
- Labels above fields; required fields marked (e.g., asterisk)
- Validation messages inline below field or in a summary at top

**User actions:**
- Fill fields, submit “Create patient record”
- Optional “Save draft” (if supported by UI state)
- Success: confirmation message and redirect to patient record or worklist

**Role-based access:** Only Intake Officer sees this screen in nav and can open it. Others get “Access denied” if they hit the route.

**Sample anonymized values:**
- Name: Jane Doe | DOB: 01/15/1980 | MRN: MRN-XXXXX | Chief complaint: Annual check-up

**Error / edge states:**
- Validation: “Please enter date of birth,” “Invalid phone number”
- Duplicate MRN: “A patient with this MRN already exists. Review or update existing record.”

---

## 4. Bulk Document Upload (Intake Officer Only)

**Purpose:** Attach multiple documents to a patient in one go (e.g., insurance card, ID, prior records).

**Layout:**
- Patient selector at top (search or dropdown) so user picks which patient the upload is for
- Large drag-and-drop zone: “Drag files here or click to browse”
- Below: list of queued/uploaded files with document type tag per file

**UI components:**
- Drop zone (dashed border, teal on hover/focus)
- File list: filename, size, document type dropdown (e.g., Insurance, ID, Lab results, Referral, Other), remove button
- “Upload all” button; per-file or overall progress bar during upload
- Optional “Add more” to queue more files before uploading

**User actions:**
- Select patient, add files (drag or click), assign document type per file, click “Upload all”
- Remove a file from queue before upload
- After upload: success message and optional “Upload more” or “Back to patient”

**Role-based access:** Intake Officer only. Others see access denied.

**Error / edge states:**
- No patient selected: “Please select a patient before uploading.”
- Unsupported file type: “File type not allowed. Use PDF, JPG, or PNG.”
- File too large: “File exceeds 10 MB limit.”
- Upload failed: “Upload failed for [filename]. Try again.”

---

## 5. Patient Worklist / Directory

**Purpose:** List of patients the user is allowed to see; search and filter to find a patient and open their record.

**Layout:**
- Top: search (by name, MRN, DOB) and filters (e.g., status, department, date range)
- Main: table with columns such as Name, MRN, DOB, Status, Last activity, Actions
- Row click or “View” → Patient overview dashboard

**UI components:**
- Search input with search icon (design system)
- Filter chips or dropdowns (Status, Department, Date)
- Data table: header row, sortable columns, status badges (e.g., Active, Discharged, Pending)
- Pagination or “Load more” at bottom

**User actions:**
- Type in search, apply filters, sort by column
- Click row or “View” to open Patient overview

**Role-based visibility:**
- Intake: may see “Registered” or “Pending” emphasis
- Nurse/Physician: see patients they’re assigned to or have access to
- Radiologist: may see worklist filtered to imaging studies/patients
- Admin/Compliance: do not see this patient list (or see a restricted view for admin only, e.g., no clinical data)

**Sample anonymized row:** Jane Doe | MRN-XXXXX | 01/15/1980 | Active | 02/07/2025 | View

**Error / edge states:**
- No results: “No patients match your search. Try different filters.”
- Session expired: redirect to login with message

---

## 6. Patient Overview Dashboard

**Purpose:** One place to see who the patient is, current status, and a timeline of events. Entry point to labs, imaging, notes, and (for physicians) diagnostic support.

**Layout:**
- Left or top: Demographics card (name, DOB, MRN, gender, contact)
- Center/top: Clinical summary and alerts/flags (e.g., Allergies, High risk)
- Bottom or right: Timeline of events (visits, orders, results, notes)
- Links or tabs: Labs & vitals, Imaging, Clinical notes, (Physician only) Diagnostic support

**UI components:**
- Cards (demographics, alerts, summary)
- Badges for status and flags (e.g., “Allergy alert,” “Fall risk”)
- Timeline: date/time on left, short description and type (e.g., “Lab result,” “Note,” “Imaging”) on right
- Tabs or vertical nav to Labs, Imaging, Notes, Diagnostic support

**User actions:**
- Scan demographics and alerts, scroll timeline
- Click a section to go to Labs & vitals, Imaging, Clinical notes, or Diagnostic support

**Role-based access:** All clinical roles see this. Admin/Compliance do not (or see a stripped version without clinical content). Diagnostic support section visible only to Physician.

**Error / edge states:**
- Missing consent: banner “Patient consent may be required for some data. Contact compliance.”
- Incomplete data: “Some information is still being collected.”

---

## 7. Imaging Review Screen

**Purpose:** View radiology studies and add or read imaging notes.

**Layout:**
- Study list (left or top): study date, modality (e.g., X-ray, CT), body part, status
- Main: image viewer (single or comparison), zoom/pan/scroll
- Right or bottom: Study metadata (patient, date, ordering physician), Radiologist notes (read/write depending on role)

**UI components:**
- Thumbnail list or list of studies
- Image viewer (placeholder or simple viewer; no backend detail)
- Text area for “Radiologist notes” with save button
- Metadata in small type (design system body small)

**User actions:**
- Select a study → image and metadata load
- Radiologist: type notes, click “Save notes”
- Others: view only (no edit)

**Read/write by role:**
- Radiologist: can add/edit imaging notes
- Physician/Nurse: read-only notes and images
- Intake/Admin/Compliance: no access or read-only metadata only (no images if policy is strict)

**Error / edge states:**
- Study not found: “Study not available.”
- Image load failure: “Unable to load image. Try again or contact support.”

---

## 8. Labs & Vitals Screen

**Purpose:** View structured labs and vitals; nurses can update observations.

**Layout:**
- Tabs or sections: Vitals, Labs (e.g., Chemistry, Hematology)
- Vitals: table or cards (e.g., BP, HR, Temp, SpO2) with date/time; optional simple trend
- Labs: tables with test name, value, unit, reference range, flag (high/low/normal)
- Abnormal values visually highlighted (e.g., red/amber background or icon)

**UI components:**
- Tables (design system table: header, rows, cell padding)
- Optional trend sparklines or mini line charts for key values
- Badges or color for abnormal (e.g., “High,” “Low”)
- Nurse: “Add observation” or “Edit” for vitals/observations (limited fields)

**User actions:**
- View vitals and labs, filter by date range
- Nurse: click “Add observation” or “Edit,” enter value, save

**Role-based access:**
- Nurse: view + limited edit (observations/vitals as defined in UI)
- Physician: view only or view + request orders (no direct edit of results)
- Radiologist/Intake: view only or no access
- Admin/Compliance: no access to this screen

**Sample anonymized row:** WBC | 12.3 | K/uL | 4.0–11.0 | High

**Error / edge states:**
- No data: “No lab results for this period.”
- Unsaved changes: “You have unsaved changes. Save or discard?”

---

## 9. Clinical Notes Screen

**Purpose:** View and add SOAP-style clinical notes. Role determines who can edit.

**Layout:**
- List of notes (date, author, type/section) on left or top
- Selected note content on the right or below (Subjective, Objective, Assessment, Plan)
- “Add note” opens a form or inline editor

**UI components:**
- Note list (card or row per note) with author, timestamp, version if applicable
- Note body: sections S/O/A/P with labels
- Form for new note: dropdown or fixed structure for S/O/A/P, text areas, “Save” / “Sign”

**User actions:**
- Open a note to read
- Physician (and optionally Nurse per policy): “Add note,” fill S/O/A/P, save
- Version indicator: e.g., “v2 – 02/07/2025”

**Role-based editing:**
- Physician: full add/edit (per policy)
- Nurse: may add or edit limited sections (e.g., Objective only) if UI supports
- Others: read-only

**Error / edge states:**
- Save failure: “Note could not be saved. Try again.”
- Conflict: “This note was updated by someone else. Refresh and try again.”

---

## 10. Diagnostic Support Screen (Physician Only)

**Purpose:** Show decision support content (suggested conditions, evidence, citations). Physician keeps final decision authority.

**Layout:**
- Prominent disclaimer at top: “For decision support only. Physician is responsible for final diagnosis and treatment.”
- Sections: Suggested conditions (with confidence indicator), Evidence summary, Citations panel (expandable or list)
- No automatic actions; all actions (e.g., “Request support”) are explicit

**UI components:**
- Disclaimer banner (warning or info style, always visible)
- List or cards for “Suggested conditions” with label (e.g., “Support suggestion”) and confidence (e.g., bar or percentage)
- Evidence summary: short bullets or paragraphs
- Citations: source name, ID (e.g., mock citation ID), optional “View” link
- Buttons: “Request support” (if applicable), “Export” (if in scope)

**User actions:**
- Read suggestions, evidence, and citations
- Optionally request new support (button), export report
- No “Accept diagnosis” button; UI does not imply replacing physician judgment

**Role-based access:** Physician only. Hidden from nav and routes for all other roles. Others get “Access denied.”

**Error / edge states:**
- No support available: “No support suggestions for this case. Review history and try again.”
- System unavailable: “Support is temporarily unavailable. Proceed with clinical judgment.”

---

## 11. Audit & Activity Log (Admin / Compliance)

**Purpose:** Trace who accessed what and when. Read-only; no data modification.

**Layout:**
- Filters at top: Date range, User, Patient (or resource), Action type
- Main: table — Timestamp, User, Action, Resource (e.g., patient ID or name), Result (e.g., success/failed)
- Export: “Export log” (CSV or PDF) if in scope

**UI components:**
- Date range picker, user dropdown, patient/resource search, action type dropdown
- Table (design system), sortable by time
- “Export” button, optional pagination

**User actions:**
- Set filters, apply, sort columns, export

**Role-based access:** Hospital Admin and Compliance/Audit only. Read-only; no edit/delete.

**Error / edge states:**
- No results: “No matching log entries.”
- Export failed: “Export failed. Try again.”

---

## Error, Safety & Edge States (Frontend Handling)

| Scenario | What the user sees |
|----------|--------------------|
| **Unauthorized access** | Full-page or inline “Access denied. You don’t have permission to view this.” Optional “Back to dashboard.” |
| **Missing patient consent** | Banner on patient screens: “Patient consent may be required for some data.” No blocking of entire page unless policy is to hide sections. |
| **Incomplete data** | Messaging like “Some information is still being collected” or “Lab pending”; no fake data. |
| **Session expiration** | Modal or banner: “Your session has expired. Please sign in again.” Redirect to login; preserve intended URL for post-login redirect if supported. |
| **System downtime** | “ClinSight is temporarily unavailable. Please try again later.” No technical details. |

---

## UX & Design Principles

- **Clinical, calm:** Teal and neutrals from design.json; avoid alarming red except for critical alerts and errors.
- **High readability:** Inter, sufficient contrast, body text 14–16px equivalent; headings clear.
- **Low cognitive load:** One primary action per card/screen; consistent placement of primary button.
- **Accessibility:** Focus ring (teal), min touch target 44px, labels for inputs; support keyboard navigation.
- **Safety disclaimers:** Visible where relevant (login, diagnostic support); no dark patterns or forced choices.

---

## App Shell (Sidebar + Header)

- **Sidebar:** Logo, app name “ClinSight,” nav items filtered by role (only show links the role can access). User block at bottom: avatar, name, “Log out.” Active route highlighted (e.g., teal left border).
- **Header:** Page title and optional breadcrumb; user identity (name/role) and session indicator (e.g., “Session expires in 15 min” or no countdown). No clinical data in header.

---

## Role-Based Visibility Summary

| Screen | Intake | Nurse | Radiologist | Physician | Admin | Compliance |
|--------|--------|-------|-------------|-----------|-------|------------|
| Login | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Home dashboard | ✓ (role view) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Patient registration | ✓ | — | — | — | — | — |
| Bulk upload | ✓ | — | — | — | — | — |
| Patient worklist | ✓ | ✓ | ✓* | ✓ | —/limited | — |
| Patient overview | ✓ | ✓ | ✓ | ✓ | — | — |
| Imaging review | —/read | read | read+write | read | — | — |
| Labs & vitals | read/— | read+edit | read/— | read | — | — |
| Clinical notes | read/— | read/limited edit | read | read+edit | — | — |
| Diagnostic support | — | — | — | ✓ | — | — |
| Audit log | — | — | — | — | ✓ | ✓ |

\* Radiologist worklist may be imaging-centric.

---

*End of frontend design document. No backend, APIs, or implementation logic described; all behavior is from the user’s perspective.*
