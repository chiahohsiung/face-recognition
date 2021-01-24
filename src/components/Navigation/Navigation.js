import React from 'react';

const Navigation = ({isSignedIn, onRouteChange}) => {
  if (isSignedIn) {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}} >
        <p 
          onClick={() => onRouteChange('signin')} 
          className='f3 pa3 link dim black underline pointer'>
          Sign Off
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}} >
        <p 
          onClick={() => onRouteChange('signin')} 
          className='f3 pa3 link dim black underline pointer'>
          Sign In
        </p>
        <p 
          onClick={() => onRouteChange('register')} 
          className='f3 pa3 link dim black underline pointer'>
          Register
        </p>
      </nav>
    );
  }
}

export default Navigation;