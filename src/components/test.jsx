import React, { Component } from 'react';
import { connect } from 'react-redux';

import { openFeedbackForm } from '@/actions/screen-activities';

class Test extends Component {
  componentDidMount = () => {
    this.props.openFeedbackForm("FEEDBACK");
  }

  render() {

    return (
      <button 
        onClick={() => (this.props.openFeedbackForm("FEEDBACK"))}
      >
        test
      </button>
    )
  }
}

function mapStateToProps(state) {
  return {
    screenActivities: state.screenActivities
  }
}

export default connect(mapStateToProps, {
  openFeedbackForm
})(Test);