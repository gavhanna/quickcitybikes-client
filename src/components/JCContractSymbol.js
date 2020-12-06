import React from 'react';
import ie from '../assets/flags/ie.svg';
import fr from '../assets/flags/fr.svg';
import es from '../assets/flags/es.svg';
import se from '../assets/flags/se.svg';
import be from '../assets/flags/be.svg';
import no from '../assets/flags/no.svg';
import si from '../assets/flags/si.svg';
import lt from '../assets/flags/lt.svg';
import jp from '../assets/flags/jp.svg';
import au from '../assets/flags/au.svg';
import lu from '../assets/flags/lu.svg';

const flags = {
  ie: ie,
  fr: fr,
  es: es,
  se: se,
  be: be,
  no: no,
  si: si,
  lt: lt,
  jp: jp,
  au: au,
  lu: lu,
};

const JCContractSymbol = ({ contract, showCity }) => {
  const { name, commercial_name, country_code } = contract;

  return (
    <div className='contract'>
      {showCity && (
        <span className='city'>
          <strong>{name}</strong>
        </span>
      )}
      <span className='name'>{commercial_name ? commercial_name : name}</span>
      <span className='flag'>
        {country_code && <img src={flags[country_code.toLowerCase()]} alt='' />}
      </span>
    </div>
  );
};

export default JCContractSymbol;
