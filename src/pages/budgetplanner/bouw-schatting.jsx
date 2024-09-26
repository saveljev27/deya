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

  // TODO: Add proper way of sending data to our own BE or CRM
  componentDidMount = async () => {
    if (!this.props?.budgetPlanner?.planning?.electricityType) {
      this.props.router.push("/budgetplanner/tegels");
    }

    event({ 
      action: "conversion_event_begin_checkout", 
      params: {
        'event_callback': this.props.router?.asPath,
        ...this.props.budgetPlanner
      }
    });

    const localUser = localStorage.getItem(LOCAL_USER_BUDGET_DATA);
    const parsedUser = JSON.parse(localUser);
    // console.log(parsedUser);
    if (!parsedUser) {      
      return toast.success(this.props.intl.formatMessage({ id: "planner.finish.success.1" }), {
        duration: 7000,
        icon: '👏'
      });
    }

    const id = parsedUser?.id;
    if (!id) {
      return;
    }
    try {
      const { status } =  await axios
        .patch(
          `${baseApiUrl}/items/web_calculations/${id}`, 
          {
            ...this.props.budgetPlanner?.planning,
            total: this.props.budgetPlanner?.total,
            locale: this.props.router?.locale
          }
      );

      if (status >= 200 && status <= 299) {
        toast.success(this.props.intl.formatMessage({ id: "planner.finish.success.1" }), {
          duration: 7000,
          icon: '👏'
        });
      }
      
    } catch (err) {
      console.log(err);
      // toast.error("Sorry. Something went wrong, please contact us, or try again later."
    }
  }

  printPageArea = (areaID) => {
    var printContent = document.getElementById(areaID).innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
  }

  render() {
    const withoutVAT = (+this.props.budgetPlanner?.total / 1.21).toFixed(2);
    const VAT = (this.props.budgetPlanner?.total - withoutVAT).toFixed(2);

    return (
      <>
        <Head>
          <title>
            {this.props.intl.formatMessage({ id: "planner.finish.meta.title" })}
          </title>
          <meta name="description" content={this.props.intl.formatMessage({ id: "planner.finish.meta.description" })} />
        </Head>
        <Navbar />
        <main className="min-vh-100">
          <section className="container">
            <div className="row justify-content-center mt-3 mt-md-5">
              <div className="col-12 col-md-8" id="print-area">
                <div className="row">
                  <h2>
                    {this.props.intl.formatMessage({ id: "planner.finish.title" })}
                  </h2>
                </div>
                <hr />

                <div className="my-4">
                {this.props.intl.formatMessage({ id: "planner.finish.contact.title" })}<br />
                  <br />
                  {this.props.intl.formatMessage({ id: "planner.finish.contact.email" })}: info@deya-co.nl<br />
                  {this.props.intl.formatMessage({ id: "planner.finish.contact.call" })}: +31 (0) 63 367 8141<br />
                  {this.props.intl.formatMessage({ id: "planner.finish.contact.whatsapp" })}: +31 (0) 63 367 8141<br />
                </div>
                <hr />

                <div className="row">
                  <div className="col-12 col-md-6">
                    <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.1" })}</h4>
                    <h5>
                      {
                        (this.props?.budgetPlanner?.planning?.bathSelected) ? (
                          <>{TEXT_TAGS[this.props.router?.locale][this.props?.budgetPlanner?.planning?.bathType]}</>
                        ) : (
                          <>{this.props.intl.formatMessage({ id: "planner.finish.no" })}</>
                        )
                      }
                    </h5>
                  </div>
                  <div className="col-12 col-md-6">
                    <h3 className="pt-4">
                      {this.props?.budgetPlanner?.planning?.bathPrice} EUR
                    </h3>
                  </div>
                </div>
                <hr />

                <div className="row mt-4">
                  <div className="col-12 col-md-6">
                    <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.2" })}</h4>
                    <h5>
                      {
                        (this.props?.budgetPlanner?.planning?.showerSelected) ? (
                          <>{TEXT_TAGS[this.props.router?.locale][this.props?.budgetPlanner?.planning?.showerType]}</>
                        ) : (
                          <>{this.props.intl.formatMessage({ id: "planner.finish.no" })}</>
                        )
                      }
                    </h5>
                  </div>
                  <div className="col-12 col-md-6">
                    <h3 className="pt-4">
                      {this.props?.budgetPlanner?.planning?.showerPrice} EUR
                    </h3>
                  </div>
                </div>
                <hr />

                <div className="row">
                    <div className="col-12 col-md-6">
                      <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.3" })}</h4>
                      <h5>
                        {TEXT_TAGS[this.props.router?.locale][this.props?.budgetPlanner?.planning?.demolitionWorkType]}
                      </h5>
                    </div>
                    <div className="col-12 col-md-6">
                      <h3 className="pt-4">
                        {this.props?.budgetPlanner?.planning?.demolitionWorkPrice} EUR
                      </h3>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.4" })}</h4>
                      <h5>
                        {TEXT_TAGS[this.props.router?.locale][this.props?.budgetPlanner?.planning?.bathFurnitureType]}
                      </h5>
                    </div>
                    <div className="col-12 col-md-6">
                      <h3 className="pt-4">
                        {this.props?.budgetPlanner?.planning?.bathFurniturePrice} EUR
                      </h3>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.5" })}</h4>
                      <h5>
                        {TEXT_TAGS[this.props.router?.locale][this.props?.budgetPlanner?.planning?.bathroomHeatingType]}
                      </h5>
                    </div>
                    <div className="col-12 col-md-6">
                      <h3 className="pt-4">
                        {this.props?.budgetPlanner?.planning?.bathroomHeatingPrice} EUR
                      </h3>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.6" })}</h4>
                      <h5>
                        {TEXT_TAGS[this.props.router?.locale][this.props?.budgetPlanner?.planning?.electricityType]}
                      </h5>
                    </div>
                    <div className="col-12 col-md-6">
                      <h3 className="pt-4">
                        {this.props?.budgetPlanner?.planning?.electricityPrice} EUR
                      </h3>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.7" })}</h4>
                      <h5>
                        {TEXT_TAGS[this.props.router?.locale][this.props?.budgetPlanner?.planning?.plumberType]}
                      </h5>
                    </div>
                    <div className="col-12 col-md-6">
                      <h3 className="pt-4">
                        {this.props?.budgetPlanner?.planning?.plumberPrice} EUR
                      </h3>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.8" })}</h4>
                      <h5>
                        {TEXT_TAGS[this.props.router?.locale][this.props?.budgetPlanner?.planning?.toiletType]}
                      </h5>
                    </div>
                    <div className="col-12 col-md-6">
                      <h3 className="pt-4">
                        {this.props?.budgetPlanner?.planning?.toiletPrice} EUR
                      </h3>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h4>{this.props.intl.formatMessage({ id: "planner.finish.selected.9" })}</h4>
                      <h5>
                        {TEXT_TAGS[this.props.router?.locale][this.props?.budgetPlanner?.planning?.tilesType]}
                      </h5>
                    </div>
                    <div className="col-12 col-md-6">
                      <h3 className="pt-4">
                        {this.props?.budgetPlanner?.planning?.tilesTotalPrice} EUR
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
                        {this.props?.budgetPlanner?.planning?.m2} m2
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
                        {this.props?.budgetPlanner?.planning?.bathRoomFloorM2} m2
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
                        {VAT} EUR
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
                        {withoutVAT} EUR
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
                        {this.props.budgetPlanner?.total} EUR
                      </h3>
                    </div>
                  </div>

                
              </div>

              <div className="col-12 col-md-4 mt-5 mt-md-0">
                <div className="row bg_dk_blue text-white px-3 py-5">
                  <h2>{this.props.intl.formatMessage({ id: "planner.finish.pinp.title" })}</h2>
                  <ul className="ps-2 mt-3 list-group">
                    <li className="list-group-item bg_dk_blue text-white">
                      {this.props.intl.formatMessage({ id: "planner.finish.pinp.1" })}
                    </li>
                    <li className="list-group-item bg_dk_blue text-white">
                      {this.props.intl.formatMessage({ id: "planner.finish.pinp.2" })}
                    </li>
                    <li className="list-group-item bg_dk_blue text-white">
                      {this.props.intl.formatMessage({ id: "planner.finish.pinp.3" })}
                    </li>
                  </ul>
                </div>

                <h3 className="mt-4">{this.props.intl.formatMessage({ id: "planner.finish.cta.email" })}</h3>
                <button 
                  className="btn btn-primary mt-3 px-3"
                  onClick={() => {
                    // TODO: Send calculation to an email
                  }}
                >
                  <MdOutlineEmail />{' '}
                  {this.props.intl.formatMessage({ id: "planner.finish.cta.btn.email" })}
                </button>

                <button 
                  className="btn btn-primary mt-3 ms-2 px-3"
                  onClick={() => {
                    this.printPageArea("print-area");
                  }}
                >
                  <LuPrinter />{' '}
                  {this.props.intl.formatMessage({ id: "planner.finish.cta.btn.print" })}
                </button>

                <h4 className="mt-5">{this.props.intl.formatMessage({ id: "planner.finish.advice.title" })}</h4>
                <div className="mt-3">
                  {this.props.intl.formatMessage({ id: "planner.finish.advice.body" })}
                </div>

                <div className="mt-4 mb-2">
                  <a 
                    href="https://calendly.com/deyaconstruction/afspraak-meten" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary px-3"
                    onClick={() => {
                      event({ 
                        action: "conversion_event_book_appointment", 
                        params: {
                          'event_callback': this.props.router?.asPath,
                          'event_timeout': 2000,
                        }
                      });
                    }}
                  >
                    <MdCalendarMonth />{" "}
                    {this.props.intl.formatMessage({ id: "planner.finish.cta.appointment" })}
                  </a>
                </div>

                <div>
                  {this.props.intl.formatMessage({ id: "planner.finish.cta.appointment.subtl" })}
                </div>
              </div>

            </div>
          </section>

          <section className="container my-5">
            <div className="row justify-content-center">
              <div className="col text-end">
                <Link
                  className="btn btn-lg btn-primary"
                  href="/budgetplanner/tegels"
                >
                  {this.props.intl.formatMessage({ id: "planner.btn.back" })}
                </Link>
              </div>
              <div className="col ps-3"> 
                {/* <button className="btn btn-lg btn-primary" onClick={() => this.moveToTheNextStep()}>
                  Volgende
                </button> */}
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