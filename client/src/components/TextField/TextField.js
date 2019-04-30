import React from 'react';
import PropTypes from 'prop-types';

import './TextField.scss';

const TextField = ({
  placeholder,
  value,
  name,
  id,
  onChange,
  options,
  selector,
}) => {
  return (
    <div className="textfield">
      <div className="textfield__wrapper">
        {selector ? (
          <select
            placeholder={placeholder}
            value={value}
            className="textfield__input"
            id={id}
            onChange={onChange}
          >
            {!value && placeholder && (
              <option value="" disabled={true} defaultValue>
                {placeholder}
              </option>
            )}
            {options &&
              options.map(o => (
                <option key={o.value} value={o.value}>
                  {o.name}
                </option>
              ))}
          </select>
        ) : (
          <input
            className="textfield__input"
            placeholder={placeholder}
            value={value}
            name={name}
            id={id}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};

TextField.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  selector: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
};

export default TextField;
