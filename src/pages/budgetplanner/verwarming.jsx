import { useRouter } from 'next/router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updatePlanning } from '@/actions/budget-planner'; 
import Navbar from '@/components/budgetplanner/navbar';
import RadiobuttonCard from '@/components/budgetplanner/radiobutton-card';
import { prices } from '@/generic/lookup-tables';
import { WARM_FLOOR_LESS_THAN_5, WARM_FLOOR_MORE_THAN_5, NO_HEATING, WALL_HEATER } from '@/generic/constants';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Head from 'next/head';

class Heating extends Component {

  componentDidMount = () => {
    if (!this.props?.budgetPlanner?.planning?.bathFurnitureType) {
      this.props.router.push("/budgetplanner/badkamermeubel");
    }
  }

  canMoveForward = () => {
    if (!this.props?.budgetPlanner?.planning?.bathroomHeatingType) {
      toast.error(this.props.intl.formatMessage({ id: "planner.4.warning.1" }));
      return false;
    }
  }

  moveToTheNextStep = () => {
    if (this.canMoveForward() === false) {
      return;
    }

    return this.props.router.push("/budgetplanner/elektriciteit");
  }


  render() {
    return (
      <>
        <Head>
          <title>
            {this.props.intl.formatMessage({ id: "planner.4.meta.title" })}
          </title>
          <meta name="description" content={this.props.intl.formatMessage({ id: "planner.4.meta.description" })} />
        </Head>
        <Navbar />
        <main className="min-vh-100">
          <section className="container">
            <div className="row">
              <h2>
                {this.props.intl.formatMessage({ id: "planner.4.title" })}
              </h2>
            </div>
            <div className="row justify-content-center mt-3 mt-md-5">
              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/step-3/warm_floor.jpg"
                imgAlt={this.props.intl.formatMessage({ id: "planner.4.card.1.title" })}
                title={this.props.intl.formatMessage({ id: "planner.4.card.1.title" })}
                body={this.props.intl.formatMessage({ id: "planner.4.card.1.body" })}
                price={`+${prices?.WARM_FLOOR_LESS_THAN_5} €`}
                action={() => {
                  this.props.updatePlanning({
                    bathroomHeatingType: WARM_FLOOR_LESS_THAN_5,
                    bathroomHeatingPrice: prices?.WARM_FLOOR_LESS_THAN_5
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.bathroomHeatingType === WARM_FLOOR_LESS_THAN_5) ? (true) : (false)}
              />

              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/step-3/warm_floor.jpg"
                imgAlt={this.props.intl.formatMessage({ id: "planner.4.card.2.title" })}
                title={this.props.intl.formatMessage({ id: "planner.4.card.2.title" })}
                body={this.props.intl.formatMessage({ id: "planner.4.card.2.body" })}
                price={`+${prices?.WARM_FLOOR_MORE_THAN_5} €`}
                action={() => {
                  this.props.updatePlanning({
                    bathroomHeatingType: WARM_FLOOR_MORE_THAN_5,
                    bathroomHeatingPrice: prices?.WARM_FLOOR_MORE_THAN_5
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.bathroomHeatingType === WARM_FLOOR_MORE_THAN_5) ? (true) : (false)}
              />

              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/step-3/verwarming_nieuw.png"
                imgAlt={this.props.intl.formatMessage({ id: "planner.4.card.3.title" })}
                title={this.props.intl.formatMessage({ id: "planner.4.card.3.title" })}
                body={this.props.intl.formatMessage({ id: "planner.4.card.3.body" })}
                price={`+${prices?.WALL_HEATER} €`}
                action={() => {
                  this.props.updatePlanning({
                    bathroomHeatingType: WALL_HEATER,
                    bathroomHeatingPrice: prices?.WALL_HEATER
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.bathroomHeatingType === WALL_HEATER) ? (true) : (false)}
              />

              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/no_img.jpg"
                imgAlt={this.props.intl.formatMessage({ id: "planner.4.card.4.title" })}
                title={this.props.intl.formatMessage({ id: "planner.4.card.4.title" })}
                body=""
                price={`+${prices?.NO_HEATING} €`}
                action={() => {
                  this.props.updatePlanning({
                    bathroomHeatingType: NO_HEATING,
                    bathroomHeatingPrice: prices?.NO_HEATING
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.bathroomHeatingType === NO_HEATING) ? (true) : (false)}
              />
            </div>
          </section>

          <section className="container my-5">
            <div className="row justify-content-center">
              <div className="col text-end">
                <Link
                  className="btn btn-lg btn-primary"
                  href="/budgetplanner/badkamermeubel"
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

  return <Heating {...props} router={router} intl={intl} />
});