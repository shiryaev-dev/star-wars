import React from 'react';
import { StarshipList } from '../sw-components';
import { withRouter } from 'react-router-dom';

const StarshipsPage = ({ history }) => {
  return (
    <StarshipList onItemSelected={(itemId) => {
      // const newPath = `/starships/${itemId}`;
      history.push(itemId)
    }} />
  );
}

export default withRouter(StarshipsPage);

// import React, { Component } from 'react';
// import { StarshipDetails, StarshipList } from '../sw-components';
// import Row from '../row';

// export default class StarshipsPage extends Component {

//   state = {
//     selectedItem: null
//   };

//   onItemSelected = (selectedItem) => {
//     this.setState({ selectedItem });
//   };

//   render() {
//     const { selectedItem } = this.state;

//     return (
//       <Row
//         left={<StarshipList onItemSelected={this.onItemSelected} />}
//         right={<StarshipDetails itemId={selectedItem} />} />
//     );
//   }
// }