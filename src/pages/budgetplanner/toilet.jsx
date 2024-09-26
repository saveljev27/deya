import { useRouter } from 'next/router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updatePlanning } from '@/actions/budget-planner'; 
import Navbar from '@/components/budgetplanner/navbar';
import RadiobuttonCard from '@/components/budgetplanner/radiobutton-card';
import { prices } from '@/generic/lookup-tables';
import { NO_WC, WC, WC_SHOWER } from '@/generic/constants';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Head from 'next/head';

class Toilet extends Component {

  componentDidMount = () => {
    if (!this.props?.budgetPlanner?.planning?.electricityType) {
      this.props.router.push("/budgetplanner/elektriciteit");
    }
  }

  canMoveForward = () => {
    if (!this.props?.budgetPlanner?.planning?.toiletType) {
      toast.error(this.props.intl.formatMessage({ id: "planner.7.warning.1" }));
      return false;
    }
  }

  moveToTheNextStep = () => {
    if (this.canMoveForward() === false) {
      return;
    }

    return this.props.router.push("/budgetplanner/tegels");
  }


  render() {

    // console.log(this.props?.budgetPlanner?.planning?.bathroomHeatingType);
    return (
      <>
        <Head>
          <title>
            {this.props.intl.formatMessage({ id: "planner.7.meta.title" })}
          </title>
          <meta name="description" content={this.props.intl.formatMessage({ id: "planner.7.meta.description" })} />
        </Head>
        <Navbar />
        <main className="min-vh-100">
          <section className="container">
            <div className="row">
              <h2>
                {this.props.intl.formatMessage({ id: "planner.7.title" })}
              </h2>
            </div>
            <div className="row justify-content-center mt-3 mt-md-5">
              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/step-4/toilet_nieuw1.png"
                imgAlt={this.props.intl.formatMessage({ id: "planner.7.card.1.title" })}
                title={this.props.intl.formatMessage({ id: "planner.7.card.1.title" })}
                body={this.props.intl.formatMessage({ id: "planner.7.card.1.body" })}
                price={`+${prices?.WC} €`}
                action={() => {
                  this.props.updatePlanning({
                    toiletType: WC,
                    toiletPrice: prices?.WC
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.toiletType === WC) ? (true) : (false)}
              />
              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/step-4/toilet_with_shower.jpg"
                imgAlt={this.props.intl.formatMessage({ id: "planner.7.card.2.title" })}
                title={this.props.intl.formatMessage({ id: "planner.7.card.2.title" })}
                body={this.props.intl.formatMessage({ id: "planner.7.card.2.body" })}
                price={`+${prices?.WC_SHOWER} €`}
                action={() => {
                  this.props.updatePlanning({
                    toiletType: WC_SHOWER,
                    toiletPrice: prices?.WC_SHOWER
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.toiletType === WC_SHOWER) ? (true) : (false)}
              />
              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/no_img.jpg"
                imgAlt={this.props.intl.formatMessage({ id: "planner.7.card.3.title" })}
                title={this.props.intl.formatMessage({ id: "planner.7.card.3.title" })}
                body={this.props.intl.formatMessage({ id: "planner.7.card.3.body" })}
                price={`+${prices?.NO_WC} €`}
                action={() => {
                  this.props.updatePlanning({
                    toiletType: NO_WC,
                    toiletPrice: prices?.NO_WC
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.toiletType === NO_WC) ? (true) : (false)}
              />
            </div>
          </section>

          <section className="container my-5">
            <div className="row justify-content-center">
              <div className="col text-end">
                <Link
                  className="btn btn-lg btn-primary"
                  href="/budgetplanner/loodgieter"
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

  return <Toilet {...props} router={router} intl={intl} />
});