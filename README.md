# Job Platform Project

## 🔧 Setup Instructions

### ERD and Mapping

### Laravel Backend

1. Go to laravel-backend directory
2. Run composer install
3. Copy .env.example to .env and configure the database
4. Run php artisan key:generate
5. Run php artisan migrate
6. Run php artisan serve

> 💡 Make sure to configure Pusher credentials in .env

### React Frontend

1. Go to react-frontend directory
2. Run npm install or yarn install
3. Run npm start or yarn start

> 💡 Make sure .env in React includes REACT_APP_PUSHER_* variables if needed

## 📦 Tools & Libraries Used

- Laravel (Backend)
- React (Frontend)
- Laravel Echo + Pusher (Real-time notifications)
- Axios
- React Router DOM
- React Toastify
- Bootstrap

### 🔔 Real-Time Notification

- The backend successfully fires the event:
- [2025-04-10 16:38:54] local.INFO: Event Data {"jobId":2,"userName":"Basel_Elnoury"} 
  [2025-04-10 16:38:55] local.INFO: Event Broadcasted
  and show in Pusher Debug but notification don't show.
