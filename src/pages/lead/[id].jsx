import { useRouter } from 'next/router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updatePlanning } from '@/actions/budget-planner'; 
import Navbar from '@/components/budgetplanner/navbar';
import RadiobuttonCard from '@/components/budgetplanner/radiobutton-card';
import { TEXT_TAGS, prices } from '@/generic/lookup-tables';
import toast from 'react-hot-toast';
import Link from 'next/link';

import { MdOutlineEmail } from "react-icons/md";
import { LuPrinter } from "react-icons/lu";
import { MdCalendarMonth } from "react-icons/md";
import { event } from '@/lib/ga';
import { LOCAL_USER_BUDGET_DATA } from '@/generic/constants';
import axios from 'axios';
import getConfig from 'next/config';
import { useIntl } from 'react-intl';
import Head from 'next/head';

const { publicRuntimeConfig } = getConfig();
const { baseApiUrl } = publicRuntimeConfig.api;

class Toilet extends Component {
  roundNumber = (x) => {
    return Number.parseFloat(x).toFixed(2);
  }

  printPageArea = (areaID) => {
    var printContent = document.getElementById(areaID).innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
  }

  render() {
    const withoutVAT = (+this.props?.data?.total / 1.21).toFixed(2);
    const VAT = (this.props?.data?.total - withoutVAT).toFixed(2);

    return (
      <>
        <main className="min-vh-100 padding-page-top">
          <section className="container">
            <div className="row justify-content-center mt-3 mt-md-5">
              <div className="col-12 col-md-8" id="print-area">
                <div className="row">
                  <h2>
                    Bathroom renovation plan
                  </h2>
                </div>
                <hr />

                <div className="my-4">
                  Customer name: {this.props?.data?.full_name}<br />
                  <br />
                  Phone: <a href={`tel:${this.props?.data?.phone}`}>{this.props?.data?.phone}</a><br />
                  <br />
                  Email: <a href={`mailto:${this.props?.data?.email}`}>{this.props?.data?.email}</a><br />
                </div>
                <hr />

                <div className="row">
                  <div className="col-12 col-md-6">
                    <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.1" })}</h4>
                    <h5>
                      {
                        (this.props?.data?.bathSelected) ? (
                          <>{TEXT_TAGS[this.props.router?.locale][this.props?.data?.bathType]}</>
                        ) : (
                          <>{this.props.intl.formatMessage({ id: "planner.finish.no" })}</>
                        )
                      }
                    </h5>
                  </div>
                  <div className="col-12 col-md-6">
                    <h3 className="pt-4">
                      {this.props?.data?.bathPrice} EUR
                    </h3>
                  </div>
                </div>
                <hr />

                <div className="row mt-4">
                  <div className="col-12 col-md-6">
                    <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.2" })}</h4>
                    <h5>
                      {
                        (this.props?.data?.showerSelected) ? (
                          <>{TEXT_TAGS[this.props.router?.locale][this.props?.data?.showerType]}</>
                        ) : (
                          <>{this.props.intl.formatMessage({ id: "planner.finish.no" })}</>
                        )
                      }
                    </h5>
                  </div>
                  <div className="col-12 col-md-6">
                    <h3 className="pt-4">
                      {this.props?.data?.showerPrice} EUR
                    </h3>
                  </div>
                </div>
                <hr />

                <div className="row">
                    <div className="col-12 col-md-6">
                      <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.3" })}</h4>
                      <h5>
                        {TEXT_TAGS[this.props.router?.locale][this.props?.data?.demolitionWorkType]}
                      </h5>
                    </div>
                    <div className="col-12 col-md-6">
                      <h3 className="pt-4">
                        {this.props?.data?.demolitionWorkPrice} EUR
                      </h3>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.4" })}</h4>
                      <h5>
                        {TEXT_TAGS[this.props.router?.locale][this.props?.data?.bathFurnitureType]}
                      </h5>
                    </div>
                    <div className="col-12 col-md-6">
                      <h3 className="pt-4">
                        {this.props?.data?.bathFurniturePrice} EUR
                      </h3>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.5" })}</h4>
                      <h5>
                        {TEXT_TAGS[this.props.router?.locale][this.props?.data?.bathroomHeatingType]}
                      </h5>
                    </div>
                    <div className="col-12 col-md-6">
                      <h3 className="pt-4">
                        {this.props?.data?.bathroomHeatingPrice} EUR
                      </h3>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.6" })}</h4>
                      <h5>
                        {TEXT_TAGS[this.props.router?.locale][this.props?.data?.electricityType]}
                      </h5>
                    </div>
                    <div className="col-12 col-md-6">
                      <h3 className="pt-4">
                        {this.props?.data?.electricityPrice} EUR
                      </h3>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.7" })}</h4>
                      <h5>
                        {TEXT_TAGS[this.props.router?.locale][this.props?.data?.plumberType]}
                      </h5>
                    </div>
                    <div className="col-12 col-md-6">
                      <h3 className="pt-4">
                        {this.props?.data?.plumberPrice} EUR
                      </h3>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.8" })}</h4>
                      <h5>
                        {TEXT_TAGS[this.props.router?.locale][this.props?.data?.toiletType]}
                      </h5>
                    </div>
                    <div className="col-12 col-md-6">
                      <h3 className="pt-4">
                        {this.props?.data?.toiletPrice} EUR
                      </h3>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.9" })}</h4>
                      <h5>
                        {TEXT_TAGS[this.props.router?.locale][this.props?.data?.tilesType]}
                      </h5>
                    </div>
                    <div className="col-12 col-md-6">
                      <h3 className="pt-4">
                        {this.props?.data?.tilesTotalPrice} EUR
                      </h3>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.10" })}</h4>
                    </div>
                    <div className="col-12 col-md-6">
                      <h3 className="pt-4">
                        {this.roundNumber(this.props?.data?.m2)} m2
                      </h3>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.11" })}</h4>
                    </div>
                    <div className="col-12 col-md-6">
                      <h3 className="pt-4">
                        {this.roundNumber(this.props?.data?.bathRoomFloorM2)} m2
                      </h3>
                    </div>
                  </div>
                  <hr />
                  <hr />

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.12" })}</h4>
                    </div>
                    <div className="col-12 col-md-6">
                      <h3 className="">
                        {this.roundNumber(VAT)} EUR
                      </h3>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.13" })}</h4>
                    </div>
                    <div className="col-12 col-md-6">
                      <h3 className="">
                        {this.roundNumber(withoutVAT)} EUR
                      </h3>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.14" })}</h4>
                    </div>
                    <div className="col-12 col-md-6">
                      <h3 className="">
                        {this.roundNumber(this.props?.data?.total)} EUR
                      </h3>
                    </div>
                  </div>
              </div>

              <div className="col-12 col-md-4 mt-5 mt-md-0">
                <h3 className="">Print out calculation</h3>
                <button 
                  className="btn btn-primary mt-3 ms-2 px-3"
                  onClick={() => {
                    this.printPageArea("print-area");
                  }}
                >
                  <LuPrinter />{' '}
                  {this.props.intl.formatMessage({ id: "planner.finish.cta.btn.print" })}
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

export async function getServerSideProps({query}) {
  let data = null;

  try {
    const res =  await axios
      .get(
        `${baseApiUrl}/items/web_calculations/${query?.id}?access_token=XEX9AlFe34a-Jt-FJ6bmhGLmflzCEFYD`, 
    );

    data = res?.data?.data;

    return { 
      props: { 
        data: data
      } 
    }
    
  } catch (err) {
    return { 
      props: { 
        data: {}
      } 
    }
  }
}