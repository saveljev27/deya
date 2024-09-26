import { useRouter } from 'next/router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updatePlanning } from '@/actions/budget-planner'; 
import Navbar from '@/components/budgetplanner/navbar';
import RadiobuttonCard from '@/components/budgetplanner/radiobutton-card';
import { prices } from '@/generic/lookup-tables';
import { PLUMBER_MAX_3, PLUMBER_MAX_6, PLUMBER_MAX_8, NO_PLUMBER } from '@/generic/constants';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Head from 'next/head';

class Plumbing extends Component {

  componentDidMount = () => {
    if (!this.props?.budgetPlanner?.planning?.bathFurnitureType) {
      this.props.router.push("/budgetplanner/elektriciteit");
    }
  }

  canMoveForward = () => {
    if (!this.props?.budgetPlanner?.planning?.plumberType) {
      toast.error(this.props.intl.formatMessage({ id: "planner.6.warning.1" }));
      return false;
    }
  }

  moveToTheNextStep = () => {
    if (this.canMoveForward() === false) {
      return;
    }

    return this.props.router.push("/budgetplanner/toilet");
  }


  render() {
    return (
      <>
        <Head>
          <title>
            {this.props.intl.formatMessage({ id: "planner.6.meta.title" })}
          </title>
          <meta name="description" content={this.props.intl.formatMessage({ id: "planner.6.meta.description" })} />
        </Head>
        <Navbar />
        <main className="min-vh-100">
          <section className="container">
            <div className="row">
              <h2>
                {this.props.intl.formatMessage({ id: "planner.6.title" })}
              </h2>
            </div>
            <div className="row justify-content-center mt-3 mt-md-5">
              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/plumbing/plumbing.jpg"
                imgAlt={this.props.intl.formatMessage({ id: "planner.6.card.1.title" })}
                title={this.props.intl.formatMessage({ id: "planner.6.card.1.title" })}
                body={this.props.intl.formatMessage({ id: "planner.6.card.1.body" })}
                price={`+${prices?.PLUMBER_MAX_3} €`}
                action={() => {
                  this.props.updatePlanning({
                    plumberType: PLUMBER_MAX_3,
                    plumberPrice: prices?.PLUMBER_MAX_3
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.plumberType === PLUMBER_MAX_3) ? (true) : (false)}
              />

              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/plumbing/plumbing.jpg"
                imgAlt={this.props.intl.formatMessage({ id: "planner.6.card.2.title" })}
                title={this.props.intl.formatMessage({ id: "planner.6.card.2.title" })}
                body={this.props.intl.formatMessage({ id: "planner.6.card.2.body" })}
                price={`+${prices?.PLUMBER_MAX_6} €`}
                action={() => {
                  this.props.updatePlanning({
                    plumberType: PLUMBER_MAX_6,
                    plumberPrice: prices?.PLUMBER_MAX_6
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.plumberType === PLUMBER_MAX_6) ? (true) : (false)}
              />

              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/plumbing/plumbing.jpg"
                imgAlt={this.props.intl.formatMessage({ id: "planner.6.card.3.title" })}
                title={this.props.intl.formatMessage({ id: "planner.6.card.3.title" })}
                body={this.props.intl.formatMessage({ id: "planner.6.card.3.body" })}
                price={`+${prices?.PLUMBER_MAX_8} €`}
                action={() => {
                  this.props.updatePlanning({
                    plumberType: PLUMBER_MAX_8,
                    plumberPrice: prices?.PLUMBER_MAX_8
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.plumberType === PLUMBER_MAX_8) ? (true) : (false)}
              />

              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/no_img.jpg"
                imgAlt={this.props.intl.formatMessage({ id: "planner.6.card.4.title" })}
                title={this.props.intl.formatMessage({ id: "planner.6.card.4.title" })}
                body=""
                price={`+${prices?.NO_PLUMBER} €`}
                action={() => {
                  this.props.updatePlanning({
                    plumberType: NO_PLUMBER,
                    plumberPrice: prices?.NO_PLUMBER
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.plumberType === NO_PLUMBER) ? (true) : (false)}
              />
            </div>
          </section>

          <section className="container my-5">
            <div className="row justify-content-center">
              <div className="col text-end">
                <Link
                  className="btn btn-lg btn-primary"
                  href="/budgetplanner/elektriciteit"
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

  return <Plumbing {...props} router={router} intl={intl} />
});