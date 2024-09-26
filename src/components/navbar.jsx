import React, { Component } from 'react';

import logoMain from '/public/assets/svg/deya_logo_no_text.svg';
// import logoHeadMobile from "/public/assets/svg/deya_logo_svg.svg";

import bars from '/public/assets/svg/icons/menu-bars.svg';
import closeBtn from '/public/assets/svg/icons/close-sm.svg';

import Image from 'next/image';
import Link from 'next/link';
import { FormattedMessage, useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { poppins, quicksand } from '@/pages/_app';
import { FaGoogle, FaInstagram, FaStar } from 'react-icons/fa';
import { IoHammer } from 'react-icons/io5';

import LanguageSwitch from './lang-switch';
import { PHONE_NUMBER } from '@/generic/constants';
import { FaPhoneFlip } from 'react-icons/fa6';
import { BsWhatsapp } from 'react-icons/bs';
import { event } from '@/lib/ga';

const initialState = {
  mobileNavOpened: false,
};

class Navbar extends Component {
  state = initialState;

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.mobileNavOpened !== prevState?.mobileNavOpened) {
      if (this.state.mobileNavOpened) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'visible';
      }
    }
  };

  toggleMenuNav = (clickEvent) => {
    if (clickEvent === 'MENU_ITEM' && !this.state.mobileNavOpened) {
      return;
    }

    this.setState({
      ...this.state,
      mobileNavOpened: !this.state.mobileNavOpened,
    });
  };

  render() {
    const indexClass = this.props.router?.pathname !== '/' ? 'text_blue' : '';
    const faqClass = this.props.router?.pathname !== '/faq' ? 'text_blue' : '';
    const aboutUsClass =
      this.props.router?.pathname !== '/about-us' ? 'text_blue' : '';
    const contactClass =
      this.props.router?.pathname !== '/contact' ? 'text_blue' : '';
    const blogClass =
      this.props.router?.pathname !== '/blog' ? 'text_blue' : '';

    return (
      <>
        <header className={quicksand.className}>
          {/* Desktop menu */}
          <div
            className={`d-none d-xl-block container-fluid desktop_menu bg_lt_grey pb-2`}
            style={{
              borderBottom: '3px solid #0A13BF',
            }}
          >
            <div className="d-flex justify-content-center">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-2 text-center">
                    <Link href="/">
                      <Image
                        src={logoMain}
                        alt="DEYA construction logo"
                        priority={true}
                        width={100}
                      />
                    </Link>
                  </div>
                  <div className="col-9">
                    <div className="d-flex">
                      <div>
                        <Link href="/" className={`fs-5 fw-bold ${indexClass}`}>
                          {this.props.intl.formatMessage({
                            id: 'navbar.btn.index',
                          })}
                        </Link>
                      </div>

                      <div className="ms-5">
                        <Link
                          href="/faq"
                          className={`fs-5 fw-bold ${faqClass}`}
                        >
                          FAQ
                        </Link>
                      </div>

                      <div className="ms-5">
                        <Link
                          href="/about-us"
                          className={`fs-5 fw-bold ${aboutUsClass}`}
                        >
                          {this.props.intl.formatMessage({
                            id: 'navbar.btn.about_us',
                          })}
                        </Link>
                      </div>

                      <div className="ms-5">
                        <Link
                          href="/contact"
                          className={`fs-5 fw-bold ${contactClass}`}
                        >
                          Contact
                        </Link>
                      </div>

                      <div className="ms-5">
                        <Link
                          href="/blog"
                          className={`fs-5 fw-bold ${blogClass}`}
                        >
                          Blog
                        </Link>
                      </div>

                      <div className="ms-auto">
                        <a
                          href="https://www.google.com/maps/place/DeYa-Construction/@52.6803594,4.8388545,17z/data=!4m8!3m7!1s0x47cf55cee50e5419:0x3b6dad5981e11838!8m2!3d52.6803562!4d4.8414294!9m1!1b1!16s%2Fg%2F11s34hscwl?entry=ttu"
                          target="_blank"
                          className="text_blue"
                        >
                          <FaGoogle size={24} />
                        </a>
                      </div>
                      <div className="ms-3">
                        <a
                          href="https://www.werkspot.nl/profiel/deya"
                          target="_blank"
                          className="text_blue"
                        >
                          <IoHammer size={24} />
                        </a>
                      </div>
                      <div className="ms-3">
                        <a
                          href="https://www.instagram.com/deya_construction_hhw/"
                          target="_blank"
                          className="text_blue"
                        >
                          <FaInstagram size={24} />
                        </a>
                      </div>

                      <div className="ms-5">
                        <LanguageSwitch />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`position-fixed top-0 d-block pb-3 d-xl-none container-fluid bg_lt_grey`}
            style={{
              borderBottom: '3px solid #0A13BF',
              zIndex: 9,
            }}
          >
            <div className="row align-items-center">
              <div className="col-4 pt-3">
                <div className="ms-auto">
                  <LanguageSwitch />
                </div>
              </div>
              <div className="col-4 text-center" style={{ paddingTop: 8 }}>
                <Link href="/">
                  <Image
                    src={logoMain}
                    alt="DEYA construction logo"
                    priority={true}
                    width={75}
                  />
                </Link>
              </div>
              <div className="col-4 pt-3 text-end">
                <button className="btn" onClick={() => this.toggleMenuNav()}>
                  {this.state.mobileNavOpened ? (
                    <Image src={closeBtn} alt="close menu" width={30} />
                  ) : (
                    <Image src={bars} alt="open menu" width={30} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile navigation */}
          <div
            className={`container-fluid ${
              this.state.mobileNavOpened ? 'd-flex' : 'd-none'
            }`}
            style={{
              position: 'fixed',
              overflow: 'auto',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '255, 255, 255, 0.4',
              backdropFilter: 'blur(2px)',
              justifyContent: 'center',
              zIndex: 999,
            }}
          >
            <div
              className="mobile_menu_card mt-5 px-3 pb-5"
              style={{
                overflowY: 'scroll',
                overflowX: 'hide',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <div className="">
                <div className="row pt-3">
                  <div className="col-6"></div>
                  <div className="col-6 text-end pt-4 pe-4">
                    <button
                      className="btn"
                      onClick={() => this.toggleMenuNav()}
                    >
                      <Image src={closeBtn} alt="close menu" width={30} />
                    </button>
                  </div>
                </div>

                <div className="row justify-content-center pb-5">
                  <div className="col-12 text-center px-5">
                    <Link
                      href="/"
                      onClick={() => this.toggleMenuNav('MENU_ITEM')}
                    >
                      <Image
                        src={logoMain}
                        alt="DEYA construction logo"
                        priority={true}
                        height={80}
                      />
                    </Link>
                  </div>
                </div>

                <div className="row pt-4 text-center">
                  <Link
                    href="/"
                    className={`fs-5 fw-bold ${indexClass}`}
                    onClick={() => this.toggleMenuNav('MENU_ITEM')}
                  >
                    {this.props.intl.formatMessage({ id: 'navbar.btn.index' })}
                  </Link>
                </div>
                <hr />

                <div className="row pt-4 text-center">
                  <a
                    href="/budgetplanner"
                    target="_blank"
                    className={`fs-5 fw-bold text_blue`}
                    onClick={() => this.toggleMenuNav('MENU_ITEM')}
                  >
                    {this.props.intl.formatMessage({
                      id: 'navbar.btn.calculate',
                    })}
                  </a>
                </div>
                <hr />

                <div className="row pt-4 text-center">
                  <Link
                    href="/faq"
                    className={`fs-5 fw-bold ${faqClass}`}
                    onClick={() => this.toggleMenuNav('MENU_ITEM')}
                  >
                    FAQ
                  </Link>
                </div>
                <hr />

                <div className="row pt-4 text-center">
                  <Link
                    href="/about-us"
                    className={`fs-5 fw-bold ${aboutUsClass}`}
                    onClick={() => this.toggleMenuNav('MENU_ITEM')}
                  >
                    {this.props.intl.formatMessage({
                      id: 'navbar.btn.about_us',
                    })}
                  </Link>
                </div>
                <hr />

                <div className="row pt-4 text-center">
                  <Link
                    href="/contact"
                    className={`fs-5 fw-bold ${contactClass}`}
                    onClick={() => this.toggleMenuNav('MENU_ITEM')}
                  >
                    Contact
                  </Link>
                </div>
                <hr />
                <div className="row pt-4 text-center">
                  <Link
                    href="/blog"
                    className={`fs-5 fw-bold ${blogClass}`}
                    onClick={() => this.toggleMenuNav('MENU_ITEM')}
                  >
                    Blog
                  </Link>
                </div>
                <hr />
                <div className="text-center pt-4 fs-5 fw-bold">
                  {this.props.intl.formatMessage({ id: 'navbar.title.media' })}
                </div>
                <div className="row pt-4 text-center">
                  <div className="col-3"></div>
                  <div className="col-2">
                    <a
                      href="https://www.google.com/maps/place/DeYa-Construction/@52.6803594,4.8388545,17z/data=!4m8!3m7!1s0x47cf55cee50e5419:0x3b6dad5981e11838!8m2!3d52.6803562!4d4.8414294!9m1!1b1!16s%2Fg%2F11s34hscwl?entry=ttu"
                      target="_blank"
                    >
                      <FaGoogle size={24} />
                    </a>
                  </div>
                  <div className="col-2">
                    <a
                      href="https://www.werkspot.nl/profiel/deya"
                      target="_blank"
                    >
                      <IoHammer size={24} />
                    </a>
                  </div>
                  <div className="col-2">
                    <a
                      href="https://www.instagram.com/deya_construction_hhw/"
                      target="_blank"
                    >
                      <FaInstagram size={24} />
                    </a>
                  </div>
                  <div className="col-3"></div>
                </div>

                <hr />
                <div className="row pt-4 text-center">
                  <a
                    id="phone-call"
                    className="row mt-3 mb-5"
                    href={`tel:+${PHONE_NUMBER?.toCall}`}
                    onClick={() => {
                      event({
                        action: 'conversion',
                        params: {
                          send_to: 'AW-16544777349/czp0CI_wi7AZEIWJldE9',
                          event_callback: this.props.router?.asPath,
                          button: 'navbar_call',
                        },
                      });
                    }}
                  >
                    <div className="col-12">
                      <h4 className={poppins.className}>
                        <FaPhoneFlip className="flex-shrink-0 me-3" size={24} />
                        {this.props.intl.formatMessage({
                          id: 'footer.callus.title',
                        })}
                      </h4>
                      <div className="text_dk_blue">
                        {this.props.intl.formatMessage({
                          id: 'footer.callus.subtl1',
                        })}
                        <br />
                        {this.props.intl.formatMessage({
                          id: 'footer.callus.subtl2',
                        })}
                      </div>
                    </div>
                    <div className="col-12 text-center mt-3 mt-md-0">
                      <h4 className={`${poppins.className} text_dk_blue`}>
                        {PHONE_NUMBER?.toShow}
                      </h4>
                    </div>
                  </a>
                </div>

                <hr />
                <div className="row pt-4 text-center">
                  <a
                    id="whatsapp-message"
                    className="row mt-3 mb-5"
                    href={`https://wa.me/${PHONE_NUMBER?.toCall}`}
                    target="_blank"
                    onClick={() => {
                      event({
                        action: 'conversion',
                        params: {
                          send_to: 'AW-16544777349/czp0CI_wi7AZEIWJldE9',
                          event_callback: this.props.router?.asPath,
                          button: 'navbar_whatsapp',
                        },
                      });
                    }}
                  >
                    <div className="col-12">
                      <h4 className={`${poppins.className}`}>
                        <BsWhatsapp className="flex-shrink-0 me-3" size={24} />
                        WhatApp
                      </h4>
                      <div className="text_dk_blue">
                        {this.props.intl.formatMessage({
                          id: 'footer.whatsapp.subtl',
                        })}
                      </div>
                    </div>
                    <div className="col-12 text-center mt-3 mt-md-0">
                      <h4 className={`${poppins.className} text_dk_blue`}>
                        {PHONE_NUMBER?.toShow}
                      </h4>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}

export default (function (props) {
  const router = useRouter();
  const intl = useIntl();
  return <Navbar {...props} router={router} intl={intl} />;
});
