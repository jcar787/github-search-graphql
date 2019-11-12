import React, { useState } from 'react';
import { useSpring, animated as anim } from 'react-spring';
import PropTypes from 'prop-types';
import './card.css';

const CardView = props => {
  const { repo } = props;
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });

  return (
    <div className="repo-container" onClick={() => setFlipped(!flipped)}>
      <anim.div
        className="card"
        style={{ opacity: opacity.interpolate(o => 1 - o), transform }}
      >
        <div className="title-container">
          <h3>{repo.node.name}</h3>
        </div>
        <p>By: {repo.node.owner.login}</p>
      </anim.div>
      <anim.div
        className="card"
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateY(180deg)`)
        }}
      >
        <div>
          <span>Followers:</span> {repo.node.watchers.totalCount}
        </div>
        <div>
          <span>Language:</span> {repo.node.primaryLanguage.name}
        </div>
        <div>
          <span>Description:</span> {repo.node.description}
        </div>
        <a target="__blank" href={repo.node.url}>
          Go To Repo
        </a>
      </anim.div>
    </div>
  );
};

CardView.propTypes = {
  repo: PropTypes.object
};

export default CardView;
