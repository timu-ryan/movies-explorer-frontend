import React from 'react';
import './Techs.css';

const Techs = () => {

  const technologies = [
    'HTML',
    'CSS',
    'JS',
    'React',
    'Git',
    'Express.js',
    'mongoDB',
  ];

  return (
    <div id='techs' className='techs'>
      <h2 className='techs__header'>Технологии</h2>
      <h3 className='techs__subtitle'>7 технологий</h3>
      <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className='techs__list'>
        {technologies.map((tech) => (
          <li key={tech} className='techs__technology'>{tech}</li>
        ))}
      </ul>
    </div>
  );
}

export default Techs