import Image from 'next/image';
import React, { Component } from 'react';

import { updatePlanning } from "@/actions/budget-planner";
import { connect } from 'react-redux';
import { BATH_SHOWER_COMBINATION, BUILT_IN_BATH, CALCULATION_FORM, FREE_STANDING_BATH, LOCAL_USER_BUDGET_DATA, SHOWER_CABIN, SHOWER_DOOR, WALK_IN_SHOWER } from '@/generic/constants';
import RadiobuttonCard from '@/components/budgetplanner/radiobutton-card';

import { prices } from "@/generic/lookup-tables";
import toast from 'react-hot-toast';
import Navbar from '@/components/budgetplanner/navbar';
import { useRouter } from 'next/router';
import CheckboxCard from '@/components/budgetplanner/checkbox-card';

import { openFeedbackForm } from '@/actions/screen-activities';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { baseUrl } = publicRuntimeConfig;

class Index extends Component {
  componentDidMount = () => {
    // const localUserData = localStorage.getItem(LOCAL_USER_BUDGET_DATA);
    // if (!localUserData) {
      this.props.openFeedbackForm(CALCULATION_FORM)
    // }
  }

  canMoveForward = () => {
    if (!this.props?.budgetPlanner?.planning?.showerSelected && !this.props?.budgetPlanner?.planning?.bathSelected) {
      toast.error(this.props.intl.formatMessage({ id: "planner.1.warning.1" }))
      return false;
    }
    if (this.props?.budgetPlanner?.planning?.showerSelected && (this.props?.budgetPlanner?.planning?.showerPrice === 0)) {
      toast.error(this.props.intl.formatMessage({ id: "planner.1.warning.2" }))
      return false;
    }
    if (this.props?.budgetPlanner?.planning?.bathSelected && (this.props?.budgetPlanner?.planning?.bathPrice === 0)) {
      toast.error(this.props.intl.formatMessage({ id: "planner.1.warning.3" }))
      return false;
    }
  }

  moveToTheNextStep = () => {
    if (this.canMoveForward() === false) {
      return;
    }

    return this.props.router.push("/budgetplanner/demontage")
  }

  render() {
    return (
      <>
        <Head>
          <title>
            {this.props.intl.formatMessage({ id: "planner.1.meta.title" })}
          </title>
          <meta name="description" content={this.props.intl.formatMessage({ id: "planner.1.meta.description" })} />
          <link rel="alternate" href={`${baseUrl}/nl-NL/budgetplanner`} hrefLang="nl" />
          <link rel="alternate" href={`${baseUrl}/budgetplanner`} hrefLang="en" />
        </Head>
        <Navbar />
        <main className="min-vh-100">
          <section className="container">
            <div className="row">
              <h2>{this.props.intl.formatMessage({ id: "planner.1.title" })}</h2>
            </div>
            <div className="row justify-content-center mt-3 mt-md-5">
              <CheckboxCard
                imgSrc="/assets/budgetplanner/step-1/douche_nieuw.png"
                imgAlt={this.props.intl.formatMessage({ id: "planner.1.shower.card" })}
                title={this.props.intl.formatMessage({ id: "planner.1.shower.card" })}
                action={() => {
                  this.props.updatePlanning({
                    showerSelected: !this.props.budgetPlanner?.planning?.showerSelected
                  })
                }}
                checked={this.props.budgetPlanner?.planning?.showerSelected}
              />
              <div className="col-6 col-md-4">
                <div 
                  className="card cursor_pointer"
                  onClick={() => {
                    this.props.updatePlanning({
                      bathSelected: !this.props.budgetPlanner?.planning?.bathSelected
                    })
                  }}
                >
                  <Image
                    src={`/assets/budgetplanner/step-1/bad_nieuw.png`}
                    alt={this.props.intl.formatMessage({ id: "planner.1.bath.card" })}
                    width={466}
                    height={300}
                    sizes="100%"
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{this.props.intl.formatMessage({ id: "planner.1.bath.card" })}</h5>
                    <div className="d-flex justify-content-center">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={this.props.budgetPlanner?.planning?.bathSelected}
                        readOnly={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="container mt-5">
            {
              (this.props?.budgetPlanner?.planning?.showerSelected) ? (
                <>
                  <div className="row">
                    <h2>
                      {this.props.intl.formatMessage({ id: "planner.1.shower.title" })}
                    </h2>
                  </div>
          
                  <div className="row mt-3 mt-md-5">
                    <RadiobuttonCard 
                      imgSrc="/assets/budgetplanner/step-1/showers/Inloopdouche.png"
                      imgAlt={this.props.intl.formatMessage({ id: "planner.1.shower.card.1.title" })}
                      title={this.props.intl.formatMessage({ id: "planner.1.shower.card.1.title" })}
                      body={this.props.intl.formatMessage({ id: "planner.1.shower.card.1.body" })}
                      price={`+${prices?.WALK_IN_SHOWER} €`}
                      action={() => {
                        this.props.updatePlanning({
                          showerType: WALK_IN_SHOWER,
                          showerPrice: prices?.WALK_IN_SHOWER
                        })
                      }}
                      checked={(this.props?.budgetPlanner?.planning?.showerType === WALK_IN_SHOWER) ? (true) : (false)}
                    />

                    <RadiobuttonCard 
                      imgSrc="/assets/budgetplanner/step-1/showers/Douchecabine2.png"
                      imgAlt={this.props.intl.formatMessage({ id: "planner.1.shower.card.2.title" })}
                      title={this.props.intl.formatMessage({ id: "planner.1.shower.card.2.title" })}
                      body={this.props.intl.formatMessage({ id: "planner.1.shower.card.2.body" })}
                      price={`+${prices?.SHOWER_CABIN} €`}
                      action={() => {
                        this.props.updatePlanning({
                          showerType: SHOWER_CABIN,
                          showerPrice: prices?.SHOWER_CABIN
                        })
                      }}
                      checked={(this.props?.budgetPlanner?.planning?.showerType === SHOWER_CABIN) ? (true) : (false)}
                    />
                                        
                    <RadiobuttonCard 
                      imgSrc="/assets/budgetplanner/step-1/showers/douchedeur.png"
                      imgAlt={this.props.intl.formatMessage({ id: "planner.1.shower.card.3.title" })}
                      title={this.props.intl.formatMessage({ id: "planner.1.shower.card.3.title" })}
                      body={this.props.intl.formatMessage({ id: "planner.1.shower.card.3.body" })}
                      price={`+${prices?.SHOWER_DOOR} €`}
                      action={() => {
                        this.props.updatePlanning({
                          showerType: SHOWER_DOOR,
                          showerPrice: prices?.SHOWER_DOOR
                        })
                      }}
                      checked={(this.props?.budgetPlanner?.planning?.showerType === SHOWER_DOOR) ? (true) : (false)}
                    />
                  </div>
                </>
              ) : (
                <></>
              )
            }
          </section>

          <section className="container mt-5">
            {
              (this.props?.budgetPlanner?.planning?.bathSelected) ? (
                <>
                  <div className="row">
                    <h2>
                      {this.props.intl.formatMessage({ id: "planner.1.bath.title" })}
                    </h2>
                  </div>
          
                  <div className="row mt-3 mt-md-5">
                    <RadiobuttonCard 
                      imgSrc="/assets/budgetplanner/step-1/bath/wall_bath.png"
                      imgAlt={this.props.intl.formatMessage({ id: "planner.1.bath.card.1.title" })}
                      title={this.props.intl.formatMessage({ id: "planner.1.bath.card.1.title" })}
                      body={this.props.intl.formatMessage({ id: "planner.1.bath.card.1.body" })}
                      price={`+${prices?.BUILT_IN_BATH} €`}
                      action={() => {
                        this.props.updatePlanning({
                          bathType: BUILT_IN_BATH,
                          bathPrice: prices?.BUILT_IN_BATH
                        })
                      }}
                      checked={(this.props?.budgetPlanner?.planning?.bathType === BUILT_IN_BATH) ? (true) : (false)}
                    />

                    <RadiobuttonCard 
                      imgSrc="/assets/budgetplanner/step-1/bath/free_standing_bath.png"
                      imgAlt={this.props.intl.formatMessage({ id: "planner.1.bath.card.2.title" })}
                      title={this.props.intl.formatMessage({ id: "planner.1.bath.card.2.title" })}
                      body={this.props.intl.formatMessage({ id: "planner.1.bath.card.2.body" })}
                      price={`+${prices?.FREE_STANDING_BATH} €`}
                      action={() => {
                        this.props.updatePlanning({
                          bathType: FREE_STANDING_BATH,
                          bathPrice: prices?.FREE_STANDING_BATH
                        })
                      }}
                      checked={(this.props?.budgetPlanner?.planning?.bathType === FREE_STANDING_BATH) ? (true) : (false)}
                    />
                                        
                    <RadiobuttonCard 
                      imgSrc="/assets/budgetplanner/step-1/bath/bath_shower_combination.png"
                      imgAlt={this.props.intl.formatMessage({ id: "planner.1.bath.card.3.title" })}
                      title={this.props.intl.formatMessage({ id: "planner.1.bath.card.3.title" })}
                      body={this.props.intl.formatMessage({ id: "planner.1.bath.card.3.body" })}
                      price={`+${prices?.BATH_SHOWER_COMBINATION} €`}
                      action={() => {
                        this.props.updatePlanning({
                          bathType: BATH_SHOWER_COMBINATION,
                          bathPrice: prices?.BATH_SHOWER_COMBINATION
                        })
                      }}
                      checked={(this.props?.budgetPlanner?.planning?.bathType === BATH_SHOWER_COMBINATION) ? (true) : (false)}
                    />
                  </div>
                </>
              ) : (
                <></>
              )
            }
          </section>

          <section className="container my-5">
            <div className="row justify-content-center">
              <div className="col-12 text-center">
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
  openFeedbackForm
})((props) => {
  const router = useRouter();
  const intl = useIntl();

  return <Index {...props} router={router} intl={intl} />
});