import React from 'react';

const MainSection: React.FC = props => {
  return (
    <section className="max-w-[1300px] ml-auto mr-auto flex justify-center">
      {props.children}
    </section>
  );
};

export default MainSection;
