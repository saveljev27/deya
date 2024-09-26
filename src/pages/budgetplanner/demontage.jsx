import Image from 'next/image';
import React, { Component } from 'react';

import { updatePlanning } from "@/actions/budget-planner";
import { connect } from 'react-redux';
import { BATH_SHOWER_COMBINATION, BUILT_IN_BATH, CALCULATION_FORM, CONSTRUCTION_CONTAINER, DEMOLITION_WORKS, FREE_STANDING_BATH, LOCAL_USER_BUDGET_DATA, NO_DEMOLITION_WORKS, SHOWER_CABIN, SHOWER_DOOR, WALK_IN_SHOWER } from '@/generic/constants';
import RadiobuttonCard from '@/components/budgetplanner/radiobutton-card';

import { prices } from "@/generic/lookup-tables";
import toast from 'react-hot-toast';
import Navbar from '@/components/budgetplanner/navbar';
import { useRouter } from 'next/router';
import CheckboxCard from '@/components/budgetplanner/checkbox-card';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Head from 'next/head';


class Index extends Component {
  componentDidMount = () => {
    if (
      (!this.props?.budgetPlanner?.planning?.showerSelected && !this.props?.budgetPlanner?.planning?.bathSelected) ||
      (this.props?.budgetPlanner?.planning?.showerSelected && (this.props?.budgetPlanner?.planning?.showerPrice === 0)) ||
      (this.props?.budgetPlanner?.planning?.bathSelected && (this.props?.budgetPlanner?.planning?.bathPrice === 0))
    ) {
      this.props.router.push("/budgetplanner")
    }
  }

  canMoveForward = () => {
    if (!this.props?.budgetPlanner?.planning?.demolitionWorkType) {
      toast.error(this.props.intl.formatMessage({ id: "planner.2.warning.1" }))
      return false;
    }
  }

  moveToTheNextStep = () => {
    if (this.canMoveForward() === false) {
      return;
    }

    return this.props.router.push("/budgetplanner/badkamermeubel")
  }

  render() {
    return (
      <>
        <Head>
          <title>
            {this.props.intl.formatMessage({ id: "planner.2.meta.title" })}
          </title>
          <meta name="description" content={this.props.intl.formatMessage({ id: "planner.2.meta.description" })} />
        </Head>
        <Navbar />
        <main className="min-vh-100">
          <section className="container">
            <div className="row">
              <h2>
                {this.props.intl.formatMessage({ id: "planner.2.title" })}
              </h2>
            </div>
            <div className="row justify-content-center mt-3 mt-md-5">
              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/demolition/IMG_9441.jpg"
                imgAlt={this.props.intl.formatMessage({ id: "planner.2.card.1.title" })}
                title={this.props.intl.formatMessage({ id: "planner.2.card.1.title" })}
                body={this.props.intl.formatMessage({ id: "planner.2.card.1.body" })}
                price={`+${prices?.DEMOLITION_WORKS} €`}
                action={() => {
                  this.props.updatePlanning({
                    demolitionWorkType: DEMOLITION_WORKS,
                    demolitionWorkPrice: prices?.DEMOLITION_WORKS
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.demolitionWorkType === DEMOLITION_WORKS) ? (true) : (false)}
              />

              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/demolition/container.jpg"
                imgAlt={this.props.intl.formatMessage({ id: "planner.2.card.2.title" })}
                title={this.props.intl.formatMessage({ id: "planner.2.card.2.title" })}
                body={this.props.intl.formatMessage({ id: "planner.2.card.2.body" })}
                price={`+${prices?.CONSTRUCTION_CONTAINER} €`}
                action={() => {
                  this.props.updatePlanning({
                    demolitionWorkType: CONSTRUCTION_CONTAINER,
                    demolitionWorkPrice: prices?.CONSTRUCTION_CONTAINER
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.demolitionWorkType === CONSTRUCTION_CONTAINER) ? (true) : (false)}
              />

              {/* <RadiobuttonCard
                imgSrc="/assets/budgetplanner/no_img.jpg"
                imgAlt="Nee"
                title="Nee"
                body=""
                price={`+${prices?.NO_DEMOLITION_WORKS} €`}
                action={() => {
                  this.props.updatePlanning({
                    demolitionWorkType: NO_DEMOLITION_WORKS,
                    demolitionWorkPrice: prices?.NO_DEMOLITION_WORKS
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.demolitionWorkType === NO_DEMOLITION_WORKS) ? (true) : (false)}
              /> */}
            </div>
          </section>

          <section className="container my-5">
            <div className="row justify-content-center">
              <div className="col text-end">
                <Link
                  className="btn btn-lg btn-primary"
                  href="/budgetplanner"
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
  updatePlanning,
})((props) => {
  const router = useRouter();
  const intl = useIntl();

  return <Index {...props} router={router} intl={intl} />
});