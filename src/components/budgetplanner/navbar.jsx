import { useRouter } from 'next/router';
import React, { Component } from 'react'
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import LanguageSwitch from '../../components/lang-switch';

class Navbar extends Component {
  render() {
    return (
      <>
        <nav className="container-fluid sticky-top bg-white">
          <div className="row">
            <div className="col-6 col-md-4 ps-5 mt-4">
              <LanguageSwitch />
            </div>
            <div className="col-4 d-none d-md-block"></div>
            <div className="col-6 col-md-4 d-flex flex-column align-items-end">
              <div className="d-none d-md-inline-block">
                {this.props.intl.formatMessage({ id: "planner.nav.price"})}
              </div>
              <div>
                <h4 className="text-primary mt-4 mt-md-0">
                  € {this.props.budgetPlanner?.total},-
                </h4>
              </div>
            </div>
          </div>
        <hr />
        </nav>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    budgetPlanner: state.budgetPlanner
  }
}

export default connect(mapStateToProps, {
})((props) => {
  const router = useRouter();
  const intl = useIntl();

  return <Navbar {...props} router={router} intl={intl} />
});