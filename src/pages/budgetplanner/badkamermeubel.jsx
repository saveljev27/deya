import React, { Component } from 'react';

import { updatePlanning } from '@/actions/budget-planner';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import Navbar from '@/components/budgetplanner/navbar';
import RadiobuttonCard from '@/components/budgetplanner/radiobutton-card';
import { prices } from '@/generic/lookup-tables';
import { BATHROOM_FURNITURE, NO_BATHROOM_FURNITURE } from '@/generic/constants';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Head from 'next/head';

class BathRoomFurniture extends Component {

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
    if (!this.props?.budgetPlanner?.planning?.bathFurnitureType) {
      toast.error(this.props.intl.formatMessage({ id: "planner.3.warning.1" }))
      return false;
    }
  }

  moveToTheNextStep = () => {
    if (this.canMoveForward() === false) {
      return;
    }

    return this.props.router.push("/budgetplanner/verwarming")
  }


  render() {
    return (
      <>
        <Head>
          <title>
            {this.props.intl.formatMessage({ id: "planner.3.meta.title" })}
          </title>
          <meta name="description" content={this.props.intl.formatMessage({ id: "planner.3.meta.description" })} />
        </Head>
        <Navbar />
        <main className="min-vh-100">
          <section className="container">
            <div className="row">
              <h2>
                {this.props.intl.formatMessage({ id: "planner.3.title" })}
              </h2>
            </div>
            <div className="row justify-content-center mt-3 mt-md-5">
              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/step-2/meubel_nieuw3.png"
                imgAlt={this.props.intl.formatMessage({ id: "planner.3.card.1.title" })}
                title={this.props.intl.formatMessage({ id: "planner.3.card.1.title" })}
                body={this.props.intl.formatMessage({ id: "planner.3.card.1.body" })}
                price={`+${prices?.BATHROOM_FURNITURE} €`}
                action={() => {
                  this.props.updatePlanning({
                    bathFurnitureType: BATHROOM_FURNITURE,
                    bathFurniturePrice: prices?.BATHROOM_FURNITURE
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.bathFurnitureType === BATHROOM_FURNITURE) ? (true) : (false)}
              />

              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/no_img.jpg"
                imgAlt={this.props.intl.formatMessage({ id: "planner.3.card.2.title" })}
                title={this.props.intl.formatMessage({ id: "planner.3.card.2.title" })}
                body=""
                price={`+${prices?.NO_BATHROOM_FURNITURE} €`}
                action={() => {
                  this.props.updatePlanning({
                    bathFurnitureType: NO_BATHROOM_FURNITURE,
                    bathFurniturePrice: prices?.NO_BATHROOM_FURNITURE
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.bathFurnitureType === NO_BATHROOM_FURNITURE) ? (true) : (false)}
              />
            </div>
          </section>

          <section className="container my-5">
            <div className="row justify-content-center">
              <div className="col text-end">
                <Link 
                  className="btn btn-lg btn-primary"
                  href="/budgetplanner/demontage"
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

  return <BathRoomFurniture {...props} router={router} intl={intl} />
});