import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';

import ErrorBoundary from './ErrorBoundary';

const mapStateToProps = state => {
  return { user: state.user };
};

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