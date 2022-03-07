import React from 'react';
import { Link } from 'react-router-dom';

import Button from './Button';

const Card: React.FC<
  { title: string; className: string; button: string; to: string } | any
> = props => {
  return (
    <div
      className={`border-2 border-gray-200 rounded-md flex flex-col p-4 text-gray-800 shadow-md ${props.className}`}
    >
      <div className="flex justify-between pb-3 mb-4 border-b-2 border-gray-300">
        <h2 className="text-3xl pb-2">{props.title}</h2>
        {props.button && (
          <Link to={props.to}>
            <Button className="text-primary border-primary hover:bg-primary">
              {props.button}
            </Button>
          </Link>
        )}
      </div>
      {props.children}
    </div>
  );
};

export default Card;
