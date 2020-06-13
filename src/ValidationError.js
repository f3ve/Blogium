import React from 'react';

export default function ValidationError(props) {
  if(props.message) {
    return (
      <p className='error'>{props.message}</p>
    );
  }
  return <></>
}