import React from 'react';
import { Button } from 'react-native';

export default function Login() {

  const handleLogin = () => {

  };

  return (
    <Button
      title='Log in with Goodreads'
      onPress={handleLogin}
    />
  );
}