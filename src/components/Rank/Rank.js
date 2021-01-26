import React from 'react';

const Rank = ({ userName, userEntries}) => {
  return (
    <div>
      <div className='white f3'>
        <p>{userName + ', Your entries count is'} </p>
      </div>
      <div className='white f1'>
        <p>{ userEntries }</p>
      </div>
    </div>
  );
}

export default Rank;