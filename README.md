# **Edu Forum BD Frontend**

This repository contains the frontend code for **Edu Forum BD**, a modern, feature-rich platform that allows users to share posts, engage in discussions, and interact with one another. The application is built using **React** and styled with **TailwindCSS** and **DaisyUI**. It integrates seamlessly with the backend for robust functionality and uses **Firebase** for authentication and storage.

---

## **Live Site**

- **Frontend**: [Edu Forum BD](https://edu-forum-bd.web.app)

---

## **Features**

### **User-Friendly Interface**

- Responsive and modern UI built with **TailwindCSS** and **DaisyUI**.
- Intuitive navigation using **React Router**.

### **Authentication and User Management**

- Firebase-based authentication (Login/Signup).
- Role-based interface (User/Admin).

### **Post Management**

- View, create, and filter posts by tags and popularity.
- Limitations on post creation for non-gold members.

### **Admin Dashboard**

- Admins can:
  - Manage users.
  - Create and manage tags.
  - Monitor platform activity.

### **Comment System**

- Users can engage with posts by adding comments.
- Comments are displayed dynamically.

### **like System**

- Users can engage with posts by adding Like.
- Like are displayed dynamically.

### **Payment Integration**

- Integrated with **Stripe** for premium features.

### **Advanced Features**

- **Notifications**: Real-time notifications for Announcement and updates.
- **Search and Filters**: Easily find posts using search and filtering options.

### **Performance Optimizations**

- Optimized state management with **Tanstack Query**.
- Smooth, fast, and scalable with **Vite**.

---

## **Technologies Used**

### **Core Stack**

- **React**: Component-based UI development.
- **React Router**: For single-page application routing.
- **Firebase**: For authentication and backend integration.
- **TailwindCSS & DaisyUI**: For styling and responsive design.

### **Other Libraries**

- **React Hook Form**: Simplified form management.
- **React Select**: Customizable select menus.
- **Axios**: HTTP client for API requests.
- **React Icons**: Rich collection of SVG icons.
- **React Share**: for post share on facebook.
- **Tanstack Query**: for CRUD operation.


### **Development Tools**

- **Vite**: Fast build tool for modern web development.
- **ESLint**: Linter for identifying problematic patterns in code.
- **PostCSS & Autoprefixer**: For processing CSS efficiently.

---

## **Installation and Setup**

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd edu-forum-bd-frontend

## **Environment Variables**

To run the project locally, set the following environment variables:

```plaintext

VITE_apiKey=you_firebase_key
VITE_authDomain=your_firebase_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id

VITE_STRIPE_KEY=your_stripe_key

# VITE_API=your_local_or_server_api