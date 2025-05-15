# Backend Implementation Rules: Niger State IRS & LGA Revenue Payment System

This document outlines the core rules and guidelines for the backend implementation of the Niger State Internal Revenue Service & LGA Revenue Payment System.

## 1. General Technology & Architecture

1.1. **Programming Language & Framework:** The backend will be developed using **Java** with the **Spring Boot** framework.

1.2. **API Documentation:** **Swagger (OpenAPI)** must be implemented and kept up-to-date for all API endpoints. All endpoints should have clear descriptions, request/response examples, and error codes.

1.3. **Database:** A relational database (e.g., PostgreSQL, MySQL) will be used. Specific schema details are outlined below.

1.4. **Security:**
    1.4.1. All sensitive data in transit must be encrypted using HTTPS/TLS.
    1.4.2. All sensitive data at rest (e.g., passwords, financial details) must be encrypted using strong hashing algorithms (e.g., bcrypt for passwords).
    1.4.3. Implement comprehensive input validation for all incoming requests to prevent injection attacks (SQLi, XSS, etc.).
    1.4.4. Follow OWASP Top 10 security best practices.
    1.4.5. Implement robust authentication and authorization mechanisms.

1.5. **Logging:**
    1.5.1. Comprehensive logging must be implemented for all critical operations, errors, and security events.
    1.5.2. Logs should include timestamps, user identifiers (where applicable), event details, and severity levels.
    1.5.3. Consider a centralized logging solution for easier monitoring and analysis.

1.6. **Modularity & Scalability:** Design the backend with modularity in mind, allowing for scalability and maintainability. Consider microservices or service-oriented architecture for distinct functional areas if complexity warrants.

1.7. **Configuration Management:** 
    1.7.1. Externalize configurations (database credentials, API keys, etc.) from the codebase. Use environment variables or dedicated configuration files.
    1.7.2. **Environment-Specific Configurations:** All environments (dev, staging, production) must have separate configurations to prevent accidental cross-environment operations.
    1.7.3. Create a centralized configuration service or repository that will serve as the source of truth for all configuration data across all backend services.
    1.7.4. **Niger State-Specific Configuration:**
        *   Set Niger State-specific tax rates and thresholds:
            *   Personal Income Tax progressive rates as per Nigeria's tax laws
            *   Development Levy: ₦100 flat rate per taxable person per annum
            *   Stamp Duty rates for Niger State
            *   Market Fee rates by category (Small, Medium, Large)
            *   Entertainment Tax: 5% of gate fees or entrance fees
        *   Configure Niger State's fiscal year period (January 1 - December 31)
        *   Set banking details for Niger State Internal Revenue Service
        *   Configure Niger State's 25 LGAs and their respective codes
        *   Set system-specific codes and prefixes for Niger State:
            *   TIN format/validation rules (adhering to FIRS standard)
            *   Receipt number prefix: "NSIRS-"
            *   Assessment reference prefix: "NSIRS-ASMT-"
            *   Payment reference prefix: "NSIRS-PMT-"
            *   Niger State IRS logo paths for document generation
            *   Niger State IRS official email domains and contact information

1.8. **Error Handling:** Implement consistent and informative error handling. API responses for errors should include clear error messages and appropriate HTTP status codes.

1.9. **Testing:**
    1.9.1. Unit tests must be written for all business logic components.
    1.9.2. Integration tests should cover interactions between different modules and external services.
    1.9.3. Aim for high test coverage.

1.10. **Audit and Monitoring:**
    1.10.1. Implement a comprehensive audit logging mechanism that records all significant actions, especially those related to financial transactions, assessments, and user access/permissions.
    1.10.2. Ensure all relevant actions are attributed to a specific user (either public portal user or backoffice user) where applicable.
    1.10.3. Log essential metadata: timestamp (with timezone - Nigeria/Lagos), user ID, IP address, action description, affected resources (IDs), result status.
    1.10.4. All Niger State IRS financial transactions must maintain audit trails for regulatory compliance and audit purposes.

## 1.11. API Response and Error Handling Standards

All backend APIs, especially those serving the public portal dashboard, must adhere to the following response and error handling standards to ensure consistency, predictability, and a good developer/user experience.

1.11.1. **Unified JSON Response Structure:**
    *   All API responses MUST be in JSON format.
    *   The top-level JSON object MUST contain the following fields:
        *   `success`: (Boolean) Indicates if the request was successful (`true`) or not (`false`).
        *   `message`: (String) A concise, human-readable message summarizing the outcome. For successes, this might be "Data retrieved successfully." For errors, it should be a merchant-relatable explanation.
        *   `data`: (Object|Array|null) The actual data payload.
            *   If the request retrieves a single resource, `data` will be a JSON object (e.g., `{ "id": 1, "name": "..." }`).
            *   If the request retrieves a list of resources (e.g., recent transactions, upcoming payments), `data` MUST be a JSON array (e.g., `[ { "id": 1, ... }, { "id": 2, ... } ]`). Even if the list is empty, it should be an empty array `[]`.
            *   If the request results in no data to return (e.g., a successful DELETE operation or no resource found for a non-erroring GET), `data` should be `null`.
        *   `error`: (Object|null) This field MUST be present and contain an error object if `success` is `false`. It MUST be `null` if `success` is `true`. The error object should contain:
            *   `code`: (String) A unique, machine-readable error code (e.g., "VALIDATION_ERROR", "UNAUTHORIZED_ACCESS", "RESOURCE_NOT_FOUND", "INTERNAL_SERVER_ERROR").
            *   `details`: (String|Object|Array) More specific, merchant-relatable information about the error. This can be a simple string, or for validation errors, it could be an object mapping field names to error messages or an array of error objects.

    *   **Success Response Example (Single Resource):**
        ```json
        {
          "success": true,
          "message": "User profile retrieved successfully.",
          "data": {
            "userId": "USR123",
            "name": "John Doe",
            "email": "john.doe@example.com"
          },
          "error": null
        }
        ```
    *   **Success Response Example (List of Resources - e.g., Upcoming Payments):**
        ```json
        {
          "success": true,
          "message": "Upcoming payments retrieved successfully.",
          "data": [
            { "assessmentId": "ASM001", "dueDate": "2023-12-01", "amount": 5000.00 },
            { "assessmentId": "ASM002", "dueDate": "2023-12-15", "amount": 1250.75 }
          ],
          "error": null
        }
        ```
    *   **Success Response Example (Empty List):**
        ```json
        {
          "success": true,
          "message": "No recent transactions found.",
          "data": [],
          "error": null
        }
        ```
    *   **Error Response Example (Validation Error):**
        ```json
        {
          "success": false,
          "message": "Validation failed. Please check the provided data.",
          "data": null,
          "error": {
            "code": "VALIDATION_ERROR",
            "details": {
              "email": "Invalid email format.",
              "password": "Password must be at least 8 characters long."
            }
          }
        }
        ```
    *   **Error Response Example (Resource Not Found):**
        ```json
        {
          "success": false,
          "message": "The requested assessment could not be found.",
          "data": null,
          "error": {
            "code": "ASSESSMENT_NOT_FOUND",
            "details": "No assessment exists with ID: ASM999"
          }
        }
        ```

1.11.2. **HTTP Status Codes:**
    *   Use appropriate HTTP status codes that align with the nature of the response.
        *   `200 OK`: General success for GET, PUT, PATCH, DELETE (if no content, or if content is returned).
        *   `201 Created`: Successful creation of a resource (POST).
        *   `204 No Content`: Successful request but no data to return (e.g., successful DELETE). `data` should be `null`.
        *   `400 Bad Request`: Client-side error (e.g., malformed request, validation errors). `success` is `false`.
        *   `401 Unauthorized`: Authentication is required and has failed or has not yet been provided. `success` is `false`.
        *   `403 Forbidden`: Authenticated user does not have permission to access the resource. `success` is `false`.
        *   `404 Not Found`: The requested resource does not exist. `success` is `false`.
        *   `429 Too Many Requests`: Rate limiting. `success` is `false`.
        *   `500 Internal Server Error`: A generic error message for unexpected server-side errors. `success` is `false`. Avoid sending detailed stack traces to the client; log them server-side.

1.11.3. **Exception Handling:**
    *   The backend MUST gracefully handle all exceptions. Unhandled exceptions should not crash the application or expose sensitive information (like stack traces) in API responses.
    *   Global exception handlers should be implemented to catch any unhandled errors and format them according to the unified error response structure (1.11.1), typically returning a 500 status code with a generic error message and a unique error ID for tracking/logging.

1.11.4. **Merchant-Relatable Error Messages:**
    *   Error messages provided in the `message` and `error.details` fields should be clear, concise, and understandable to a non-technical user (merchant).
    *   Avoid exposing internal system details or jargon. For example, instead of "NullPointerException at com.example.service.PaymentService:123", use "An unexpected error occurred while processing your payment. Please try again or contact support if the issue persists. Error ID: XYZ123".
    *   For validation errors, clearly indicate which field(s) are problematic and why.

1.11.5. **Idempotency for Key Operations:**
    *   For operations that modify data (POST, PUT, PATCH, DELETE), consider idempotency where appropriate, especially for payment-related actions, to prevent duplicate processing if a request is retried.

1.11.6. **Date and Time Format:**
    *   All dates and timestamps in API responses MUST be in ISO 8601 format (e.g., `YYYY-MM-DD` for dates, `YYYY-MM-DDTHH:mm:ss.sssZ` for timestamps) and should be in UTC.

## 2. User Management

2.1. **User Tables:**
    2.1.1. `public_portal_users`: Stores information for individuals and businesses accessing the public portal.
        *   Key fields: User ID (PK), User Type (Individual/Business), Email (Unique, Verified), Phone Number (Verified), Password (Hashed), NIN, BVN, RC Number (for businesses), TIN, Profile Information (Name, Address), Primary LGA (reference to Niger State LGAs), Registration Date, Last Login Date, Account Status (Active, Inactive, Suspended), MFA Settings.
    2.1.2. `backoffice_users`: Stores information for administrative staff.
        *   Key fields: Admin User ID (PK), Username (Unique), Email (Unique, Verified), Password (Hashed), Full Name, Role ID (FK to `roles` table), Last Login Date, Account Status (Active, Inactive), MFA Settings.
2.2. **Authentication:**
    2.2.1. Secure password hashing (e.g., bcrypt) is mandatory.
    2.2.2. Implement JWT (JSON Web Tokens) or a similar token-based authentication mechanism for API access.
    2.2.3. Support for Multi-Factor Authentication (MFA) for both public and backoffice users.
2.3. **Authorization & Roles (Back Office):**
    2.3.1. Implement Role-Based Access Control (RBAC).
    2.3.2. `roles` table: Role ID (PK), Role Name (e.g., Super Admin, Revenue Officer, Reconciliation Clerk, LGA Officer, Support, Auditor).
    2.3.3. `permissions` table: Permission ID (PK), Permission Name (e.g., `CREATE_USER`, `VIEW_REPORTS`).
    2.3.4. `role_permissions` table: Joins `roles` and `permissions` (Role ID (FK), Permission ID (FK)).
    2.3.5. Admin actions must be authorized based on assigned roles and permissions.
2.4. **User Profile Management (Public Portal):**
    2.4.1. API endpoints for users to view and update their profile information.
    2.4.2. OTP verification for changes to sensitive information like email or phone number.
2.5. **User Registration (Public Portal):**
    2.5.1. Backend validation for NIN, TIN, and RC numbers (potentially via integration with relevant government APIs if available).
    2.5.2. Email and phone number verification process (e.g., sending OTP).

2.6. **Detailed Field Requirements for Authentication (from Frontend)**

    2.6.1. **Login (`Login.jsx`)**
        *   `identifier` (Email / Phone / TIN / User ID): Text, **Required**
        *   `password`: Password, **Required**
        *   `rememberMe`: Checkbox, Optional

    2.6.2. **Individual Registration (`RegisterIndividual.jsx`)**
        *   **Personal Information:**
            *   `nin` (NIN): Text, **Required** (11 digits)
            *   `bvn` (BVN): Text, Optional (if provided, 11 digits)
            *   `firstName` (First Name): Text, **Required** (min 2 chars)
            *   `lastName` (Last Name): Text, **Required** (min 2 chars)
            *   `middleName` (Middle Name): Text, Optional
            *   `dateOfBirth` (Date of Birth): Date, **Required** (must be >= 18 years old)
            *   `gender` (Gender): Select, **Required**
            *   `maritalStatus` (Marital Status): Select, **Required**
            *   `occupation` (Occupation): Text, **Required**
        *   **Contact Information:**
            *   `email` (Email): Email, **Required** (valid email format)
            *   `phoneNumber` (Phone Number): Tel, **Required** (Nigerian format `0XXXXXXXXXX`)
            *   `address` (Residential Address): Text, **Required** (min 10 chars)
            *   `state` (State of Residence): Select, **Required**
            *   `lga` (LGA of Residence): Select, **Required**
        *   **Next of Kin Details:**
            *   `nextOfKinName` (Full Name - Next of Kin): Text, **Required** (min 3 chars)
            *   `nextOfKinRelationship` (Relationship): Select, **Required**
            *   `nextOfKinPhone` (Phone Number - Next of Kin): Tel, **Required** (Nigerian format `0XXXXXXXXXX`)
            *   `nextOfKinAddress` (Address - Next of Kin): Text, **Required** (min 10 chars)
        *   **Account Security:**
            *   `password` (Password): Password, **Required** (min 8 chars, number, special character)
            *   `confirmPassword` (Confirm Password): Password, **Required** (must match password)
        *   **Agreement:**
            *   `termsAccepted` (Terms & Conditions): Checkbox, **Required**

    2.6.3. **Business Registration (`RegisterBusiness.jsx`)**
        *   **Business Information:**
            *   `rcNumber` (RC Number): Text, **Required**
            *   `businessName` (Business Name): Text, **Required** (min 2 chars)
            *   `businessType` (Business Type): Select, **Required**
            *   `industry` (Industry): Select, **Required**
            *   `yearEstablished` (Year Established): Number, **Required** (between 1900 and current year)
            *   `tin` (TIN): Text, **Required** (min 8 chars)
        *   **Contact Person Details:**
            *   `contactPersonFirstName` (Contact Person First Name): Text, **Required** (min 2 chars)
            *   `contactPersonLastName` (Contact Person Last Name): Text, **Required** (min 2 chars)
            *   `contactPersonMiddleName` (Contact Person Middle Name): Text, Optional
            *   `contactPersonPosition` (Contact Person Position): Text, **Required**
        *   **Business Contact Details:**
            *   `email` (Business Email): Email, **Required** (valid email format)
            *   `phoneNumber` (Business Phone Number): Tel, **Required** (Nigerian format `0XXXXXXXXXX`)
            *   `alternatePhoneNumber` (Alternate Phone Number): Tel, Optional (if provided, Nigerian format `0XXXXXXXXXX`)
            *   `businessAddress` (Business Address): Text, **Required** (min 10 chars)
            *   `state` (State): Select, **Required**
            *   `lga` (LGA): Select, **Required**
            *   `website` (Website): URL, Optional (if provided, valid URL format)
            *   `numberOfEmployees` (Number of Employees): Number, **Required** (min 1)
        *   **Account Security:**
            *   `password` (Password): Password, **Required** (min 8 chars, number, special character)
            *   `confirmPassword` (Confirm Password): Password, **Required** (must match password)
        *   **Agreement:**
            *   `termsAccepted` (Terms & Conditions): Checkbox, **Required**

    2.6.4. **Forgot Password Flow (`ForgotPassword.jsx`)**
        *   **Step 1: Request Reset Token**
            *   Input: `email` (Registered Email Address): Text, **Required**
            *   Backend Action: Generate a secure, time-limited OTP/token and send it to the user's email. Log the request.
        *   **Step 2: Verify OTP/Token**
            *   Input: `otp` (One-Time Password received via email): Text (e.g., 6 digits), **Required**
            *   Backend Action: Verify the OTP/token against the stored value for the user's email. Invalidate token after use or expiry. Log attempt.
        *   **Step 3: Reset Password**
            *   Input: `newPassword`: Password, **Required** (must meet complexity rules defined in 2.6.2/2.6.3)
            *   Input: `confirmPassword`: Password, **Required** (must match `newPassword`)
            *   Backend Action: Securely hash and update the user's password. Log success. Invalidate any active sessions for the user (optional but recommended).

    2.6.5. **Email Verification Flow (`EmailVerification.jsx`)**
        *   Context: Typically initiated after user registration.
        *   Input: `verificationCode` (OTP received via email): Text (e.g., 6 digits), **Required**
        *   Backend Action (Verify): Validate the OTP against the one generated and stored for the user's pending verification. Mark email as verified upon success. Log attempt.
        *   Backend Action (Resend): Allow user to request a new OTP if the previous one expired or was not received. Generate a new OTP, invalidate the old one, send it to the user's email, and update expiry. Implement rate limiting for resend requests.
        *   Backend Rule: OTPs must be time-limited (e.g., 5-15 minutes validity).

2.7. **User Registration Flow:**
    2.7.1. **API Endpoint:** `POST /api/auth/register`
    2.7.2. **Request Body:**
        ```json
        {
          "userType": "individual", // or "business"
          "email": "user@example.com",
          "phoneNumber": "08012345678", // Nigerian format
          "password": "securePassword123",
          "nin": "12345678901", // For individuals
          "bvn": "12345678901", // Optional but recommended
          "rcNumber": "RC123456", // For businesses
          "profileInformation": {
            "fullName": "John Doe", // or Business Name
            "address": "123 Main Street, Minna, Niger State",
            "dateOfBirth": "1990-01-01", // For individuals
            "gender": "male", // For individuals
            "primaryLga": "Chanchaga" // One of Niger State's 25 LGAs
          }
        }
        ```
    2.7.3. **Niger State-Specific Validation:**
        *   Address validation should check for valid Niger State localities
        *   Primary LGA must be one of Niger State's 25 recognized LGAs
        *   If a TIN is provided, validate format against Niger State IRS TIN system
        *   For businesses, validate business address is within Niger State for proper tax jurisdiction

## 3. Assessment, Billing, and Payment Processing

3.1. **Bill Creation:**
    3.1.1. **Automatic Bill Generation:** Any assessment raised or payment initiated (for services/revenue items that require pre-assessment) must automatically create a corresponding record in a `bills` table.
    3.1.2. `bills` table: Bill ID (PK), User ID (FK to `public_portal_users`), Revenue Head ID (FK to `revenue_heads`), Assessment ID (FK, if applicable), Bill Reference Number (Unique, format: NSIRS-{YEAR}-{SEQUENCE}), Amount Due, Amount Paid, Due Date, Bill Status (Pending, Partially Paid, Paid, Cancelled, Overdue), Generation Date, Description.
3.2. **Payment Recording:**
    3.2.1. **Payment Linking:** When a payment is successfully completed, the `bills` table record associated with that payment must be updated (e.g., `Amount Paid`, `Bill Status`).
    3.2.2. **Payment Record:** A new record must be created in a dedicated `payments` table for every successful payment transaction.
    3.2.3. `payments` table: Payment ID (PK), Bill ID (FK to `bills`), Payment Reference (from gateway, e.g., RRR), Gateway Transaction ID, Payment Date/Time, Amount Paid, Payment Method (Remita, Quickteller, Bank Branch), Payment Channel, Payment Status (Success, Failed, Pending), Currency.
    3.2.4. The `bills` table and `payments` table must be linked via a foreign key (e.g., `payments.BillID` references `bills.BillID`). For ad-hoc payments not tied to a pre-existing bill, a bill record should still be created and linked.
3.3. **Payment Notifications:**
    3.3.1. **Raw Payload Storage:** For each incoming payment notification (e.g., webhook from a payment gateway), the raw, unmodified payload must be stored.
        *   `payment_notifications_log` table: Log ID (PK), Payment Gateway (e.g., Remita, Quickteller), Received Timestamp, Raw Payload (TEXT/JSONB), Processing Status (Pending, Processed, Error), Error Details (if any), Source IP/Identifier.
    3.3.2. **Source Tracking:** The source of the notification (e.g., originating IP, gateway identifier) must also be stored alongside the payload.
3.4. **Payment Gateway Integration:**
    3.4.1. Secure integration with payment gateways (Remita, Quickteller).
    3.4.2. Backend generation of necessary references (e.g., RRR for Remita, unique transaction IDs).
    3.4.3. Secure handling of redirects and callbacks from gateways.
    3.4.4. Implement mechanisms to re-query payment status from gateways if initial confirmation is delayed.
3.5. **Bank Branch Payments:**
    3.5.1. Generation of a unique Payment Reference Number (PRN) for bank branch payments.
    3.5.2. API endpoint for bank tellers or a reconciliation process to post payments made via bank branches, referencing the PRN.
3.6. **Bulk Payments:**
    3.6.1. Backend processing and validation of uploaded bulk payment files (e.g., CSV/Excel for PAYE).
    3.6.2. Generation of a single payment reference for the total bulk amount or individual references as required by the payment gateway.
    3.6.3. Detailed feedback mechanism for validation errors in the uploaded file.

## 4. Revenue Head Management (Back Office)

4.1. `revenue_heads` table: Revenue Head ID (PK), Name, Code (Unique), Description, Source (State/LGA), Type (Tax, Levy, Fee, etc.), Applicable LGA ID (FK, if LGA specific), Pricing Logic (Fixed, Variable, Formula), Fixed Amount, GL Account Code, Is Active.
4.2. `revenue_head_dynamic_fields` table: Field ID (PK), Revenue Head ID (FK), Field Name, Field Type (Text, Number, Date, Dropdown), Is Required, Validation Rules.
4.3. APIs for CRUD operations on revenue heads and their associated dynamic fields.
4.4. (Optional) Workflow for approving changes to revenue heads.

4.5. **Niger State Specific Revenue Heads:**
    4.5.1. **State Revenue Heads:**
        *   Personal Income Tax (PIT): Direct Assessment, PAYE
        *   Withholding Tax (Individual and Corporate)
        *   Capital Gains Tax
        *   Stamp Duties
        *   Road Taxes (Vehicle Registration, Number Plates, Driver's License)
        *   Development Levy
        *   Gaming/Lottery Taxes
        *   Forestry Fees (significant due to Niger State's forest resources)
        *   Mining Fees and Royalties (for solid minerals)
        *   Water Rates
        *   Market Taxes (State Markets)
        *   Entertainment Tax
        *   Land Use Charge/Property Tax
        *   Business Premises Registration/Renewal
        *   Agricultural Produce Tax
        *   Signage and Advertisement
    
    4.5.2. **LGA Revenue Heads:** (For the 25 LGAs of Niger State)
        *   Shops and Kiosks Rates
        *   Tenement Rates
        *   On/Off Liquor License
        *   Slaughter Slab Fees
        *   Marriage/Birth/Death Registration Fees
        *   Naming of Street Registration Fees
        *   LGA Market/Motor Park Fees
        *   Domestic Animal License
        *   Bicycle/Truck/Canoe/Cart Fees
        *   Cattle Tax
        *   Merriment/Road Closure Fees
        *   Radio/TV License
        *   Vehicle Radio License
        *   Wrong Parking Charges
        *   Public Convenience/Sewage/Refuse Fees
        *   Customary Burial Ground Permit
        *   Religious Places Establishment Permit
        *   Signboard/Advertisement Permit (LGA level)
    
    4.5.3. **Niger State LGAs:** The system should support the following 25 LGAs of Niger State:
        * Agaie
        * Agwara
        * Bida
        * Borgu
        * Bosso
        * Chanchaga
        * Edati
        * Gbako
        * Gurara
        * Katcha
        * Kontagora
        * Lapai
        * Lavun
        * Magama
        * Mariga
        * Mashegu
        * Mokwa
        * Munya
        * Paikoro
        * Rafi
        * Rijau
        * Shiroro
        * Suleja
        * Tafa
        * Wushishi

## 5. Assessment Management (Back Office)

5.1. `assessments` table: Assessment ID (PK), User ID (FK to `public_portal_users`), Revenue Head ID (FK to `revenue_heads`), Assessment Reference (Unique), Basis of Assessment, Assessed Amount, Due Date, Status (Draft, Approved, Issued, Paid, Cancelled, SelfAssessedPendingReview), Issue Date, Created By (FK to `

## 15. Dashboard Data Requirements (Public Portal - `DashboardHome.jsx`)

15.1. **API Endpoint for Dashboard Summary:**
    *   Endpoint: e.g., `GET /api/dashboard/summary`
    *   Response Data (personalized for the logged-in user):
        *   `userName`: String (e.g., "John Doe")
        *   `totalOutstandingAmount`: Number (currency)
        *   `totalPaidThisPeriod`: Number (currency, period can be query param: `?period=month|quarter|year`)
        *   `pendingAssessmentsCount`: Integer
        *   `completedPaymentsThisPeriod`: Integer (period can be query param)
        *   `registrationCertificateUrl`: String (URL to download registration certificate, if applicable)

15.2. **API Endpoint for Recent Transactions:**
    *   Endpoint: e.g., `GET /api/dashboard/recent-transactions`
    *   Query Parameters: `limit` (e.g., 5), `sortBy` (e.g., date), `sortOrder` (asc/desc)
    *   Response Data: Array of transaction objects, each containing:
        *   `transactionId`: String
        *   `date`: Date/Timestamp
        *   `description`: String
        *   `amount`: Number (currency)
        *   `status`: String (e.g., "Successful", "Failed", "Pending")
        *   `receiptNumber`: String (or null)
        *   `paymentMethod`: String
        *   `category`: String (e.g., "Tax", "Property", "Business Levy")
        *   `paymentReference`: String

15.3. **API Endpoint for Upcoming Payments / Pending Assessments:**
    *   Endpoint: e.g., `GET /api/dashboard/upcoming-payments`
    *   Query Parameters: `limit` (e.g., 3), `sortBy` (e.g., dueDate), `sortOrder` (asc/desc)
    *   Response Data: Array of payment/assessment objects, each containing:
        *   `assessmentId` or `billId`: String
        *   `dueDate`: Date
        *   `description`: String
        *   `amountDue`: Number (currency)
        *   `status`: String (e.g., "Pending", "Overdue")

15.4. **API Endpoint for Registration Certificate:**
    *   Endpoint: e.g., `GET /api/user/registration-certificate`
    *   Response: File stream (PDF) for download.
    *   Backend Rule: Must verify user is eligible and certificate exists.

15.5. **General Considerations for Dashboard APIs:**
    *   All endpoints must be authenticated and return data only for the logged-in user.
    *   Implement pagination for lists that can grow (though dashboard might show limited items).
    *   Ensure efficient data retrieval, possibly using pre-aggregated data for summaries if performance becomes an issue.

## 16. Assessment Module Requirements (`Assessments.jsx`, `SelfAssessment.jsx`)

16.1. **Assessment Viewing & Filtering (`Assessments.jsx`)**
    16.1.1. **API Endpoint for Assessments List:**
        *   Endpoint: e.g., `GET /api/assessments`
        *   Query Parameters:
            *   `tab`: String (`all`, `unpaid`, `paid`, `part-paid`)
            *   `source`: String (`all`, `Niger State IRS`, `LG`)
            *   `lga`: String (specific Niger State LGA name or `all`)
            *   `status`: String (`all`, `unpaid`, `paid`, `part-paid`)
            *   `year`: String (specific year or `all`)
            *   `search`: String (search query)
            *   `sortBy`: String (`due_date`, `amount`, `revenue_head`)
            *   `sortDirection`: String (`asc`, `desc`)
            *   `page`: Integer (pagination page number)
            *   `limit`: Integer (items per page)
        *   Response Data: 
            *   `items`: Array of assessment objects containing:
                *   `id`: String (Assessment ID)
                *   `taxpayerType`: String (e.g., `individual`, `business`)
                *   `source`: String (e.g., `Niger State IRS`, `LG`)
                *   `lga`: String (Niger State LGA name if source is `LG`, otherwise `N/A`)
                *   `revenueHead`: String (e.g., `Personal Income Tax`, `Tenement Rate`, etc.)
                *   `assessmentNumber`: String (e.g., `NSIRS-PIT-2023-001`)
                *   `period`: String (e.g., `2023 Tax Year`, `2023 Q1`)
                *   `dueDate`: Date
                *   `amount`: Number (full assessment amount)
                *   `amountPaid`: Number (amount paid so far)
                *   `balance`: Number (remaining balance)
                *   `status`: String (`unpaid`, `paid`, `part-paid`)
                *   `basis`: String (e.g., `Annual Income Declaration`, `Property Value Assessment`)
                *   `calculationDetails`: String (details of how the assessment was calculated)
                *   `description`: String (description of the assessment)
            *   `pagination`: Object containing:
                *   `totalItems`: Integer (total number of records matching filters)
                *   `currentPage`: Integer (current page number)
                *   `pageSize`: Integer (number of items per page)
                *   `totalPages`: Integer (total number of pages)
                *   `hasNext`: Boolean (whether there's a next page)
                *   `hasPrevious`: Boolean (whether there's a previous page)

    16.1.2. **API Endpoint for Assessment Details:**
        *   Endpoint: e.g., `GET /api/assessments/{assessmentId}`
        *   Response: Detailed assessment object (as above plus any additional details)

    16.1.3. **API Endpoint for Assessment PDF:**
        *   Endpoint: e.g., `GET /api/assessments/{assessmentId}/pdf`
        *   Response: PDF file stream containing formatted assessment details for download
        *   Security: Must verify user owns the assessment or has appropriate admin permissions

    16.1.4. **API for Common Action Links:**
        *   Pay Now Action: Should create a URL with pre-filled assessment reference to payment page
        *   Print Assessment: Backend should provide a printer-friendly version of the assessment
            *   Option 1: Generate a printable HTML view
            *   Option 2: Generate a PDF and trigger browser print dialog

    16.1.5. **Reference Data API (for Filters):**
        *   Endpoint: e.g., `GET /api/reference-data/lgas`
        *   Response: Array of LGA objects for populating filter dropdowns
        *   Similar endpoints for other reference data (years, revenue heads, etc.)

16.2. **Self-Assessment Creation & Management (`SelfAssessment.jsx`)**
    16.2.1. **Form Fields for Self-Assessment:**
        *   **Assessment Basic Information**
            *   `yearOfAssessment`: String/Integer, **Required** (Tax year, e.g., 2023)
        *   **Sources of Income** (Array of income sources)
            *   `trade`: String (dropdowns of business types), **Required** per source
               *   Options: Trading, Construction, Engineering, Consultancy, Farming, Telecommunication, Other
            *   `income`: Number (income amount), **Required** per source
        *   **Additional Information**
            *   `pension`: Number (annual pension contribution), Optional
            *   `insurancePremium`: Number (insurance premium payments), Optional
        *   **Tax Calculation Summary** (calculated on form, but should be recalculated on backend)
            *   `grossIncome`: Number (sum of all income sources)
            *   `pensionContribution`: Number (from input)
            *   `insurancePremium`: Number (from input)
            *   `expectedPayableTax`: Number (calculated tax amount)
        *   **Declaration**
            *   `declaration`: Boolean, **Required** (agreement to truthfulness of information)

    16.2.2. **Personal Income Tax (PIT) Calculation Rules:**
        *   **Deductions:**
            *   Deduct pension contribution and insurance premium from gross income
            *   Consolidated Relief Allowance (CRA) = NGN 200,000 + 20% of Gross Income
            *   Chargeable Income = (Gross Income - Deductions - CRA)
        *   **Tax Bands (Progressive Taxation):**
            *   First NGN 300,000: 7%
            *   Next NGN 300,000: 11%
            *   Next NGN 500,000: 15%
            *   Next NGN 500,000: 19%
            *   Next NGN 1,600,000: 21%
            *   Above NGN 3,200,000: 24%
        *   **Edge Cases:**
            *   If Chargeable Income is zero or negative, no tax is due
            *   The calculation must handle decimal numbers appropriately

    16.2.3. **API Endpoint for Self-Assessment Submission:**
        *   Endpoint: e.g., `POST /api/self-assessments`
        *   Request Body:
            *   `yearOfAssessment`: String/Integer, **Required**
            *   `incomeSources`: Array, **Required** (Each object contains `trade` and `income`)
            *   `pension`: Number, Optional
            *   `insurancePremium`: Number, Optional
            *   `declaration`: Boolean, **Required**
        *   Response: Created self-assessment object with:
            *   `id`: String (Self-Assessment ID)
            *   `status`: String (e.g., `Submitted`, `Under Review`, `Approved`, etc.)
            *   `submissionDate`: Date/Timestamp
            *   `calculatedTax`: Number (backend-calculated tax amount)
            *   `assessmentReference`: String (if assessment is generated immediately)

    16.2.4. **API Endpoint for Self-Assessment History:**
        *   Endpoint: e.g., `GET /api/self-assessments/history`
        *   Query Parameters:
            *   `page`: Integer (pagination page number)
            *   `limit`: Integer (items per page)
            *   `sortBy`: String (field to sort by, e.g., `year`, `generatedDate`)
            *   `sortDirection`: String (`asc`, `desc`)
        *   Response: 
            *   `items`: Array of historical self-assessments containing:
                *   `year`: String (Assessment year)
                *   `grossIncome`: Number
                *   `taxDue`: Number
                *   `generatedDate`: Date
                *   `receiptNumber`: String (if paid)
                *   `paymentStatus`: String (e.g., `Paid`, `Pending`)
                *   `transactionRef`: String (payment reference)
                *   `transactionResponse`: String (payment response)
            *   `pagination`: Object containing pagination details (as described in 16.1.1)

    16.2.5. **API Endpoint for Additional Assessments:**
        *   Endpoint: e.g., `GET /api/assessments/additional`
        *   Query Parameters: Similar pagination params as in 16.2.4
        *   Response:
            *   `items`: Array of additional assessments containing:
                *   `year`: String (Assessment year)
                *   `selfReportedIncome`: Number
                *   `selfReportedTax`: Number
                *   `additionalIncome`: Number
                *   `additionalTax`: Number
                *   `taxOutstanding`: Number
                *   `status`: String
            *   `pagination`: Object containing pagination details (as described in 16.1.1)

    16.2.6. **View Self-Assessment Details API Endpoint:**
        *   Endpoint: e.g., `GET /api/self-assessments/{selfAssessmentId}`
        *   Response: Detailed view of a specific self-assessment, including:
            *   All submission details (income sources, deductions, etc.)
            *   Calculation breakdown
            *   Status history
            *   Reviewer comments (if reviewed)
            *   Generated assessment reference (if approved)

    16.2.7. **Pay Self-Assessment API Integration:**
        *   The "Pay Now" button next to unpaid self-assessments should:
            *   Create a payment request by calling `POST /api/payments/initiate`
            *   Pre-fill the assessment details in the payment form

16.3. **General Assessment Backend Rules:**
    16.3.1. **Authorization:** 
        *   Only the taxpayer who owns the assessment or authorized administrators should be able to view or manipulate an assessment.
        *   Implement role-based permissions for assessment operations.
        *   Track all assessment views and modifications in the audit log.

    16.3.2. **Validation:** 
        *   All assessment calculations must be re-verified on the backend, regardless of frontend calculations.
        *   Implement thorough validation of all input fields with appropriate error messages.
        *   Validate date ranges (e.g., assessment year cannot be in the future).

    16.3.3. **Storage:** 
        *   All assessment submissions, along with their calculation inputs and results, must be stored for audit purposes.
        *   Store calculation metadata to allow for recalculation if tax rules change.
        *   Maintain version history of assessments if they are modified after initial submission.

    16.3.4. **Assessment Generation:**
        *   Self-assessment submissions should be stored and, based on configuration, may either:
            *   Automatically generate a formal assessment and bill
            *   Be queued for review by a tax officer before formal assessment generation
        *   A configurable threshold amount could determine which path is taken
        *   Store the relationship between a self-assessment and its resulting formal assessment

    16.3.5. **Tax Calculation:** 
        *   The tax calculation algorithm should be maintained as a configurable service that can be updated to reflect current tax laws and rates.
        *   Tax calculation configurations should be versioned with effective dates.
        *   Calculation logs should store which version of the tax rules were applied.

    16.3.6. **Performance Considerations:**
        *   Implement caching for frequently accessed assessment lists and summary data.
        *   Use database indexing on commonly filtered and sorted fields.
        *   Consider pagination implementation for all list endpoints to handle large volumes of assessments.

    16.3.7. **PDF Generation:**
        *   All assessment PDFs should include:
            *   Official government/tax authority branding
            *   Assessment details (taxpayer info, assessment breakdown, calculation)
            *   Unique assessment reference number
            *   Payment instructions
            *   QR code for verification
            *   Digital signature or watermark to prevent forgery
        *   PDFs should be generated on-demand or cached based on volume considerations.
        *   Consider accessibility requirements in PDF generation.

    16.3.8. **Notifications:** 
        *   Users should be notified via email or in-app notification when:
            *   Their self-assessment is submitted
            *   Their self-assessment is approved or rejected
            *   An additional assessment is raised against them
            *   Assessment due dates are approaching
            *   Assessment status changes

This list is comprehensive but may evolve as the project progresses. All backend development should adhere to these rules and established best practices.

## 17. Tax Clearance Certificate Module Requirements (`TaxClearance.jsx`)

17.1. **Database Schema**
    17.1.1. **TCC Applications (`tcc_applications` table):**
        *   `id`: BIGINT, Primary Key
        *   `user_id`: BIGINT, FK to `public_portal_users`
        *   `application_number`: VARCHAR, Unique (Format: e.g., TCC-{YEAR}-{SEQUENCE})
        *   `application_date`: DATETIME
        *   `year`: INT (Tax year for which the TCC is issued)
        *   `status`: ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'CANCELLED')
        *   `source_of_income`: ENUM ('TRADE', 'PROFESSION', 'VOCATION', 'EMPLOYMENT', 'INVESTMENT')
        *   `platform_payment`: ENUM ('Y', 'N') (Whether tax payment was made via PragFifty platform)
        *   `comment`: TEXT (Official comment from tax authority)
        *   `tcc_number`: VARCHAR, Nullable (TCC registration number when approved)
        *   `issue_date`: DATE, Nullable (When TCC was issued)
        *   `expiry_date`: DATE, Nullable (When TCC expires)
        *   `rejection_reason`: TEXT, Nullable
        *   `declaration_accepted`: BOOLEAN
        *   `created_at`: DATETIME
        *   `updated_at`: DATETIME

    17.1.2. **TCC Income Details (`tcc_income_details` table):**
        *   `id`: BIGINT, Primary Key
        *   `tcc_application_id`: BIGINT, FK to `tcc_applications`
        *   `year`: INT
        *   `annual_income`: DECIMAL(15,2)
        *   `assessment_tax_receipt_no`: VARCHAR(50), Nullable
        *   `assessment_tax_amount`: DECIMAL(15,2)
        *   `assessment_tax_receipt_date`: DATE, Nullable
        *   `outstanding_tax`: DECIMAL(15,2)
        *   `dev_levy_receipt_no`: VARCHAR(50), Nullable
        *   `dev_levy_amount`: DECIMAL(15,2)
        *   `dev_levy_receipt_date`: DATE, Nullable
        *   `land_use_charge_receipt_no`: VARCHAR(50), Nullable
        *   `land_use_charge_amount`: DECIMAL(15,2)
        *   `land_use_charge_receipt_date`: DATE, Nullable
        *   `previous_tcc_no`: VARCHAR(50), Nullable
        *   `previous_tcc_issue_date`: DATE, Nullable
        *   `created_at`: DATETIME
        *   `updated_at`: DATETIME

    17.1.3. **TCC Supporting Documents (`tcc_documents` table):**
        *   `id`: BIGINT, Primary Key
        *   `tcc_application_id`: BIGINT, FK to `tcc_applications`
        *   `document_type`: ENUM ('PAYE', 'REGISTRATION', 'BANK', 'EVIDENCE', 'OTHER')
        *   `file_name`: VARCHAR(255)
        *   `file_type`: VARCHAR(100)
        *   `file_path`: VARCHAR(512)
        *   `file_size`: INT
        *   `upload_date`: DATETIME
        *   `created_at`: DATETIME
        *   `updated_at`: DATETIME

17.2. **API Endpoints**
    17.2.1. **TCC Application Management:**
        *   `POST /api/tax-clearance/applications`: Create new TCC application
            *   Request body: Source of income, platform payment flag
            *   Response: Application ID, application number, status

        *   `GET /api/tax-clearance/applications`: List all TCC applications for the current user
            *   Query parameters: year, status
            *   Response: Paginated list of TCC applications

        *   `GET /api/tax-clearance/applications/{id}`: Get TCC application details
            *   Response: Complete TCC application details with income details and documents
        
        *   `PUT /api/tax-clearance/applications/{id}`: Update TCC application
            *   Request body: Updated application fields
            *   Response: Updated application

        *   `DELETE /api/tax-clearance/applications/{id}`: Delete draft TCC application
            *   Validation: Only draft applications can be deleted

        *   `PUT /api/tax-clearance/applications/{id}/submit`: Submit TCC application for review
            *   Request body: Declaration acceptance flag
            *   Validation: All required information must be provided
            *   Response: Updated application with status set to SUBMITTED

    17.2.2. **Income Details Management:**
        *   `POST /api/tax-clearance/applications/{id}/income-details`: Add income details for a year
            *   Request body: Year, annual income, assessment tax details, etc.
            *   Response: Created income details

        *   `PUT /api/tax-clearance/applications/{id}/income-details/{year}`: Update income details for a year
            *   Request body: Updated income details
            *   Response: Updated income details
        
        *   `GET /api/tax-clearance/applications/{id}/income-details`: Get all income details
            *   Response: List of income details for all years

    17.2.3. **Supporting Documents Management:**
        *   `POST /api/tax-clearance/applications/{id}/documents`: Upload supporting document
            *   Request body: Multipart/form-data with file and document type
            *   Response: Document details

        *   `DELETE /api/tax-clearance/applications/{id}/documents/{docId}`: Delete supporting document
            *   Response: Success message

    17.2.4. **TCC Download and History:**
        *   `GET /api/tax-clearance/applications/{id}/download`: Download TCC PDF
            *   Query parameters: format (PDF, CSV)
            *   Validation: Only approved TCCs can be downloaded
            *   Response: TCC document file

17.3. **Detailed Form Field Requirements (`TaxClearance.jsx`)**
    17.3.1. **Step 1: Basic Information**
        *   **Source of Income:**
            *   Field: `sourceOfIncome`
            *   Type: Select
            *   Options: Trade/Business (TRADE), Professional Practice (PROFESSION), Vocation (VOCATION), Employment (EMPLOYMENT), Investment (INVESTMENT)
            *   Validation: Required

        *   **Platform Payment:**
            *   Field: `platformPayment`
            *   Type: Radio
            *   Options: Yes (Y), No (N)
            *   Default: Yes (Y)
            *   Validation: Required
    
    17.3.2. **Step 2: Income & Tax Details (For Each of Last 3 Years)**
        *   **Income Information:**
            *   Field: `incomes.year{n}` (where n is 1, 2, 3 for respective years)
            *   Type: Currency
            *   Validation: Required, non-negative number
        
        *   **Outstanding Tax:**
            *   Field: `outstandingTax.year{n}` 
            *   Type: Currency
            *   Validation: Required, non-negative number
        
        *   **Assessment Tax Paid:**
            *   Receipt Number: `assessmentTaxPaid.receiptNo{n}`
                *   Type: Text
                *   Validation: Required if amount > 0
            *   Amount: `assessmentTaxPaid.amount{n}`
                *   Type: Currency
                *   Validation: Required, non-negative number
            *   Receipt Date: `assessmentTaxPaid.receiptDate{n}`
                *   Type: Date
                *   Validation: Required if amount > 0, must be less than or equal to current date

        *   **Development Levy Paid (Optional):**
            *   Receipt Number: `developmentLevyPaid.receiptNo{n}`
                *   Type: Text
                *   Validation: Required if amount > 0
            *   Amount: `developmentLevyPaid.amount{n}`
                *   Type: Currency
                *   Validation: Non-negative number
            *   Receipt Date: `developmentLevyPaid.receiptDate{n}`
                *   Type: Date
                *   Validation: Required if amount > 0, must be less than or equal to current date

        *   **Land Use Charge (Optional):**
            *   Receipt Number: `landUseCharge.receiptNo{n}`
                *   Type: Text
                *   Validation: Required if amount > 0
            *   Amount: `landUseCharge.amount{n}`
                *   Type: Currency
                *   Validation: Non-negative number
            *   Receipt Date: `landUseCharge.receiptDate{n}`
                *   Type: Date
                *   Validation: Required if amount > 0, must be less than or equal to current date

        *   **Previous TCC (Optional):**
            *   TCC Number: `previousTCC.tccNo{n}`
                *   Type: Text
            *   Issue Date: `previousTCC.issueDate{n}`
                *   Type: Date
                *   Validation: Must be less than or equal to current date
    
    17.3.3. **Step 3: Supporting Documents**
        *   **Document Type:**
            *   Field: `docType`
            *   Type: Select
            *   Options: PAYE Receipt, Business Registration, Bank Statement, Evidence of Payment, Other Document
            *   Validation: Required when uploading a document

        *   **Document File:**
            *   Field: `supportDoc`
            *   Type: File
            *   Validation: Required when uploading, size limit (e.g., 5MB), allowed formats (PDF, JPG, PNG)
            *   Note: When platform payment is 'N', evidence of payment is required
    
    17.3.4. **Step 4: Review & Submit**
        *   **Declaration Agreement:**
            *   Field: `agreementChecked`
            *   Type: Checkbox
            *   Label: "I hereby declare that the information provided is correct and complete to the best of my knowledge."
            *   Validation: Required

17.4. **TCC History View Requirements**
    17.4.1. **History Table Fields:**
        *   Year
        *   Application Number
        *   Application Date
        *   Status (with visual indicators: Approved, Rejected, etc.)
        *   Comment (from tax authority)
        *   TCC Number (when approved)
        *   Action buttons (e.g., Download for approved TCCs)

    17.4.2. **Pagination and Filtering:**
        *   Implement pagination with configurable items per page
        *   Allow filtering by year and status

17.5. **Business Rules for TCC Processing**
    17.5.1. **Application Flow:**
        *   User creates application and enters all required information
        *   System validates all information before submission
        *   Backoffice users review submitted applications
        *   Backoffice users can approve or reject with comments
        *   Upon approval, system generates unique TCC number and PDF document
        *   User can download approved TCC from history
    
    17.5.2. **TCC Number Generation:**
        *   Format: TCCREG-{YEAR}-{SEQUENCE}
        *   Must be unique in the system
    
    17.5.3. **TCC Validity:**
        *   TCCs are typically valid for 1 year from issue date
        *   Expiry date should be calculated and stored upon approval
    
    17.5.4. **Security and Access Control:**
        *   Only authenticated users can apply for TCCs
        *   Users can only view and manage their own TCC applications
        *   Backoffice users can view and process all TCC applications
        *   TCC document download must be secured with proper authorization
    
    17.5.5. **Audit Trail:**
        *   All significant actions on TCC applications must be logged
        *   Changes to status, approvals, and rejections must record who made the change and when

17.6. **Integration Requirements**
    17.6.1. **Notification System:**
        *   Email notifications for application status changes
        *   SMS notifications for approved TCCs (optional)
    
    17.6.2. **Document Generation:**
        *   Ability to generate official TCC document in PDF format
        *   Document should include watermarks/security features to prevent forgery
    
    17.6.3. **Tax Records Integration:**
        *   If tax payments were made through the system, auto-populate tax payment details
        *   Validate tax payment claims against system records when possible

17.7. **Performance and Scalability**
    17.7.1. **Document Storage:**
        *   Implement efficient storage for supporting documents (possibly using S3 or similar)
        *   Consider document lifecycle management and retention policies
    
    17.7.2. **Response Time:**
        *   TCC applications list should load within 2 seconds
        *   Document uploads should process within 5 seconds
        *   TCC document generation and download should complete within 10 seconds

This list is comprehensive but may evolve as the project progresses. All backend development should adhere to these rules and established best practices.

## 18. Liabilities Module Requirements (`Liabilities.jsx`)

18.1. **Database Schema**
    18.1.1. **Tax Liabilities (`tax_liabilities` table):**
        *   `id`: BIGINT, Primary Key
        *   `liability_id`: VARCHAR(20), Unique (Format: e.g., LIB-{SEQUENCE})
        *   `user_id`: BIGINT, FK to `public_portal_users`
        *   `taxpayer_type`: ENUM ('individual', 'business')
        *   `source`: ENUM ('State IRS', 'LG')
        *   `lga_id`: BIGINT, FK to `local_governments` (Nullable, relevant when source is 'LG')
        *   `lga`: VARCHAR(100), (Denormalized for efficiency, e.g., 'Ikeja', 'Lagos Island')
        *   `revenue_head_id`: BIGINT, FK to `revenue_heads`
        *   `revenue_head`: VARCHAR(100), (Denormalized revenue head name for efficiency)
        *   `reference_number`: VARCHAR(50), Unique (Format varies by revenue head type)
        *   `period`: VARCHAR(50) (e.g., '2023 Tax Year', '2023 Q3')
        *   `due_date`: DATE
        *   `amount`: DECIMAL(15,2)
        *   `status`: ENUM ('upcoming', 'due_soon', 'overdue')
        *   `priority`: ENUM ('high', 'medium', 'low')
        *   `description`: TEXT
        *   `created_at`: DATETIME
        *   `updated_at`: DATETIME

18.2. **API Endpoints**
    18.2.1. **Liabilities Listing:**
        *   `GET /api/liabilities`: Get liabilities for the current user
            *   Query Parameters:
                *   `taxpayer_type`: String (filter by 'individual', 'business', or 'all')
                *   `source`: String (filter by 'State IRS', 'LG', or 'all')
                *   `lga`: String (filter by specific LGA or 'all')
                *   `revenue_head`: String (filter by specific revenue head or 'all')
                *   `year`: String (filter by year in period field or 'all')
                *   `search`: String (search across relevant fields)
                *   `sort_by`: String (sort by 'due_date', 'amount', 'priority', 'revenue_head')
                *   `sort_direction`: String ('asc', 'desc')
                *   `page`: Integer (pagination page number)
                *   `items_per_page`: Integer (items per page, default 10)
            *   Response:
                *   `items`: Array of liabilities
                *   `summary`: Object containing aggregate figures
                *   `pagination`: Object with pagination details

        *   `GET /api/liabilities/{liabilityId}`: Get details for a specific liability
            *   Response: Detailed liability object

        *   `GET /api/liabilities/summary`: Get summary statistics of liabilities
            *   Response: 
                *   `totalAmount`: Decimal (total outstanding liability amount)
                *   `overdue`: Integer (count of overdue liabilities)
                *   `dueSoon`: Integer (count of liabilities due soon)
                *   `upcoming`: Integer (count of upcoming liabilities)
                *   `highPriority`: Decimal (total amount of high-priority liabilities)

    18.2.2. **Reference Data for Filters:**
        *   `GET /api/reference-data/local-governments`: Get list of LGAs
            *   Response: Array of LGA objects with IDs and names

        *   `GET /api/reference-data/revenue-heads`: Get list of revenue heads
            *   Response: Array of revenue head objects with IDs and names

        *   `GET /api/reference-data/years`: Get list of relevant years for filtering
            *   Response: Array of year strings (e.g., ['2023', '2022', '2021'])

    18.2.3. **Payment Integration:**
        *   `POST /api/payments/initiate?liability_id={liabilityId}`: Initiate payment for a liability
            *   Response: Payment initiation details including redirect URL or payment reference

18.3. **Detailed Field Requirements**
    18.3.1. **Liability Object Structure:**
        *   `id`: String (Liability ID, e.g., 'LIB-12345')
        *   `taxpayerType`: String ('individual' or 'business')
        *   `source`: String ('State IRS' or 'LG')
        *   `lga`: String (LGA name if source is 'LG', otherwise 'N/A')
        *   `revenueHead`: String (Name of the revenue head)
        *   `refNumber`: String (Reference number specific to the revenue type)
        *   `period`: String (Tax period or year)
        *   `dueDate`: String (ISO 8601 date format)
        *   `amount`: Number (Liability amount)
        *   `status`: String ('upcoming', 'due_soon', 'overdue')
        *   `description`: String (Descriptive text for the liability)
        *   `priority`: String ('high', 'medium', 'low')

    18.3.2. **Liability Summary Structure:**
        *   `totalAmount`: Number (Sum of all filtered liabilities)
        *   `overdue`: Number (Count of overdue liabilities)
        *   `dueSoon`: Number (Count of liabilities due soon)
        *   `upcoming`: Number (Count of upcoming liabilities)
        *   `highPriority`: Number (Sum of high-priority liabilities)

    18.3.3. **Pagination Structure:**
        *   `totalItems`: Number (Total count of items matching filters)
        *   `currentPage`: Number (Current page number)
        *   `totalPages`: Number (Total number of pages)
        *   `itemsPerPage`: Number (Number of items per page)

18.4. **Business Rules**
    18.4.1. **Status Determination:**
        *   `upcoming`: Due date is more than 14 days in the future
        *   `due_soon`: Due date is within the next 14 days
        *   `overdue`: Due date has passed (before current date)

    18.4.2. **Priority Assignment:**
        *   `high`: Liabilities that are overdue or have large amounts (configurable threshold)
        *   `medium`: Liabilities that are due soon or have moderate amounts
        *   `low`: Upcoming liabilities with small amounts

    18.4.3. **Access Control:**
        *   Users can only view liabilities associated with their user ID
        *   Users with both individual and business accounts should be able to switch between viewing individual and business liabilities

    18.4.4. **Liability Generation Rules:**
        *   Liabilities can be generated from:
            *   Assessments (from tax authorities)
            *   Self-assessments (after approval)
            *   Scheduled recurring obligations (e.g., annual business renewal fees)
            *   Manual addition by authorized backoffice users

    18.4.5. **Notification Rules:**
        *   Send notification when a liability status changes (e.g., from `upcoming` to `due_soon` or `due_soon` to `overdue`)
        *   Send notification when new liabilities are added to a user's account
        *   Send reminder notifications for high-priority liabilities

18.6. **Performance and Efficiency Considerations**
    18.6.1. **Caching:**
        *   Consider caching the liabilities summary statistics
        *   Implement efficient querying for filtered liabilities lists

    18.6.2. **Query Optimization:**
        *   Ensure proper indexing on frequently filtered fields (source, lga, revenue_head, due_date, status)
        *   Consider denormalization of frequently accessed attributes for read efficiency

    18.6.3. **Background Processing:**
        *   Implement background jobs to update liability statuses based on due dates
        *   Schedule regular recalculation of summary statistics

18.7. **Frontend Display Requirements**
    18.7.1. **Sorting:**
        *   Support server-side sorting by due_date, amount, priority, and revenue_head
        *   Default sort should be by due date (ascending)

    18.7.2. **Filtering:**
        *   Support comprehensive filtering by taxpayer type, source, LGA, revenue head, and year
        *   Support text search across liability ID, reference number, revenue head, and description

    18.7.3. **Pagination:**
        *   Implement server-side pagination with configurable items per page
        *   Include total item count and page information in API response

This list is comprehensive but may evolve as the project progresses. All backend development should adhere to these rules and established best practices.

## 19. Tax Return Filing Requirements (Based on `TaxReturns.jsx`)

This section outlines the backend rules for handling tax return submissions, reflecting the implementation observed in the `TaxReturns.jsx` component.

19.1. **Core Functionality:** Implement a multi-step tax return filing process allowing users to submit tax information and required documents to Niger State Internal Revenue Service for a specific tax year.

19.2. **Database Schema:**
    19.2.1. `tax_returns` table: To store submitted returns. Key fields: Return ID (PK), User ID (FK), Tax Year, Filing Type ('original', 'amended'), Submission Date, Status ('Submitted', 'Processing', 'Assessed', 'Rejected'), Assessment ID (FK, once assessed), Notes.
    19.2.2. `tax_return_forms` table: Form ID (PK), Return ID (FK), Form Type (e.g., 'A', 'D', 'NIGSIRS-PIT'), Form Data (JSON/JSONB), Validation Status, Validation Errors (if any).
    19.2.3. `tax_return_documents` table: Document ID (PK), Return ID (FK), Document Type (e.g., 'bank_statement', 'employer_letter'), File Path, Upload Date, Validation Status.
    19.2.4. `tax_return_amended_history` table: To track amendment history (previous values).

19.3. **Niger State Tax Form Types and Fields:**
    19.3.1. **Form NIGSIRS-PIT (Personal Income Tax Return):** 
        *   Basic Information: Taxpayer Name, TIN, Residential Address (in Niger State), Email, Phone Number
        *   Employment Information: Employer Name, Employer TIN, Employment Address, Job Title, Employment Start Date
        *   Income Declaration:
            *   Salary and Wages (₦)
            *   Business/Trade Income (₦)
            *   Professional Fees (₦)
            *   Investment Income (Dividends, Interest, Rent) (₦)
            *   Farming Income (₦) - important in Niger State's agricultural economy
            *   Other Income (₦)
        *   Allowable Deductions:
            *   Pension Contributions (₦)
            *   National Housing Fund (₦)
            *   National Health Insurance (₦)
            *   Life Assurance Premium (₦)
        *   Relief Claims:
            *   Consolidated Relief Allowance
            *   Child Allowance
            *   Dependent Relative Allowance
            *   Disability Allowance

    19.3.2. **Form NIGSIRS-CIT (Company Income Tax Return - for businesses):**
        *   Basic Information: Company Name, RC Number, TIN, Business Address in Niger State
        *   Financial Information: Accounting Period, Turnover, Gross Profit, Total Income
        *   Deductions: Operational Expenses, Capital Allowances
        *   Special Niger State Deductions: Agricultural Investment Allowance (Niger State is highly agricultural)
        *   Mining Operations: Special Fields for mining operations (relevant for Niger State's mining sector)

    19.3.3. **Required Supporting Documents:**
        *   For PIT: Evidence of Income (Pay Slips, Bank Statements), Evidence of Deductions (Pension, NHF, etc.)
        *   For CIT: Financial Statements, Evidence of WHT Deductions, Evidence of Capital Allowance Claims
        *   For Agricultural Income: Evidence of Farm Ownership or Lease in Niger State 
        *   For Mining Income: Evidence of Mining License in Niger State

19.4. **API Endpoints:**
    19.4.1. **Initiate Tax Return:** `POST /api/tax-returns/initiate`
        *   Request Body Example:
            ```json
            {
              "taxYear": 2023,
              "filingType": "original", // or "amended"
              "amendmentReason": null,  // required if filingType is "amended"
              "formType": "NIGSIRS-PIT" // or "NIGSIRS-CIT"
            }
            ```
        *   Response Example:
            ```json
            {
              "returnId": "NSIRS-TR-123456",
              "status": "Draft",
              "steps": [
                {"id": 1, "name": "Personal Information", "isCompleted": false},
                {"id": 2, "name": "Income Declaration", "isCompleted": false},
                {"id": 3, "name": "Deductions & Relief", "isCompleted": false},
                {"id": 4, "name": "Document Upload", "isCompleted": false},
                {"id": 5, "name": "Review & Submit", "isCompleted": false}
              ]
            }
            ```

19.5. **Backend Rules & Processing:**
    19.5.1. **Validation:** Rigorously validate all incoming data (types, ranges, required fields, file types/sizes).
    19.5.2. **File Storage:** Implement secure and reliable storage for uploaded documents (e.g., S3 or similar), linking them to the corresponding return record. Ensure access control.
    19.5.3. **Status Management:** Manage the lifecycle of a return (e.g., `Submitted` -> `Processing` -> `Assessed`/`Rejected`). Update `assessmentStatus`, `amount`, `comment` based on backoffice actions or automated assessment results.
    19.5.4. **Authorization:** Ensure users can only submit, view, and manage their own tax returns. Implement role-based access for backoffice processing.
    19.5.5. **Audit Trail:** Log all significant actions: submission, status changes, document uploads/downloads, assessment updates.
    19.5.6. **Notifications:** Notify users of key events: successful submission, status changes (especially assessment completion or rejection), required actions.
    19.5.7. **Amended Filings:** Define the process for handling 'amended' filings. Does it supersede the original? How is it linked?

19.6. **Performance:** Employ caching, database indexing, and pagination for history/listing endpoints. Optimize file upload/download processes.

19.7. **Document Requirements for Niger State:**
    19.7.1. **Valid Document Types:** Define valid document types based on the form type (NIGSIRS-PIT, NIGSIRS-CIT) and taxpayer category.
    19.7.2. **Required Documents for PIT in Niger State:**
        *   Proof of Identity (National ID, Driver's License, International Passport)
        *   Proof of Income (Bank Statements, Pay Slips)
        *   Evidence of Deductions (Pension Contribution Statements)
        *   Evidence of Rental Income (if applicable)
        *   Evidence of Niger State Agricultural Income (if applicable)
    19.7.3. **Required Documents for CIT in Niger State:**
        *   Financial Statements (Balance Sheet, Income Statement)
        *   Evidence of Tax Deducted at Source
        *   Certificate of Niger State Business Registration/Incorporation
        *   Evidence of Capital Allowance Claims
        *   Proof of Residence in Niger State (for tax jurisdiction)
    19.7.4. **Document Requirements API:** `GET /api/tax-returns/{returnId}/document-requirements`
        *   Should return the list of required and optional documents specific to the return's form type and taxpayer details
        *   Example Response:
            ```json
            {
              "requiredDocuments": [
                {
                  "type": "identity_proof",
                  "name": "Proof of Identity",
                  "description": "National ID, Driver's License, or International Passport",
                  "formats": ["pdf", "jpg", "png"],
                  "maxSizeKb": 5120
                },
                // ... other required documents
              ],
              "optionalDocuments": [
                {
                  "type": "agricultural_income_proof",
                  "name": "Proof of Agricultural Income",
                  "description": "Farm ownership or lease documents in Niger State",
                  "formats": ["pdf", "jpg", "png"],
                  "maxSizeKb": 5120
                },
                // ... other optional documents
              ]
            }
            ```

This list reflects the requirements derived from `TaxReturns.jsx` but may need further refinement based on complete business logic for tax filing and assessment. All development must adhere to these rules and established best practices.

## 20. Payment Processing Implementation

This section details the backend requirements for handling the complete payment lifecycle, integrating information from Section 3, the `public-portal-rule`, and components like `Payment.jsx`.

20.1. **Payment Initiation:**
    20.1.1. **API Endpoint:** `POST /api/payments/initiate`
    20.1.2. **Purpose:** To create a unique, trackable payment transaction record before interacting with any payment gateway or method.
    20.1.3. **Request Body Context:** Must accept sufficient context to identify what is being paid for. Examples:
        *   Assessment-based: `{ "assessmentId": "NSIRS-ASSMT-123" }`
        *   Liability-based: `{ "liabilityId": "NSIRS-LIB-456" }`
        *   Self-Assessment-based: `{ "selfAssessmentId": "NSIRS-SA-789" }` (Post-approval)
        *   Ad-hoc: `{ "revenueHeadId": 101, "lgaId": 5 (if required), "amount": 5000.00, "period": "2024", "dynamicFields": { "property_id": "XYZ" } }`
        *   Bulk Payment: `{ "bulkPaymentBatchId": "NSIRS-BULK-ABC" }`
    20.1.4. **Backend Action:**
        *   Validate the incoming context (e.g., does the assessment exist and belong to the user? Is the amount valid for the revenue head?).
        *   Create a record in the `payments` table (defined in 3.2.3) with a unique internal `transactionId` (or Payment ID), link it to the source (assessment, liability, bill, etc.), set initial status to 'Pending' or 'Initiated', and record the `amountDue`.
        *   If not derived from an assessment/bill, create a corresponding record in the `bills` table (3.1.2) and link it.
    20.1.5. **Response:** `{ "transactionId": "UNIQUE_TXN_ID", "amount": 5000.00, "currency": "NGN", "description": "Payment for Land Use Charge 2024" }`

20.2. **Fetching Available Payment Methods:**
    20.2.1. **API Endpoint:** `GET /api/payments/methods`
    20.2.2. **Purpose:** To provide the frontend (`Payment.jsx`) with the list of currently enabled payment channels configured in the backend.
    20.2.3. **Response:** Array of payment method objects, e.g.:
        ```json
        [
          { "id": "remita", "name": "Remita", "description": "Pay via Card, Bank, USSD, Wallet", "icon": "remita_logo", "fee": "Gateway fees apply", "isEnabled": true },
          { "id": "quickteller", "name": "Quickteller", "description": "Pay with Card or other Quickteller options", "icon": "quickteller_logo", "fee": "Gateway fees apply", "isEnabled": true },
          { "id": "bank_branch", "name": "Pay at Bank Branch", "description": "Generate a reference number to pay at any supported bank", "icon": "bank_icon", "fee": "No platform fee", "isEnabled": true },
          { "id": "ussd_direct", "name": "Direct USSD", "description": "Pay using a USSD code on your phone", "icon": "ussd_icon", "fee": "Network charges apply", "isEnabled": false } // Example: USSD might be routed via Remita instead
        ]
        ```
    20.2.4. **Backend Action:** Retrieve configuration settings defining enabled methods and their associated metadata.

20.3. **Payment Preparation & Gateway Interaction:**
    20.3.1. **API Endpoint:** `GET /api/payments/{transactionId}/prepare?method={methodId}` (or similar POST endpoint if preferred)
    20.3.2. **Purpose:** To generate gateway-specific references/URLs/codes after the user selects a payment method for the initiated `transactionId`.
    20.3.3. **Backend Action (Method-dependent):**
        *   **`methodId` = 'remita' / 'quickteller':**
            *   Call the respective gateway's API (securely, using configured credentials) with transaction details (amount, transactionId/orderId, customer email/phone, callback URL).
            *   Receive the gateway's payment reference (e.g., Remita RRR) and redirect URL.
            *   Update the `payments` record with the gateway reference.
            *   Return: `{ "gatewayReference": "RRR123456", "redirectUrl": "https://gateway.remita.net/...", "method": "remita" }`
        *   **`methodId` = 'bank_branch':**
            *   Generate a unique, persistent Payment Reference Number (PRN) specifically for this transaction. Store it in the `payments` record. The PRN should ideally incorporate check digits or patterns for easier teller input/validation.
            *   Return: `{ "paymentReferenceNumber": "NSIRS-PRN-987654321", "instructions": "Present this number at any partner bank branch...", "method": "bank_branch" }`
        *   **`methodId` = 'ussd_direct' (or via Remita/QT):**
            *   If direct: Generate the full USSD string (e.g., `*ServiceCode*MerchantCode*Amount*InternalRef#`). Requires configuration of codes.
            *   If via gateway: Call gateway API to get a USSD code/session specific to the transaction.
            *   Store the generated code/reference.
            *   Return: `{ "ussdCode": "*123*456*5000*NSIRS-XYZ#", "instructions": "Dial this code on your phone...", "method": "ussd" }`
    20.3.4. **Security:** All communication with gateways must be secure (HTTPS). Sensitive credentials must be stored encrypted and managed via configuration (1.7).

20.4. **Bank Payment Slip Generation:**
    20.4.1. **API Endpoint:** `GET /api/payments/{transactionId}/bank-slip`
    20.4.2. **Purpose:** To generate a downloadable/printable PDF payment slip for transactions intended for bank branch payment.
    20.4.3. **Prerequisite:** The transaction must have been prepared using the 'bank_branch' method (20.3.3) and have a generated PRN.
    20.4.4. **Backend Action:** Generate a PDF document containing: Beneficiary details (Niger State IGR), Taxpayer Name/ID, the generated PRN, Amount Due, Revenue Head/Description, Payment Instructions, Date Generated, potentially a Barcode/QR code representing the PRN.
    20.4.5. **Response:** PDF file stream (`Content-Type: application/pdf`).

20.5. **Payment Status Confirmation & Updates:**
    20.5.1. **Webhook Endpoints:**
        *   `POST /api/webhooks/remita`
        *   `POST /api/webhooks/quickteller`
        *   (Define endpoints for other relevant asynchronous updates if needed)
    20.5.2. **Purpose:** To receive real-time payment status updates pushed from payment gateways.
    20.5.3. **Backend Action:**
        *   **Security:** MUST rigorously validate the authenticity and integrity of incoming webhooks (e.g., verify request signature using shared secrets, check source IP if possible). Reject any invalid requests immediately.
        *   Log the raw, unmodified webhook payload in `payment_notifications_log` (3.3.1), including source IP/headers for traceability.
        *   Parse the validated payload to extract transaction status, gateway transaction ID, amount paid, payment date, etc.
        *   Find the corresponding internal transaction in the `payments` table (using the gateway reference or original transaction ID).
        *   Atomically update the `payments` record status ('Success', 'Failed'), `amountPaid`, `paymentDate`, `gatewayTransactionId`, etc.
        *   If status is 'Success', update the corresponding `bills` record status (3.2.1). Trigger downstream actions (e.g., notifications, receipt availability).
        *   Handle potential duplicate webhooks gracefully (idempotency).
        *   Log processing status (Processed, Error) in `payment_notifications_log`.
    20.5.4. **Manual/Reconciled Updates:** Implement mechanisms (e.g., backoffice interface, scheduled jobs) to update statuses for payments made via Bank Branch (based on reconciliation files) or USSD (if no webhook exists).
    20.5.5. **Status Polling API:**
        *   **Endpoint:** `GET /api/payments/{transactionId}/status`
        *   **Purpose:** Allow frontend to check the current status of a transaction, especially after redirection or if webhook delivery is uncertain.
        *   **Backend Action:** Retrieve the latest status from the `payments` table for the given `transactionId`.
        *   **Response:** `{ "transactionId": "UNIQUE_TXN_ID", "status": "Success", "amountPaid": 5000.00, "paymentDate": "...", "receiptAvailable": true }`
    20.5.6. **Gateway Re-query:** Implement background jobs or triggers to re-query payment status directly from the gateway API (as per 3.4.4) for transactions that remain 'Pending' for an extended period, using the stored gateway reference.

20.6. **E-Receipt Generation:**
    20.6.1. **API Endpoint:** `GET /api/receipts/{transactionId}` (or `GET /api/payments/{transactionId}/receipt`)
    20.6.2. **Purpose:** Provide downloadable official e-receipts for successfully completed transactions.
    20.6.3. **Backend Action:** Verify the transaction status is 'Success'. Generate a PDF receipt (as detailed in `public-portal-rule` VI.2) containing official branding, unique receipt number, QR code (optional), payment details, etc.
    20.6.4. **Response:** PDF file stream (`Content-Type: application/pdf`).

20.7. **Configuration:** Payment gateway credentials, enabled methods, fee structures (if managed internally), webhook secrets, and endpoint URLs must be externalized configuration (1.7).

This section consolidates payment processing rules. Development should adhere to these guidelines and relevant security best practices (1.4).

## 21. Quick Pay Feature Implementation

This section outlines the backend requirements to support the simplified "Quick Pay" feature, as observed in `QuickPay.jsx`, designed primarily for informal sector payments and common, high-frequency levies.

21.1. **Concept:** Quick Pay provides shortcuts for initiating payments for specific, predefined revenue items without navigating the full revenue head structure. These Quick Pay items are essentially configurations mapping to formal `revenue_heads` records.

21.2. **Configuration/Mapping:**
    21.2.1. The backend needs a mechanism to manage the mapping between Quick Pay options presented on the frontend and the corresponding formal `revenue_heads` record (`revenueHeadId`).
    21.2.2. This configuration should define for each Quick Pay option:
        *   Frontend display properties (title, description, icon - icon mapping handled by frontend).
        *   The corresponding `revenueHeadId`.
        *   Source (`State` or `LG`).
        *   Requirement for LGA selection (`requiresLga`).
        *   Any specific sub-context required (e.g., `requiresMarketSelection`).
        *   Fee rules (`feeMin`, `feeMax`, `isFeeFixed`, `defaultFeeAmount`).
    21.2.3. **(Recommended) API for Options:** `GET /api/quickpay/options`
        *   Purpose: To allow the frontend (`QuickPay.jsx`) to dynamically fetch the available Quick Pay configurations.
        *   Response: Array of Quick Pay option objects containing the mapping details defined in 21.2.2.
        *   Filtering/Search: The API endpoint **MUST** support a `search` query parameter (e.g., `?search=market`). The backend should filter the returned options, matching the `search` term (case-insensitive) against the option's `title`, `description`, `revenueHead`, and `subHead` (if applicable).

21.3. **Niger State-Specific Quick Pay Items:**
    21.3.1. **Common State Quick Pay Options:**
        *   Daily Market Fee (Niger State Markets)
        *   Hawkers Permit
        *   Niger State Development Levy
        *   Artisan Registration
        *   Mining Fee (Small Scale)
        *   Waste Disposal Fees
        *   Entertainment Tax (Small Events)
        *   Forestry Permit (Small Scale)
        *   Agricultural Produce Movement Permit
    
    21.3.2. **Common LGA Quick Pay Options:** (For Niger State's 25 LGAs)
        *   Daily Market Fee (LG)
        *   Kiosk Rate
        *   Cart/Wheelbarrow Fee
        *   Domestic Animal Fee
        *   Motor Park Fee
        *   Merriment/Road Closure Fee
        *   Wrong Parking Charges
        *   Slaughter Fee

21.4. **Payment Initiation:**
    21.4.1. The standard `POST /api/payments/initiate` endpoint (defined in 20.1) will be used.
    21.4.2. The frontend (`QuickPay.jsx`), after gathering user input for a selected Quick Pay option, will call this endpoint.
    21.4.3. **Expected Payload Structure:**
        ```json
        {
          "revenueHeadId": 123, // ID mapped from the selected Quick Pay option
          "lgaId": 45, // Included only if requiresLga is true and LGA selected
          "amount": 200.00, // Entered or default amount, validated against fee rules
          "payerPhoneNumber": "08012345678", // Collected phone number
          "context": { // Optional context field
            "sourceChannel": "QuickPay",
            "quickPayItemId": "market-fee", // Frontend ID of the selected option
            "marketName": "Ipaja Market" // Included only if requiresMarketSelection is true and market selected
          },
          "period": "YYYY-MM-DD" // Or relevant period like "2024" if applicable
        }
        ```
    21.4.4. **Backend Validation:** In addition to standard validation, the backend must verify:
        *   The provided `amount` adheres to the `min`/`max`/`fixed` rules associated with the mapped `revenueHeadId` (fetched from the Quick Pay configuration or `revenue_heads` table).
        *   An `lgaId` is provided if the mapped `revenueHeadId` requires it (based on configuration).
        *   The `payerPhoneNumber` format is valid.

21.5. **Data Storage:**
    21.5.1. The `payments` table should store the transaction initiated via Quick Pay like any other payment.
    21.5.2. Consider adding optional fields to the `payments` table or a related context table to store specific Quick Pay details for reporting/reconciliation if needed:
        *   `payer_phone_number` (VARCHAR)
        *   `source_channel` (VARCHAR, e.g., 'QuickPay', 'Standard', 'Bulk')
        *   `context_lga_id` (BIGINT, FK to LG table, if different from user's primary LGA)
        *   `context_market_name` (VARCHAR)
        *   `quick_pay_item_ref` (VARCHAR, storing the frontend ID like 'market-fee')

21.6. **Subsequent Payment Flow:**
    21.6.1. Once the payment is successfully initiated via `POST /api/payments/initiate` and a `transactionId` is returned, the subsequent steps (fetching methods, preparing the transaction for the selected gateway, handling webhooks/status updates, generating receipts) follow the standard process defined in Section 20.

This section outlines the specific backend considerations for the Quick Pay feature. Implementation should ensure seamless integration with the existing revenue head and payment processing systems.

## 22. Transaction History Implementation

This section details the backend requirements for fetching and displaying payment transaction history, as observed in `TransactionHistory.jsx`.

22.1. **Core Functionality:** Provide authenticated users access to a comprehensive, filterable, sortable, and paginated list of their past payment transactions.

22.2. **Primary API Endpoint:** `GET /api/payments/history`
    22.2.1. **Purpose:** To retrieve a list of payment transactions for the logged-in user, supporting various query parameters.
    22.2.2. **Query Parameters (Required for Functionality):**
        *   **Filtering:**
            *   `source`: String (e.g., 'Niger State IRS', 'LG', 'all')
            *   `lgaId`: Integer/String (ID or name of the Niger State LGA, relevant if `source` is 'LG' or 'all')
            *   `paymentMethod`: String (e.g., 'Remita', 'Quickteller', 'Bank', 'all')
            *   `status`: String (e.g., 'successful', 'pending', 'failed', 'all')
            *   `dateStart`: String (ISO 8601 Date, e.g., 'YYYY-MM-DD')
            *   `dateEnd`: String (ISO 8601 Date, e.g., 'YYYY-MM-DD')
            *   `search`: String (Free-text search query)
        *   **Sorting:**
            *   `sortBy`: String (e.g., 'date', 'amount', 'revenueHead', default: 'date')
            *   `sortDirection`: String ('asc', 'desc', default: 'desc')
        *   **Pagination:**
            *   `page`: Integer (Current page number, default: 1)
            *   `limit`: Integer (Items per page, default: 10)
    22.2.3. **Backend Action:**
        *   Authenticate the user.
        *   Query the `payments` table (and potentially related tables like `bills`, `revenue_heads`, `lgas` for names/descriptions if not denormalized) for records matching the user ID and all active filter parameters.
        *   Apply the search query across relevant fields (e.g., `payments.id`, `payments.gateway_reference`, `revenue_heads.name`, `bills.description`).
        *   Apply sorting based on `sortBy` and `sortDirection`.
        *   Apply pagination using `page` and `limit`.
        *   Calculate summary statistics (total successful amount, counts by status) based *only* on the filtered results *before* pagination is applied.
    22.2.4. **Response Structure:**
        ```json
        {
          "items": [
            {
              "id": "NSIRS-TXN-12345", // Internal Payment ID
              "transactionRef": "NSIRS-REF-2023-001", // Gateway or Bank Branch Ref
              "date": "2023-09-15T10:30:00Z", // ISO 8601 Timestamp
              "revenueHead": "Personal Income Tax", // Name of the revenue head
              "source": "Niger State IRS", // 'Niger State IRS' or 'LG'
              "lga": "N/A", // Niger State LGA Name or N/A
              "amount": 145000.00,
              "paymentMethod": "Remita",
              "status": "successful", // 'successful', 'pending', 'failed'
              "description": "Annual Personal Income Tax Payment" // From Bill or derived
            },
            // ... other transaction items
          ],
          "pagination": {
            "totalItems": 125, // Total count matching filters
            "currentPage": 1,
            "pageSize": 10,
            "totalPages": 13
          },
          "summary": {
            "totalSuccessfulAmount": 550250.75,
            "successfulCount": 85,
            "pendingCount": 15,
            "failedCount": 25
          }
        }
        ```

22.3. **Transaction Detail API Endpoint:** `GET /api/payments/{transactionId}`
    22.3.1. **Purpose:** To retrieve all available details for a single payment transaction, identified by its internal `transactionId`.
    22.3.2. **Backend Action:** Authenticate user and verify they own the transaction. Fetch the corresponding record from the `payments` table and any related details (e.g., linked bill info, revenue head details, payer context if stored).
    22.3.3. **Response:** A detailed transaction object, potentially including more fields than the list view (e.g., specific gateway IDs, full description, link to related assessment if applicable).

22.4. **Data Source & Performance:**
    22.4.1. Primarily queries the `payments` table.
    22.4.2. Database indexes are CRITICAL on `user_id`, `payment_date`, `status`, `source`, `lga_id` (if applicable), `payment_method`, and any fields used in the text search for efficient filtering and sorting.

22.5. **Authorization:** All endpoints MUST ensure users can only access their own transaction data.

22.6. **Receipt/Retry Links:** The data returned by both list and detail endpoints should implicitly contain the necessary identifiers (e.g., `transactionId`) for the frontend to construct links for downloading receipts (Section 20.6) or retrying payments (Section 20.3).

This section outlines the backend requirements for the transaction history feature. Focus on efficient querying and accurate data presentation is key.

## 23. Bulk PAYE Remittance Processing

This section details the backend requirements for the bulk upload and processing of Pay-As-You-Earn (PAYE) remittances, typically submitted monthly by employers to the Niger State Internal Revenue Service. This expands on the general bulk payment rules in Section 3.6.

23.1. **Template Definition & Access:**
    23.1.1. **Standard Template:** The backend system must define a standard Niger State PAYE remittance template format, preferably using Excel (`.xlsx`).
    23.1.2. **Required Columns (Example):** Employee TIN, Employee Full Name, Gross Income, Pension Contribution (Employee), NHF Contribution, NHIS Contribution, Consolidated Relief Allowance (CRA), Taxable Income, Monthly Tax Due.
    23.1.3. **Template Download API:** `GET /api/templates/paye`
        *   Purpose: To provide users (employers) with the current, official Niger State PAYE remittance template file.
        *   Response: Excel file stream (`Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`).

23.2. **Upload API:**
    23.2.1. **Endpoint:** `POST /api/payments/bulk/upload?type=PAYE`
    23.2.2. **Request:** Multipart/form-data including:
        *   `file`: The filled PAYE template (`.xlsx`).
        *   `assessmentMonth`: String (e.g., "January", "February"), Required.
        *   `assessmentYear`: Integer (e.g., 2024), Required.
    23.2.3. **Authentication:** Requires authenticated user session (typically a business user profile).

23.3. **Backend Processing & Validation:**
    23.3.1. **Initial Steps:** Receive file and parameters. Assign a unique `batchId` for tracking.
    23.3.2. **Parsing:** Parse the uploaded Excel file according to the defined template structure.
    23.3.3. **Validation (Row-by-Row):** Perform rigorous validation for each employee record:
        *   Check for required fields (TIN, Name, Income, Tax Due, etc.).
        *   Validate data types and formats (e.g., TIN format, numeric values).
        *   **Calculation Verification:** Re-calculate Taxable Income and Monthly Tax Due based on Gross Income, Deductions, and applicable tax rules (e.g., rules from Section 16.2.2 adapted for monthly calculation, or current official PAYE tax tables). Flag discrepancies between submitted tax and calculated tax.
        *   Cross-check against available databases (e.g., TIN validation if feasible).
        *   Log all validation errors, referencing the specific row and column/field.
    23.3.4. **Batch Status:** Maintain the status of the batch (e.g., `Uploading`, `Validating`, `ValidationError`, `Validated`, `PendingPayment`, `Paid`).

23.4. **Validation Feedback:**
    23.4.1. **Error Scenario:** If validation fails:
        *   Update batch status to `ValidationError`.
        *   Store detailed error messages associated with the `batchId`.
        *   **Error Retrieval API:** `GET /api/payments/bulk/{batchId}/errors` -> Response: Array of error objects, e.g., `{ "row": 5, "column": "Tax Due", "message": "Calculated tax (N5,500) does not match submitted tax (N5,000)" }`.
        *   The initial upload API response could indicate immediate failure or provide the `batchId` for polling/checking status and errors.
    23.4.2. **Success Scenario:** If validation passes:
        *   Calculate the total `amountBilled` (sum of Monthly Tax Due for all valid rows).
        *   Store batch summary: `batchId`, `userId`, `assessmentMonth`, `assessmentYear`, `totalEmployees`, `totalAmountBilled`, `filePath`, `status` (`Validated`).

23.5. **Bill Generation & Payment Initiation:**
    23.5.1. **Automatic Bill Creation:** Upon successful validation (`Validated` status), automatically create a corresponding record in the `bills` table (3.1.2) for the `totalAmountBilled`.
        *   Link the bill to the `batchId`.
        *   Set `BillStatus` to 'Pending'.
        *   Generate a unique `billReferenceNumber` (format: NSIRS-PAYE-{YEAR}{MONTH}-{SEQUENCE}).
    23.5.2. **Upload API Response (Success):** Return details needed for next steps:
        ```json
        {
          "batchId": "NSIRS-BATCH-PAYE-XYZ",
          "status": "Validated",
          "totalEmployees": 55,
          "totalAmountBilled": 1234567.89,
          "billReferenceNumber": "NSIRS-PAYE-202403-ABC",
          "assessmentMonth": "March",
          "assessmentYear": 2024
        }
        ```
    23.5.3. **Pay Online:** The frontend uses the `billReferenceNumber` or `batchId` to initiate payment via the standard flow: `POST /api/payments/initiate` with context `{ "bulkPaymentBatchId": "NSIRS-BATCH-PAYE-XYZ" }` or `{ "billReferenceNumber": "NSIRS-PAYE-202403-ABC" }` (as defined in 20.1.3).
    23.5.4. **Print Bill API:** `GET /api/payments/bulk/{batchId}/bill` (or `/api/bills/{billReferenceNumber}/pdf`)
        *   Purpose: Generate a PDF document representing the consolidated bill for the PAYE batch.
        *   Content: Employer details, Assessment Period (Month/Year), Total Employees, Total Amount Due, Bill Reference Number, Payment Instructions.
        *   Response: PDF file stream.

23.6. **Transaction History for Bulk PAYE:**
    23.6.1. **API Endpoint:** `GET /api/payments/bulk/history?type=PAYE` (or integrate into general history endpoint `GET /api/payments/history` with filters).
    23.6.2. **Purpose:** To list past PAYE bulk upload batches for the employer.
    23.6.3. **Filtering/Sorting:** By Assessment Year, Month, Status.
    23.6.4. **Response Data per item:** `batchId`, `assessmentYear`, `assessmentMonth`, `companyName` (from user profile), `totalEmployees`, `amountBilled`, `billReferenceNumber`, `generatedDate`, `status` (`Validated`, `PendingPayment`, `Paid`, `ValidationError`), `receiptNumber` (if paid), `transactionReference` (from `payments` table if paid).

23.7. **Database Considerations:**
    23.7.1. Need tables for: `bulk_payment_batches`, `bulk_payment_batch_items` (optional, if storing individual employee lines from successful uploads), `bulk_payment_batch_errors`.
    23.7.2. Ensure relationships between batches, bills, and eventual payments are maintained.

This section provides detailed backend requirements for the PAYE bulk remittance feature, ensuring validation, bill generation, and integration with the standard payment flow.

## 24. Liabilities Module Integration

24.1. **Automatic Creation:**
    24.1.1. **Assessment System Integration:**
        *   Liabilities should be automatically created when assessments are issued
        *   When an assessment is paid, the corresponding liability should be updated or removed

    24.1.2. **Payment System Integration:**
        *   When a user selects "Pay Now" for a liability, the payment initiation process should be pre-populated with the liability details
        *   After successful payment, the liability should be marked as paid and removed from the active liabilities list

    24.1.3. **User Profile Integration:**
        *   Liabilities should be associated with the correct user profile (individual or business)
        *   For businesses, liabilities may be associated with specific business activities or locations

24.2. **Performance and Efficiency Considerations**
    // ... existing content ...