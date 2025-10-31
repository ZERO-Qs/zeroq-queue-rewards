# Backend Requirements for zeroQ Queue Rewards Platform

This document outlines the backend requirements for the zeroQ Queue Rewards platform, detailing essential functionalities, data models, API endpoints, and integration points with the frontend. The goal is to provide a comprehensive guide for backend development, ensuring seamless operation and scalability of the platform.

## 1. Core Functionalities

The backend must support the following core functionalities:

### 1.1 User Management
- **User Registration & Authentication**: Securely handle user sign-up, login, and session management. This includes password hashing, token generation (JWT or similar), and secure storage of user credentials.
- **User Profiles**: Store and manage user-specific data such as name, email, reward points, transaction history, and preferences.
- **Role-Based Access Control (RBAC)**: Implement roles for different types of users (e.g., `globalAdmin`, `orgAdmin`, `customer`, `staff`) with appropriate permissions for accessing various resources and functionalities.

### 1.2 Organization Management
- **Organization Registration**: Allow `globalAdmin` users to register new organizations.
- **Organization Profiles**: Store and manage organization-specific data such as name, address, contact information, and branding assets.
- **Organization Admin Panel**: Provide `orgAdmin` users with tools to manage their organization's queues, counters, staff, and customer rewards.

### 1.3 Queue Management
- **Queue Creation & Configuration**: Allow `orgAdmin` users to create and configure different types of queues (e.g., "Withdrawal", "Deposit", "Loan Office"). This includes setting queue names, descriptions, and initial parameters.
- **Real-time Queue Updates**: Maintain and broadcast real-time updates on queue lengths, estimated wait times, and customer progress.
- **Queue Status**: Track the status of each queue (e.g., active, inactive, paused).

### 1.4 Counter Management
- **Counter Creation & Assignment**: Allow `orgAdmin` users to create service counters and assign staff members to them.
- **Counter Status**: Track the real-time status of each counter (e.g., open, closed, busy, idle).
- **Counter Performance**: Collect data on counter performance, such as the number of customers served and average service time.

### 1.5 Staff Management
- **Staff Registration & Assignment**: Allow `orgAdmin` users to register staff members and assign them to specific counters or roles within the organization.
- **Staff Performance Tracking**: Monitor staff performance metrics, such as customers served per hour and average service time.

### 1.6 Reward System
- **Reward Definition**: Allow `orgAdmin` users to define and manage reward programs, including types of rewards, points required, and redemption rules.
- **Point Accumulation**: Implement logic for customers to earn reward points based on their interactions with the platform (e.g., joining a queue, completing a service).
- **Reward Redemption**: Facilitate the redemption of reward points for available rewards.
- **Transaction History**: Maintain a detailed history of all reward point transactions for each user.

### 1.7 Analytics & Reporting
- **Dashboard Data**: Provide aggregated data for dashboards, including queue performance, counter efficiency, and customer engagement metrics.
- **Customizable Reports**: Allow `orgAdmin` users to generate custom reports based on various parameters.

## 2. Data Models

The backend will require data models for:

- **User**: `id`, `username`, `email`, `password_hash`, `role`, `organization_id` (if applicable), `reward_points`, `created_at`, `updated_at`.
- **Organization**: `id`, `name`, `address`, `contact_email`, `phone_number`, `logo_url`, `created_at`, `updated_at`.
- **Queue**: `id`, `organization_id`, `name`, `description`, `current_length`, `estimated_wait_time`, `status`, `created_at`, `updated_at`.
- **Counter**: `id`, `organization_id`, `queue_id`, `name`, `staff_id`, `status`, `customers_served_today`, `created_at`, `updated_at`.
- **Staff**: `id`, `user_id`, `organization_id`, `counter_id` (if assigned), `role`, `created_at`, `updated_at`.
- **Reward**: `id`, `organization_id`, `name`, `description`, `points_required`, `type`, `created_at`, `updated_at`.
- **Transaction**: `id`, `user_id`, `reward_id` (if redemption), `points_change`, `type` (e.g., earned, redeemed), `created_at`.
- **Feedback**: `id`, `service_type`, `actual_time`, `time_of_day`, `queue_length`, `avg_service_time`, `day_of_week`, `peak_hour`, `created_at`.

## 3. API Endpoints

The backend will expose RESTful API endpoints for all core functionalities. All endpoints should be secured with appropriate authentication and authorization mechanisms.

### 3.1 User Endpoints
- `POST /api/register`: Register a new user.
- `POST /api/login`: Authenticate user and return a token.
- `GET /api/profile`: Get user profile.
- `PUT /api/profile`: Update user profile.

### 3.2 Organization Endpoints
- `POST /api/organizations`: Create a new organization (globalAdmin only).
- `GET /api/organizations/{id}`: Get organization details.
- `PUT /api/organizations/{id}`: Update organization details (orgAdmin only).

### 3.3 Queue Endpoints
- `POST /api/organizations/{org_id}/queues`: Create a new queue.
- `GET /api/organizations/{org_id}/queues`: Get all queues for an organization.
- `GET /api/queues/{id}`: Get queue details.
- `PUT /api/queues/{id}`: Update queue details.
- `DELETE /api/queues/{id}`: Delete a queue.
- `POST /api/queues/{id}/join`: User joins a queue.
- `POST /api/queues/{id}/leave`: User leaves a queue.

### 3.4 Counter Endpoints
- `POST /api/organizations/{org_id}/counters`: Create a new counter.
- `GET /api/organizations/{org_id}/counters`: Get all counters for an organization.
- `GET /api/counters/{id}`: Get counter details.
- `PUT /api/counters/{id}`: Update counter details.
- `DELETE /api/counters/{id}`: Delete a counter.
- `POST /api/counters/{id}/assign-staff`: Assign staff to a counter.

### 3.5 Staff Endpoints
- `POST /api/organizations/{org_id}/staff`: Register new staff.
- `GET /api/organizations/{org_id}/staff`: Get all staff for an organization.
- `PUT /api/staff/{id}`: Update staff details.
- `DELETE /api/staff/{id}`: Delete staff.

### 3.6 Reward Endpoints
- `POST /api/organizations/{org_id}/rewards`: Create a new reward.
- `GET /api/organizations/{org_id}/rewards`: Get all rewards for an organization.
- `PUT /api/rewards/{id}`: Update reward details.
- `DELETE /api/rewards/{id}`: Delete a reward.
- `POST /api/rewards/{id}/redeem`: User redeems a reward.

### 3.7 Analytics Endpoints
- `GET /api/organizations/{org_id}/analytics/dashboard`: Get dashboard data.
- `GET /api/organizations/{org_id}/analytics/reports`: Generate custom reports.

### 3.8 ETA API (Provided by another developer)

- **Endpoint**: `/getETA`
- **Method**: `GET`
- **Description**: Retrieves the estimated time of arrival for a given service type.
- **Request Parameters**:
    - `service_type` (string, required): The type of service for which to get the ETA.
    - `queue_length` (integer, optional): The current length of the queue. Defaults to 0.
    - `time_of_day` (integer, optional): The current hour of the day (0-23). Defaults to current hour.
    - `day_of_week` (integer, optional): The current day of the week (0-6, Monday=0). Defaults to current day.
- **Expected JSON Response**:
    ```json
    {
        "service_type": "Withdrawal",
        "estimated_wait_time_minutes": 15,
        "queue_length": 5,
        "timestamp": "2023-10-27T10:30:00Z"
    }
    ```
- **Error Response**:
    ```json
    {
        "error": "Service type not found"
    }
    ```

### 3.9 Queue Update API

- **Endpoint**: `/updateQueue`
- **Method**: `POST`
- **Description**: Updates the queue length for a given service type.
- **Request Body (JSON)**:
    ```json
    {
        "service_type": "Withdrawal",
        "change": 1
    }
    ```
    - `service_type` (string, required): The type of service whose queue length needs to be updated.
    - `change` (integer, required): The amount by which to change the queue length. Can be positive (add to queue) or negative (remove from queue).
- **Expected JSON Response**:
    ```json
    {
        "service_type": "Withdrawal",
        "previous_length": 5,
        "new_queue_length": 6,
        "timestamp": "2023-10-27T10:35:00.000000"
    }
    ```
- **Error Response**:
    ```json
    {
        "error": "Unknown service type: Withdrawal"
    }
    ```

### 3.10 Feedback API

- **Endpoint**: `/feedback`
- **Method**: `POST`
- **Description**: Receives feedback on actual service times to retrain the ETA prediction model.
- **Request Body (JSON)**:
    ```json
    {
        "service_type": "Withdrawal",
        "actual_time": 12.5,
        "time_of_day": 10,
        "queue_length": 5,
        "avg_service_time": 2.5,
        "day_of_week": 4
    }
    ```
    - `service_type` (string, required): The type of service for which feedback is provided.
    - `actual_time` (float, required): The actual time taken to serve the customer.
    - `time_of_day` (integer, optional): The hour of the day when the service was provided. Defaults to current hour.
    - `queue_length` (float, optional): The queue length at the time of service. Defaults to 0.
    - `avg_service_time` (float, optional): The average service time at the time of service. Defaults to a default value.
    - `day_of_week` (integer, optional): The day of the week when the service was provided. Defaults to current day.
- **Expected JSON Response**:
    ```json
    {
        "status": "✅ Feedback retraining successful",
        "service_type": "Withdrawal",
        "trained_on_rows": 1,
        "avg_service_time_used": 2.5,
        "eta_feedback": 12.5
    }
    ```
- **Error Responses**:
    ```json
    {
        "error": "Missing required fields: service_type or actual_time"
    }
    ```
    ```json
    {
        "error": "Model for service 'Withdrawal' not found."
    }
    ```
    ```json
    {
        "error": "Invalid (NaN) values in feedback data."
    }
    ```
    ```json
    {
        "error": "Empty feedback dataset"
    }
    ```
    ```json
    {
        "error": "Feedback failed during model update: <error_details>"
    }
    ```

## 4. Integration with Frontend

The frontend will interact with these API endpoints using standard HTTP requests. Key integration points include:

- **Authentication Flow**: Frontend sends credentials to `/api/login`, receives a token, and includes it in subsequent requests.
- **Real-time Updates**: Frontend subscribes to WebSocket or Server-Sent Events (SSE) for real-time queue and counter updates.
- **Data Display**: Frontend fetches data from various GET endpoints to populate dashboards, tables, and forms.
- **User Actions**: Frontend sends POST/PUT/DELETE requests for user-initiated actions like joining a queue, updating a profile, or managing counters.

## 5. Technology Stack (Recommended)

- **Language**: Python
- **Framework**: Flask / FastAPI
- **Database**: PostgreSQL / MongoDB
- **Real-time Communication**: WebSockets (e.g., Flask-SocketIO)
- **Deployment**: Docker, Kubernetes

## 6. Future Considerations

- **Scalability**: Design the backend for horizontal scalability to handle increasing load.
- **Security**: Implement robust security measures, including input validation, rate limiting, and protection against common web vulnerabilities.
- **Monitoring & Logging**: Integrate monitoring tools and comprehensive logging for debugging and performance analysis.
- **Testing**: Implement unit, integration, and end-to-end tests to ensure reliability and correctness.