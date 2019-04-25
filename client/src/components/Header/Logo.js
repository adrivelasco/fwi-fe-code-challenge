import React from 'react';

import { ReactComponent as CloudColor } from './cloud-color.svg';
import { ReactComponent as CloudEffects } from './cloud-effects.svg';

const Logo = () => {
  return (
    <div className="logo">
      <CloudColor className="logo__color" />
      <CloudEffects className="logo__effects" />
    </div>
  );
};

export default Logo;
