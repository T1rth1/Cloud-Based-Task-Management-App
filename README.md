# 🌐 Cloud-Based Task Manager

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
Admin Operations : 
1) Login as Admin or User :
![Screenshot 2024-10-06 114507](https://github.com/user-attachments/assets/f596ad7d-7e6a-4662-9b1b-d505d1b355ef)

2) Dashboard
   Total Task and Chart by Priority
![Screenshot 2024-10-06 114528](https://github.com/user-attachments/assets/59e61106-e4b9-46ee-bac7-26d1f6d23718)

    All Users with their tasks and also latest 10 users
![Screenshot 2024-10-06 114540](https://github.com/user-attachments/assets/408144a6-70e0-403f-8793-5687aeec91d6)
3) All Tasks
   Board View
![Screenshot 2024-10-06 114553](https://github.com/user-attachments/assets/b1271d29-5a38-4940-9e60-412a7245afe9)
    List View
![Screenshot 2024-10-06 114608](https://github.com/user-attachments/assets/93ad3bc4-143d-43e2-97ac-a1551521f0a5)
4) Add Task(assign priority,assign task to users,task date and Add Assets) :
![Screenshot 2024-10-06 114648](https://github.com/user-attachments/assets/7983d075-c852-4339-b4a7-9c836302b9cb)
![Screenshot 2024-10-06 114658](https://github.com/user-attachments/assets/25dda485-df39-46f5-9f03-78cf966afa88)

5) Add Sub Task : 
![Screenshot 2024-10-06 115202](https://github.com/user-attachments/assets/6a128d1a-7405-4a41-ade8-3d66b2493893)
6) After assigning the task Notification to users which is their in that particular task
![Screenshot 2024-10-06 115218](https://github.com/user-attachments/assets/e08ff9c6-7906-4e43-8416-cfa351f848a7)

![Screenshot 2024-10-06 115228](https://github.com/user-attachments/assets/482a8d60-e982-4a77-9b74-d4e54aa38ced)

7) Completed,In Progress,To Do Task 
![Screenshot 2024-10-06 115246](https://github.com/user-attachments/assets/a21141f8-a2d9-47fa-95fd-a4cf33725880)

8) Add New User :
![Screenshot 2024-10-06 115335](https://github.com/user-attachments/assets/4876cc5d-d0bd-4aba-b2ab-dcf90176b0d4)

9) user's password by default is the email of that particular user..after user can change their password
![Screenshot 2024-10-06 115348](https://github.com/user-attachments/assets/929be784-9ed8-485d-8a1f-b0812f5d9120)

10) Admin can Activate and Deactivate user's account :
![Screenshot 2024-10-06 115407](https://github.com/user-attachments/assets/7f11ee30-8cfa-4c3f-b426-46b53ba5896a)
11) Admin can delete and edit user's information :
![Screenshot 2024-10-06 115417](https://github.com/user-attachments/assets/fe414803-37ce-45e6-8284-9fd180d418a0)
12) Trash Task :
![Screenshot 2024-10-06 115632](https://github.com/user-attachments/assets/2e5f1e3e-b3da-4857-b4f6-d5966ac64706)
13) Can Restore Task : 
![Screenshot 2024-10-06 115642](https://github.com/user-attachments/assets/2a016bbe-b72d-4776-9fff-f77dc5cdcfb6)
![Screenshot 2024-10-06 115701](https://github.com/user-attachments/assets/cefd82a8-a6ce-47f4-adfe-86dad75002d0)

14) See the details of the particular task :
![Screenshot 2024-10-06 115741](https://github.com/user-attachments/assets/5e8166b4-38a9-48f1-975d-964dff4f70ab)
15) Chat with the team about task's timeline and activity
![Screenshot 2024-10-06 115814](https://github.com/user-attachments/assets/b9192811-0843-4c9a-a85f-e3213285dfa4)

Particular User Operations :
1) All Tasks :
![Screenshot 2024-10-06 120212](https://github.com/user-attachments/assets/c188c01c-ba1f-47c4-af06-bdb61790dcb2)
2) change his/her password :
![Screenshot 2024-10-06 120237](https://github.com/user-attachments/assets/cd71eebd-6283-493a-ba09-ba738c75c34b)
3) Notifications based on the task has been assigned to that particular user :
![Screenshot 2024-10-06 120317](https://github.com/user-attachments/assets/bd419a67-79ff-4c1b-816f-882cd7d2f8e6)
5) see the activity of the task in which he/she is there(Open Task) and  post the activity with different icons:
![Screenshot 2024-10-06 120658](https://github.com/user-attachments/assets/be2220e7-8e50-4823-82e4-07c597b21375)
![Screenshot (859)](https://github.com/user-attachments/assets/f7d2d90f-1af2-4169-b34d-58c6fc4083bd)


7) see other task's details but can not participate in that task's activity and timeline
![Screenshot 2024-10-06 120514](https://github.com/user-attachments/assets/e43842db-a8f6-4307-a5d9-b86a9a6fe682)

![Screenshot 2024-10-06 120523](https://github.com/user-attachments/assets/448924c2-728e-4106-a949-8851b88441aa)
8) Logout :

![Screenshot 2024-10-06 120736](https://github.com/user-attachments/assets/aa05a471-c41f-43a7-8d86-6b488945a13d)
![Screenshot 2024-10-06 120802](https://github.com/user-attachments/assets/f1e68b0d-13e7-4601-bff4-1063075d7503)



## 📧 Contact

For any inquiries, please contact [tirthpatel4822@gmail.com](mailto:tirthpatel4822@gmail.com).

## 🔗 Project Link

[GitHub Repository](https://github.com/T1rth1/Cloud-Based-Task-Management-App)
