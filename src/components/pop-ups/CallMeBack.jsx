import React, { Component } from 'react';
import Image from 'next/image';

import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import { closeFeedbackForm } from '@/actions/screen-activities';

import closeBtn from "/public/assets/svg/icons/close-sm_white.svg";
import axios from "axios";
import toast from 'react-hot-toast';
import getConfig from 'next/config';
import { LOCAL_USER_BUDGET_DATA } from '@/generic/constants';
import { useIntl } from 'react-intl';
import { event } from '@/lib/ga';

const { publicRuntimeConfig } = getConfig();
const { baseApiUrl } = publicRuntimeConfig.api;

const initialState = {
  type: "calculation",
  full_name: "",
  phone: "",
  email: "",
  // message: ""
}

class CallMeBack extends Component {
  state = initialState;

  onSubmit = async (e) => {
    e.preventDefault();
    
    if (!this.isFormValid()) {
      return;
    }

    let location = "";
    try {
      const loc = await axios
        .get('https://get.geojs.io/v1/ip/geo.json');
      location = `${loc?.data?.city}, ${loc?.data?.region}, ${loc?.data?.latitude}, ${loc?.data?.longitude}`;
    } catch (err) {
      console.log(err);
    }

    // This is planning form
    const budgetplanner = this.props.router?.asPath?.startsWith("/budgetplanner");
    if (budgetplanner) {

      try {
        const { status, data } = await axios
          .post(
            `${baseApiUrl}/items/web_calculations`, 
            {
              location,
              locale: this.props.router?.locale,
              full_name: this.state?.full_name,
              phone: this.state?.phone,
              email: this.state?.email,
            }
          );
   
        if (status >= 200 && status <= 299) {
          toast.success("Thank you. Now, You can start planning your bathroom work budget.", {
            duration: 7000,
            icon: '👏'
          });

          localStorage.setItem(
            LOCAL_USER_BUDGET_DATA,
            JSON.stringify({
              id: data?.data?.id, 
              ...this.state
            })
          );

          event({ 
            action: "conversion_event_submit_lead_form", 
            params: {
              'event_callback': this.props.router?.asPath
            }
          });
          
          this.setState({...initialState});
          return this.props.closeFeedbackForm();
        }
        
      } catch (err) {
        console.log(err);
        toast.error("Sorry. Something went wrong, please contact us, or try again later.")
      }

      return this.props.closeFeedbackForm();
    }

    // This is just contact form
    try {
      const { status } =  await axios
        .post(`${baseApiUrl}/items/client_requests`, {
          ...this.state,
          location,
          locale: this.props.router?.locale
        });

      if (status >= 200 && status <= 299) {
        event({ 
          action: "conversion_event_contact", 
          params: {
            // 'send_to': 'AW-16483611706/QPLOCMXc15oZELro_7M9',
            'event_callback': this.props.router?.asPath
          }
        });

        toast.success("Thank you. Our manager will call you back ASAP.", {
          duration: 7000,
          icon: '👏'
        });
        this.setState({...initialState});
        return this.props.closeFeedbackForm();
      }
      
    } catch (err) {
      console.log(err);
      toast.error("Sorry. Something went wrong, please contact us, or try again later.")
    }
  }

  isFormValid = () => {
    if(!this.state.full_name) {
      toast.error("Please fill in your full name");
      return false;
    }

    if(!this.state.phone) {
      toast.error("Please fill in your phone number");
      return false;
    }

    if(!this.state.email) {
      toast.error("Please fill in your email");
      return false;
    }

    return true;
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }


  render() {
    if (!this.props.screenActivities?.feedbackFormOpened) { 
      return (
        <></>
      )
    }

    const budgetplanner = this.props.router?.asPath?.startsWith("/budgetplanner");

    if (budgetplanner) {
      return (
        <div 
          className={`container-fluid`}
          style={{
            position: "fixed", 
            overflow: "auto",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            zIndex: 1001
          }}
        >
          {/* TODO: Fix scroll on horisontal mobile screen */}
          <div className="min-vh-100 d-flex flex-column">
            <div className="row min-vh-100 justify-content-center">
              <div className="col-11 col-md-6 m-3 m-md-5 px-3 px-md-5 bg_dk_blue">
                <div className="text-end py-5">
                  {/* <button 
                    className="btn"
                    onClick={() => this.props.closeFeedbackForm()}
                  >
                    <Image
                      src={closeBtn}
                      width={58}
                      alt="navigation"
                    />
                  </button> */}
                </div>
                
                <div className="row">
                  <div className="col-12 col-md-2"></div>
                  <div className="col-12 col-md-8">
                    <div>
                      <h2 className="text-white">
                        {this.props.intl.formatMessage({ id: "planner.form.1.header" })}
                      </h2>
                    </div>
                    <div className="text-white pt-2">
                      {this.props.intl.formatMessage({ id: "planner.form.1.subtl" })}
                    </div>
  
                    <form onSubmit={this.onSubmit}>
                      <div className="mt-3 text-white">
                        <label className="form-label">
                          {this.props.intl.formatMessage({ id: "planner.form.1.input.1.label" })}
                        </label>
                        <input 
                          name="full_name"
                          type="text" 
                          className="form-control" 
                          placeholder={this.props.intl.formatMessage({ id: "planner.form.1.input.1.placeholder" })}
                          value={this.state.full_name}
                          onChange={(e) => this.handleChange(e)}
                          required={true}
                        />
                      </div>
  
                      <div className="mt-4 text-white">
                        <label className="form-label">
                          {this.props.intl.formatMessage({ id: "planner.form.1.input.2.label" })}
                        </label>
                        <input 
                          name="phone"
                          type="text" 
                          className="form-control" 
                          placeholder={this.props.intl.formatMessage({ id: "planner.form.1.input.2.placeholder" })}
                          value={this.state.phone}
                          onChange={(e) => this.handleChange(e)}
                          required={true}
                        />
                      </div>
  
                      <div className="mt-4 text-white">
                        <label className="form-label">
                          {this.props.intl.formatMessage({ id: "planner.form.1.input.3.label" })}
                        </label>
                        <input 
                          name="email"
                          type="email" 
                          className="form-control" 
                          placeholder={this.props.intl.formatMessage({ id: "planner.form.1.input.3.placeholder" })}
                          value={this.state.email}
                          onChange={(e) => this.handleChange(e)}
                          required={true}
                        />
                      </div>

                      <div className="text-white pt-5">
                        {this.props.intl.formatMessage({ id: "planner.form.1.subtl2" })}
                      </div>
  
                      <div className="mt-3 mb-5 text-white d-grid">
                        <button className="btn btn-light" type="submit">
                          {this.props.intl.formatMessage({ id: "planner.form.1.input.btn" })}
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-12 col-md-2 col-xl-3"></div>
                </div>
  
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div 
        className={`container-fluid`}
        style={{
          position: "fixed", 
          overflow: "auto",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          zIndex: 1001
        }}
      >
        <div className="min-vh-100 d-flex flex-column">
          <div className="row min-vh-100 justify-content-center">
            <div className="col-11 m-3 m-md-5 px-3 px-md-5 bg_dk_blue">
              <div className="text-end pt-3">
                <button 
                  className="btn"
                  onClick={() => this.props.closeFeedbackForm()}
                >
                  <Image
                    src={closeBtn}
                    width={58}
                    alt="navigation"
                  />
                </button>
              </div>
              
              <div className="row">
                <div className="col-12 col-md-2 col-xl-3"></div>
                <div className="col-12 col-md-8 col-xl-6">
                  <div>
                    <h2 className="text-white">
                      {this.props.intl.formatMessage({ id: "contact.form.header" })}
                    </h2>
                  </div>
                  <div className="text-white pt-3">
                    {this.props.intl.formatMessage({ id: "contact.form.line1" })}
                    {/* <br /> */}
                    {/* <br /> */}
                    {/* {this.props.intl.formatMessage({ id: "contact.form.line2" })} */}
                  </div>

                  <form onSubmit={this.onSubmit}>
                    <div className="mt-4 text-white">
                      <label className="form-label">
                        {this.props.intl.formatMessage({ id: "contact.form.input.1.label" })}
                      </label>
                      <input 
                        name="full_name"
                        type="text" 
                        className="form-control" 
                        placeholder={this.props.intl.formatMessage({ id: "contact.form.input.1.placeholder" })}
                        value={this.state.full_name}
                        onChange={(e) => this.handleChange(e)}
                        required={true}
                      />
                    </div>

                    <div className="mt-4 text-white">
                      <label className="form-label">
                        {this.props.intl.formatMessage({ id: "contact.form.input.2.label" })}
                      </label>
                      <input 
                        name="phone"
                        type="text" 
                        className="form-control" 
                        placeholder={this.props.intl.formatMessage({ id: "contact.form.input.2.placeholder" })}
                        value={this.state.phone}
                        onChange={(e) => this.handleChange(e)}
                        required={true}
                      />
                    </div>

                    <div className="mt-4 text-white">
                      <label className="form-label">
                        {this.props.intl.formatMessage({ id: "contact.form.input.3.label" })}
                      </label>
                      <input 
                        name="email"
                        type="email" 
                        className="form-control" 
                        placeholder={this.props.intl.formatMessage({ id: "contact.form.input.3.placeholder" })}
                        value={this.state.email}
                        onChange={(e) => this.handleChange(e)}
                        required={true}
                      />
                    </div>

                    <div className="mt-4 text-white">
                      {/* <label className="form-label">
                        {this.props.intl.formatMessage({ id: "contact.form.input.4.label" })}
                      </label>
                      <textarea 
                        name="message"
                        type="textarea" 
                        className="form-control" 
                        placeholder={this.props.intl.formatMessage({ id: "contact.form.input.4.placeholder" })}
                        value={this.state.message}
                        onChange={(e) => this.handleChange(e)}
                        rows="6" 
                      ></textarea> */}
                      {/* TODO: Continue in Directus */}
                      {/* , {{ $trigger.payload.message }} */}
                    </div>

                    <div className="my-5 text-white d-grid">
                      <button className="btn btn-light" type="submit">
                        {this.props.intl.formatMessage({ id: "contact.form.input.btn" })}
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-12 col-md-2 col-xl-3"></div>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    screenActivities: state.screenActivities
  }
}

export default connect(mapStateToProps, {
  closeFeedbackForm
})((props) => {
  const router = useRouter();
  const intl = useIntl();

  return <CallMeBack {...props} router={router} intl={intl} />
});