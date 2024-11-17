# 🌐 [Cloud-Based Task Manager](https://tassklyy.netlify.app)

[![GitHub stars](https://img.shields.io/github/stars/T1rth1/Cloud-Based-Task-Management-App)](https://github.com/T1rth1/Cloud-Based-Task-Management-App/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/T1rth1/Cloud-Based-Task-Management-App)](https://github.com/T1rth1/Cloud-Based-Task-Management-App/network)
[![GitHub issues](https://img.shields.io/github/issues/T1rth1/Cloud-Based-Task-Management-App)](https://github.com/T1rth1/Cloud-Based-Task-Management-App/issues)

The **Cloud-Based Task Manager** is an innovative platform designed to enhance team efficiency and organization. Leveraging the MERN stack and modern frontend technologies, this solution provides a seamless experience for administrators and users, fostering collaboration and productivity.

## 🚀 Features

- 👤 **User and Admin Management**: Create, manage, and control user and admin accounts, including enabling, disabling, and deleting accounts.
- 📋 **Task Management**: Assign tasks to users, update task details and status, and label tasks as to-do, in progress, or completed.
- ⭐ **Priority and Sub-Tasks**: Set task priority levels (high, medium, normal, low) and manage sub-tasks for detailed task management.
- 📂 **Asset Management**: Upload and manage task-related assets, such as images.
- 💬 **Communication and Collaboration**: Add comments or chat on tasks to enhance team communication.
- 🔒 **Secure Authentication and Role-Based Access**: Secure user login with role-based access control, ensuring appropriate permissions for all users.
- 🛡️ **Profile and Password Management**: Update user profiles and change passwords securely.
- 📊 **Interactive Dashboard**: Summarize user activities and filter tasks by status: to-do, in progress, or completed.
- 🔍 **Task Access Control**: Users can view tasks but cannot access detailed information or interact with tasks unless they are assigned to that specific task; non-assigned users will see the task overview but not the detailed task page.
- 🔎 **Dynamic Task Search**: Search for tasks by name in a case-insensitive manner, allowing users to quickly find tasks using a dynamic search bar.

## 📥 Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/T1rth1/Cloud-Based-Task-Management-App.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Cloud-Based-Task-Management-App
    ```
3. Install the dependencies for the frontend and backend:
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

## 🛠️ Usage

1. Start the backend server:
    ```bash
    cd server
    npm start
    ```
2. Start the frontend development server:
    ```bash
    cd client
    npm start
    ```

## 🧰 Technologies Used

- **Frontend**: React, Tailwind CSS, Redux
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT
- **File Storage**: Firebase Storage

## 📸 Screenshots

### 🔐 Admin Operations

#### 1️⃣ Authentication
- 🖥️ **Login Screen for Admin and User**
  ![Login Screen](https://github.com/user-attachments/assets/f596ad7d-7e6a-4662-9b1b-d505d1b355ef)

<br>

#### 2️⃣ Dashboard Overview
- 📊 **Task Summary and Priority Chart**
  ![Dashboard - Task Summary](https://github.com/user-attachments/assets/59e61106-e4b9-46ee-bac7-26d1f6d23718)

- 👥 **User Task Overview and Recent Registrations**
  ![Dashboard - User Overview](https://github.com/user-attachments/assets/408144a6-70e0-403f-8793-5687aeec91d6)

<br>

#### 3️⃣ Task Management Views
- 📌 **Board View of All Tasks**
  ![Task Board View](https://github.com/user-attachments/assets/b1271d29-5a38-4940-9e60-412a7245afe9)

- 📋 **List View of All Tasks**
  ![Task List View](https://github.com/user-attachments/assets/93ad3bc4-143d-43e2-97ac-a1551521f0a5)

<br>

#### 4️⃣ Task Creation and Assignment
- ✏️ **Create New Task Interface**
  ![Create Task - Main Details](https://github.com/user-attachments/assets/7983d075-c852-4339-b4a7-9c836302b9cb)
  ![Create Task - Additional Details](https://github.com/user-attachments/assets/25dda485-df39-46f5-9f03-78cf966afa88)

<br>

#### 5️⃣ Sub-Task Management
- 🔧 **Adding Sub-Tasks to a Main Task**
  ![Add Sub-Task Interface](https://github.com/user-attachments/assets/6a128d1a-7405-4a41-ade8-3d66b2493893)

<br>

#### 6️⃣ Task Assignment Notifications
- 🔔 **User Notifications for New Task Assignments**
  ![Task Assignment Notification](https://github.com/user-attachments/assets/e08ff9c6-7906-4e43-8416-cfa351f848a7)
  ![Notification Details](https://github.com/user-attachments/assets/482a8d60-e982-4a77-9b74-d4e54aa38ced)

<br>

#### 7️⃣ Task Status Overview
- 📊 **Completed, In Progress, and To-Do Tasks**
  ![Task Status Overview](https://github.com/user-attachments/assets/a21141f8-a2d9-47fa-95fd-a4cf33725880)

<br>

#### 8️⃣ User Management
- ➕ **Adding a New User**
  ![Add New User Interface](https://github.com/user-attachments/assets/4876cc5d-d0bd-4aba-b2ab-dcf90176b0d4)

<br>

#### 9️⃣ Default User Credentials
- 🔑 **Default Password Information**
  ![Default User Password](https://github.com/user-attachments/assets/929be784-9ed8-485d-8a1f-b0812f5d9120)

<br>

#### 🔟 User Account Management
- 🔄 **Activating and Deactivating User Accounts**
  ![User Account Management](https://github.com/user-attachments/assets/7f11ee30-8cfa-4c3f-b426-46b53ba5896a)

<br>

#### 1️⃣1️⃣ User Information Management
- ✏️ **Editing and Deleting User Information**
  ![Edit User Information](https://github.com/user-attachments/assets/fe414803-37ce-45e6-8284-9fd180d418a0)

<br>

#### 1️⃣2️⃣ Trash Management
- 🗑️ **Viewing Trashed Tasks**
  ![Trash Task View](https://github.com/user-attachments/assets/2e5f1e3e-b3da-4857-b4f6-d5966ac64706)

<br>

#### 1️⃣3️⃣ Task Restoration
- ♻️ **Restoring Tasks from Trash**
  ![Restore Task - Step 1](https://github.com/user-attachments/assets/2a016bbe-b72d-4776-9fff-f77dc5cdcfb6)
  ![Restore Task - Step 2](https://github.com/user-attachments/assets/cefd82a8-a6ce-47f4-adfe-86dad75002d0)

<br>

#### 1️⃣4️⃣ Task Details
- 🔍 **Viewing Detailed Task Information**
  ![Task Details View](https://github.com/user-attachments/assets/5e8166b4-38a9-48f1-975d-964dff4f70ab)

<br>

#### 1️⃣5️⃣ Task Communication
- 💬 **Team Chat and Activity Timeline**
  ![Task Chat and Timeline](https://github.com/user-attachments/assets/b9192811-0843-4c9a-a85f-e3213285dfa4)

<br>

### 👤 User Operations

#### 1️⃣ Task Overview
- 📋 **User's Task List**
  ![User Task List](https://github.com/user-attachments/assets/c188c01c-ba1f-47c4-af06-bdb61790dcb2)

<br>

#### 2️⃣ Password Management
- 🔐 **Changing User Password**
  ![Change Password Interface](https://github.com/user-attachments/assets/cd71eebd-6283-493a-ba09-ba738c75c34b)

<br>

#### 3️⃣ Task Notifications
- 🔔 **User Notifications for Assigned Tasks**
  ![Task Assignment Notifications](https://github.com/user-attachments/assets/bd419a67-79ff-4c1b-816f-882cd7d2f8e6)

<br>

#### 4️⃣ Task Activity Tracking
- 📝 **Viewing and Posting Task Activities**
  ![Task Activity View](https://github.com/user-attachments/assets/be2220e7-8e50-4823-82e4-07c597b21375)
  ![Posting Task Activity](https://github.com/user-attachments/assets/d7ef1798-73a6-457c-b8be-ef99f7a5aed3)

<br>

#### 5️⃣ Limited Access to Other Tasks
- 👀 **Viewing Non-Assigned Task Details**
  - Overview: Users can see basic information for all tasks
  - Restricted Access: Cannot view detailed timeline or activity for non-assigned tasks
  ![Non-Assigned Task Overview](https://github.com/user-attachments/assets/e43842db-a8f6-4307-a5d9-b86a9a6fe682)
- 🚫 **Attempting to Access Detailed Information**
  - Result: User is prevented from viewing timeline and activity of non-assigned tasks
  ![Access Denied for Non-Assigned Task Details](https://github.com/user-attachments/assets/448924c2-728e-4106-a949-8851b88441aa)

<br>

#### 6️⃣ User Logout
- 🚪 **Logout Process**
  ![Logout - Step 1](https://github.com/user-attachments/assets/aa05a471-c41f-43a7-8d86-6b488945a13d)
  ![Logout - Step 2](https://github.com/user-attachments/assets/f1e68b0d-13e7-4601-bff4-1063075d7503)

## 📧 Contact

For any inquiries, please contact [tirthpatel4822@gmail.com](mailto:tirthpatel4822@gmail.com).

## 🔗 Project Link

[[GitHub Repository](https://github.com/T1rth1/Cloud-Based-Task-Management-App)](https://melodious-heliotrope-af4380.netlify.app/log-in)
