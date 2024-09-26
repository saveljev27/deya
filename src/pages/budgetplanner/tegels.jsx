import { useRouter } from 'next/router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updatePlanning } from '@/actions/budget-planner'; 
import Navbar from '@/components/budgetplanner/navbar';
import RadiobuttonCard from '@/components/budgetplanner/radiobutton-card';
import { prices } from '@/generic/lookup-tables';
import { BASIC_TILES, LUX_TILES, NO_TILES, TILES_SELECTED } from '@/generic/constants';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Head from 'next/head';

const initialState = {
  length: 0,
  width: 0,
  height: 0,
  m2: 0,
  bathRoomFloorM2: 0
}

class Toilet extends Component {
  state = initialState;

  componentDidMount = () => {
    if (!this.props?.budgetPlanner?.planning?.toiletType) {
      this.props.router.push("/budgetplanner/toilet");
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      (prevState?.length !== this.state?.length) || 
      (prevState?.width !== this.state?.width) || 
      (prevState?.height !== this.state?.height) || 
      (prevProps?.budgetPlanner?.planning?.tilesType !== this.props?.budgetPlanner?.planning?.tilesType)
    ) {
      this.calculateM2();
    }
  }

  calculateM2 = () => {
    if (!this.state.length || !this.state.width || !this.state.height) {
      if (this.state.m2 !== 0) {
        return this.setState({
          ...this.state,
          m2: 0
        });
      }
      return;
    }

    const bathRoomFloorM2 = (this.state.length * this.state.width) * 0.0001;
    const m2 = Math.round(
      ((this.state.length * this.state.height * 2) + 
      (this.state.width * this.state.height * 2) + 
      (this.state.length * this.state.width)) * 0.0001
    );
    
    this.props.updatePlanning({
      tilesTotalPrice: (m2 * this.props?.budgetPlanner?.planning?.tilesPrice),
      m2,
      bathRoomFloorM2,
      length: this.state.length,
      with: this.state.width,
      height: this.state.height
    });
    return this.setState({
      ...this.state,
      m2,
      bathRoomFloorM2
    });
  }

  canMoveForward = () => {
    if (!this.props?.budgetPlanner?.planning?.tilesType) {
      toast.error(this.props.intl.formatMessage({ id: "planner.8.warning.1" }));
      return false;
    }

    if (TILES_SELECTED.includes(this.props?.budgetPlanner?.planning?.tilesType) && (this.state.m2 === 0)) {
      toast.error(this.props.intl.formatMessage({ id: "planner.8.warning.2" }));
      return false;
    }
  }

  moveToTheNextStep = () => {
    if (this.canMoveForward() === false) {
      return;
    }

    return this.props.router.push("/budgetplanner/bouw-schatting")
  }

  handleChange = (e) => {
    let value = +e.target.value;
    if (!Number.isInteger(value)) {
      toast.error(this.props.intl.formatMessage({ id: "planner.8.warning.3" }));
      return;
    }
    
    this.setState({
      ...this.state,
      [e.target.name]: value || 0
    });
  }


  render() {

    // console.log(this.props?.budgetPlanner?.planning?.bathroomHeatingType);
    return (
      <>
        <Head>
          <title>
            {this.props.intl.formatMessage({ id: "planner.8.meta.title" })}
          </title>
          <meta name="description" content={this.props.intl.formatMessage({ id: "planner.8.meta.description" })} />
        </Head>
        <Navbar />
        <main className="min-vh-100">
          <section className="container">
            <div className="row">
              <h2>
                {this.props.intl.formatMessage({ id: "planner.8.title" })}
              </h2>
            </div>
            <div className="row mt-3 mt-md-5">
              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/step-5/tegels_basis1.png"
                imgAlt={this.props.intl.formatMessage({ id: "planner.8.card.1.title" })}
                title={this.props.intl.formatMessage({ id: "planner.8.card.1.title" })}
                body={this.props.intl.formatMessage({ id: "planner.8.card.1.body" })}
                price={`+${prices?.BASIC_TILES} € / m2`}
                action={() => {
                  this.props.updatePlanning({
                    tilesType: BASIC_TILES,
                    tilesPrice: prices?.BASIC_TILES
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.tilesType === BASIC_TILES) ? (true) : (false)}
              />
              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/step-5/tegels_luxe.png"
                imgAlt={this.props.intl.formatMessage({ id: "planner.8.card.2.title" })}
                title={this.props.intl.formatMessage({ id: "planner.8.card.2.title" })}
                body={this.props.intl.formatMessage({ id: "planner.8.card.2.body" })}
                price={`+${prices?.LUX_TILES} € / m2`}
                action={() => {
                  this.props.updatePlanning({
                    tilesType: LUX_TILES,
                    tilesPrice: prices?.LUX_TILES
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.tilesType === LUX_TILES) ? (true) : (false)}
              />
              <RadiobuttonCard
                imgSrc="/assets/budgetplanner/step-5/tegels_algemeen.png"
                imgAlt={this.props.intl.formatMessage({ id: "planner.7.card.3.title" })}
                title={this.props.intl.formatMessage({ id: "planner.7.card.3.title" })}
                body={this.props.intl.formatMessage({ id: "planner.7.card.3.body" })}
                price={`+${prices?.NO_TILES} €`}
                action={() => {
                  this.props.updatePlanning({
                    tilesType: NO_TILES,
                    tilesPrice: prices?.NO_TILES
                  })
                }}
                checked={(this.props?.budgetPlanner?.planning?.tilesType === NO_TILES) ? (true) : (false)}
              />
            </div>
          </section>

          {
            (TILES_SELECTED.includes(this.props?.budgetPlanner?.planning?.tilesType)) ? (
              <section className="container mt-5">
                <div className="row">
                  <h2>
                    {this.props.intl.formatMessage({ id: "planner.8.tiles.title" })}
                  </h2>
                </div>
                <div className="col-12">
                  {this.props.intl.formatMessage({ id: "planner.8.tiles.subtl" })}
                </div>
                <div className="row mt-3">
                  <div className="col-12 col-lg-4 text-center">
                    <h3>
                      {this.props.intl.formatMessage({ id: "planner.8.tiles.length" })}
                    </h3>

                    {/* TODO: Fix an issue with Input field */}
                    <input 
                      type="text" 
                      className="form-control mt-3" 
                      placeholder="... cm"
                      name="length"
                      value={this.state.length}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>

                  <div className="col-12 col-lg-4 text-center">
                    <h3>
                      {this.props.intl.formatMessage({ id: "planner.8.tiles.width" })}
                    </h3>
                    <input 
                      type="text" 
                      className="form-control mt-3" 
                      placeholder="... cm"
                      name="width"
                      value={this.state.width}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>

                  <div className="col-12 col-lg-4 text-center">
                    <h3>
                      {this.props.intl.formatMessage({ id: "planner.8.tiles.height" })}
                    </h3>
                    <input 
                      type="text" 
                      className="form-control mt-3" 
                      placeholder="... cm"
                      name="height"
                      value={this.state.height}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                </div>

                <div className="row justify-content-center mt-3">
                  <div className="col-12 col-lg-4 text-center">
                    <h3>
                      {this.props.intl.formatMessage({ id: "planner.8.tiles.m2.tiles" })}
                    </h3>
                    <input 
                      type="text" 
                      className="form-control mt-3" 
                      placeholder="cm2"
                      name="length"
                      value={this.state.m2}
                      readOnly={true}
                    />
                  </div>

                  <div className="col-12 col-lg-4 text-center">
                    <h3>
                      {this.props.intl.formatMessage({ id: "planner.8.tiles.m2.floor" })}
                    </h3>
                    <input 
                      type="text" 
                      className="form-control mt-3" 
                      placeholder="cm2"
                      name="length"
                      value={this.state.bathRoomFloorM2}
                      readOnly={true}
                    />
                  </div>
                </div>
              </section>
            ) : (
              <></>
            )
          }

          <section className="container my-5">
            <div className="row justify-content-center">
              <div className="col text-end">
                <Link
                  className="btn btn-lg btn-primary"
                  href="/budgetplanner/toilet"
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