[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/O5JWjEqM)
# User Management System  

This is the starting point for the **User Management System** assignment. The goal of this project is to create a web application where users can register, log in, and access role-based functionality based on their account type (user or admin).

For full project details, requirements, and grading criteria, refer to the [assignment sheet](https://menglishca.github.io/keyin-course-notes/fullstack/qaps/qap-3/).

## Setup Instructions  

1. **Accept the GitHub Assignment** (link provided in the project sheet).

1. **Name your new repository** and choose its visibility (public or private).  

1. Once your repository is created, **clone your new repo** to your local machine:  
    ```bash  
    git clone <your-new-repo-url>  
    ```  

1. Navigate into the project directory and install the necessary dependencies:  
    ```bash  
    cd <your-new-repo-name>  
    npm install  
    ```  

1. **Run the app:**  
    ```bash  
    npm start  
    ```  
    This will start the server at `http://localhost:3000/`.  

1. You can now begin working on your project, adding your own code and committing your changes as you go:  
    ```bash  
    git add .  
    git commit -m "First commit"  
    git push origin main  
    ```  


## Development Guidelines  

1. **Authentication**:  
   - Use `express-session` for session management.  
   - Hash all passwords with bcrypt before storing them.  
   - Authenticate users during login by comparing hashed passwords.  

2. **Role-Based Access Control**:  
   - Restrict the admin view of all registered users to accounts with the admin role.  
   - Regular users should only access their dashboard.  

3. **Error Handling**:  
   - Display errors during login or signup if applicable.  

4. **Security**:  
   - Ensure no plaintext passwords are stored or transmitted.  

5. **Data Storage**:  
   - Use an in-memory array to store user accounts. Persistent data storage is not required.

## Submission Guidelines  

- Submit a link to your GitHub repository through the Teams assignment.  
- Ensure the application runs correctly with `npm start`.  
- Include all required functionality as specified in the [assignment sheet](https://menglishca.github.io/keyin-course-notes/fullstack/qaps/qap-3/).

## Notes  
- Extra npm packages are allowed (except for templating engines like React), but should not be required.
- All pages should use **EJS templates** for rendering.
- Focus on building secure and functional features with proper user experience.