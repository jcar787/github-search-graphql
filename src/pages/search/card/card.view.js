import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './card.css';

const CardView = props => {
  const { repo } = props;
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="repo-container" onClick={() => setFlipped(!flipped)}>
      {!flipped ? (
        <div className="card">
          <div className="title-container">
            <h3>{repo.node.name}</h3>
          </div>
          <p>By: {repo.node.owner.login}</p>
        </div>
      ) : (
        <div className="card">
          <div>
            <span>Followers:</span> {repo.node.watchers.totalCount}
          </div>
          <div>
            <span>Language:</span> {repo.node.primaryLanguage.name}
          </div>
          <div>
            <span>Description:</span> {repo.node.description}
          </div>
          <div>
            <a target="__blank" href={repo.node.url}>
              Go To Repo
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

CardView.propTypes = {
  repo: PropTypes.object
};

export default CardView;
