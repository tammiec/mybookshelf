import React from 'react';
import { Button } from 'react-native';

import ErrorBoundary from './ErrorBoundary';

export default function Login() {

  const handleLogin = () => {

  };

  return (
    <ErrorBoundary>
      <Button
        title='Log in with Goodreads'
        onPress={handleLogin}
        accessibilityLabel='Click to log in with Goodreads'
      />
    </ErrorBoundary>
  );
}