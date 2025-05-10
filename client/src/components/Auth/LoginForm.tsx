import { useState } from 'react';
import type { AppDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';
import { login, registration } from '@/features/user/operations';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch: AppDispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  const handleRegistration = () => {
    dispatch(registration({ email, password }));
  };

  return (
    <div>
      <h2 className="text-lg">Log in</h2>
      <div className="flex flex-col gap-y-2 mt-4">
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mt-5 flex justify-between">
        <Button onClick={handleLogin}>Log in</Button>
        <Button onClick={handleRegistration}>Register</Button>
      </div>
    </div>
  );
};

export default LoginForm;
