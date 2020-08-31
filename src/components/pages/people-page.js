import React from 'react';
import { withRouter } from 'react-router-dom';
import { PersonDetails, PersonList } from '../sw-components';
import Row from '../row';

const PeoplePage = ({ history, match }) => {
  const { id } = match.params
  return (
    <Row
      left={<PersonList onItemSelected={(itemId) => {
        const newPath = `/people/${itemId}`;
        return history.push(newPath)
      }} />}
      right={<PersonDetails itemId={id} />}
    />
  );
}

export default withRouter(PeoplePage);