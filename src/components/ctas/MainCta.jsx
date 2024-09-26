import { CALCULATION_FORM } from '@/generic/constants';
import { useRouter } from 'next/router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { openFeedbackForm } from '@/actions/screen-activities';
import { useIntl } from 'react-intl';

class MainCta extends Component {
  render() {
    return (
      <>
        <div className="container mt-4">
          <div className="row">
            <hr />
            <h3 className="text-center text_blue">
              <b>
                {this.props.intl.formatMessage({ id: "cta.title" })}
              </b>
            </h3>
          </div>
        </div>
        <div className={`d-grid gap-2 d-sm-flex justify-content-sm-${this.props.justify} mt-3`}>
          <a
            href={`${(this.props.router.locale === "en-US") ? ("") : (`/${this.props.router.locale}`)}/budgetplanner`}
            target='_blank'
            className="btn btn-primary btn-lg px-4 gap-3"
          >
            {this.props.intl.formatMessage({ id: "cta.main" })}
          </a>
          <button 
            type="button" 
            className="btn btn-outline-primary btn-lg px-4"
            onClick={() => this.props.openFeedbackForm(CALCULATION_FORM)}
          >
            {this.props.intl.formatMessage({ id: "cta.secondary" })}
          </button>
        </div>
      
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps, {
  openFeedbackForm
})((props) => {
  const router = useRouter();
  const intl = useIntl();

  return <MainCta {...props} router={router} intl={intl} />
});