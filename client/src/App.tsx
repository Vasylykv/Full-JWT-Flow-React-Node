import { useEffect, useState } from 'react';
import './App.css';
// import LoginForm from './components/LoginForm';
import LoginForm from './components/Auth/LoginForm';
import type { AppDispatch } from './store/store';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, logout } from './features/user/operations';
import type { RootState } from './store/store';
import type { IUser } from './models/IUser';
import UserService from './services/UserService';
import { Button } from '@/components/ui/button';

function App() {
  const { isAuth, user, isLoading } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch: AppDispatch = useDispatch();
  const [users, setUsers] = useState<IUser[]>([]);

  const handleLogOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return null;
  }

  if (!isAuth) {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      {/* <div>
        <h1 className="mb-5">
          {isAuth ? `User is logged in ${user?.email}` : 'Log in please'}
        </h1>
        <h2>
          {user?.isActivated
            ? 'Sser activated via email'
            : 'Please confirm your account'}
        </h2>
      </div> */}
      <div className="flex flex-col items-center justify-center w-20 h-10">
        <Button onClick={handleLogOut}>Log out</Button>
      </div>

      <div>
        <Button onClick={getUsers}>Get users</Button>
      </div>
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
}

export default App;
