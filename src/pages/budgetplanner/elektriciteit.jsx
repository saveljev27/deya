import { useRouter } from 'next/router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updatePlanning } from '@/actions/budget-planner'; 
import Navbar from '@/components/budgetplanner/navbar';
import RadiobuttonCard from '@/components/budgetplanner/radiobutton-card';
import { prices } from '@/generic/lookup-tables';
import { ELECTRICITY_MAX_5, ELECTRICITY_MAX_7, NO_ELECTRICITY } from '@/generic/constants';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Head from 'next/head';

class Electricity extends Component {

  componentDidMount = () => {
    if (!this.props?.budgetPlanner?.planning?.bathFurnitureType) {
      this.props.router.push("/budgetplanner/badkamermeubel");
    }
  }

  canMoveForward = () => {
    if (!this.props?.budgetPlanner?.planning?.electricityType) {
      toast.error(this.props.intl.formatMessage({ id: "planner.5.warning.1" }));
      return false;
    }
  }

  moveToTheNextStep = () => {
    if (this.canMoveForward() === false) {
      return;
    }

    return this.props.router.push("/budgetplanner/loodgieter");
  }


  render() {
    return (
      <>
        <Head>
          <title>
            {this.props.intl.formatMessage({ id: "planner.5.meta.title" })}
          </title>
          <meta name="description" content={this.props.intl.formatMessage({ id: "planner.5.meta.description" })} />
        </Head>
        <Navbar />
        <main className="min-vh-100">
          <section className="container">
            <div className="row">
              <h2>
                {this.props.intl.formatMessage({ id: "planner.5.title" })}
              </h2>
            </div>
            <div className="row justify-content-center mt-3 mt-md-5">
              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/electricity/electric_switch.jpg"
                imgAlt={this.props.intl.formatMessage({ id: "planner.5.card.1.title" })}
                title={this.props.intl.formatMessage({ id: "planner.5.card.1.title" })}
                body={this.props.intl.formatMessage({ id: "planner.5.card.1.body" })}
                price={`+${prices?.ELECTRICITY_MAX_5} €`}
                action={() => {
                  this.props.updatePlanning({
                    electricityType: ELECTRICITY_MAX_5,
                    electricityPrice: prices?.ELECTRICITY_MAX_5
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.electricityType === ELECTRICITY_MAX_5) ? (true) : (false)}
              />

              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/electricity/electric_switch.jpg"
                imgAlt={this.props.intl.formatMessage({ id: "planner.5.card.2.title" })}
                title={this.props.intl.formatMessage({ id: "planner.5.card.2.title" })}
                body={this.props.intl.formatMessage({ id: "planner.5.card.2.body" })}
                price={`+${prices?.ELECTRICITY_MAX_7} €`}
                action={() => {
                  this.props.updatePlanning({
                    electricityType: ELECTRICITY_MAX_7,
                    electricityPrice: prices?.ELECTRICITY_MAX_7
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.electricityType === ELECTRICITY_MAX_7) ? (true) : (false)}
              />


              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/no_img.jpg"
                imgAlt={this.props.intl.formatMessage({ id: "planner.5.card.3.title" })}
                title={this.props.intl.formatMessage({ id: "planner.5.card.3.title" })}
                price={`+${prices?.NO_ELECTRICITY} €`}
                action={() => {
                  this.props.updatePlanning({
                    electricityType: NO_ELECTRICITY,
                    electricityPrice: prices?.NO_ELECTRICITY
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.electricityType === NO_ELECTRICITY) ? (true) : (false)}
              />
            </div>
          </section>

          <section className="container my-5">
            <div className="row justify-content-center">
              <div className="col text-end">
                <Link
                  className="btn btn-lg btn-primary"
                  href="/budgetplanner/verwarming"
                >
                  {this.props.intl.formatMessage({ id: "planner.btn.back" })}
                </Link>
              </div>
              <div className="col ps-3"> 
                <button className="btn btn-lg btn-primary" onClick={() => this.moveToTheNextStep()}>
                  {this.props.intl.formatMessage({ id: "planner.btn.forward" })}
                </button>
              </div>
            </div>
          </section>
        </main>
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
  updatePlanning
})((props) => {
  const router = useRouter();
  const intl = useIntl();

  return <Electricity {...props} router={router} intl={intl} />
});