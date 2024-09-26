import { useRouter } from 'next/router';
import React, { Component } from 'react';
import { useIntl } from 'react-intl';

import logoMain from '/public/assets/svg/deya_logo_no_text.svg';
import Image from 'next/image';
import Link from 'next/link';

import { BsWhatsapp } from 'react-icons/bs';
import { FaPhoneFlip } from 'react-icons/fa6';
import { IoMailUnreadOutline } from 'react-icons/io5';
import { poppins } from '@/pages/_app';
import CallMeBack from './pop-ups/CallMeBack';

import { MdReviews } from 'react-icons/md';
import { IoHammer } from 'react-icons/io5';
import { FaGoogle, FaInstagram, FaStar } from 'react-icons/fa';

import { PHONE_NUMBER } from '@/generic/constants';
import { event } from '@/lib/ga';
import Comments from './comments/comments';

class Footer extends Component {
  render() {
    const hideCommentsRoutes = ['/contact'];

    const showComments =
      !hideCommentsRoutes.includes(this.props.router?.asPath) &&
      !this.props.router?.asPath?.startsWith('/budgetplanner');

    return (
      <>
        {showComments ? (
          <section id="ervaringen">
            <Comments />
          </section>
        ) : (
          ''
        )}
        <footer className="py-5 mt-5 bg_lt_grey">
          <div className="container mb-5">
            <div className="row justify-content-center mt-4">
              <div className="col-12">
                <div className="row">
                  <h2 className={`${poppins.className} text_blue`}>
                    {this.props.intl.formatMessage({ id: 'footer.title' })}
                  </h2>
                </div>
                <hr />

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
                        button: 'footer_whatsapp',
                      },
                    });
                  }}
                >
                  <div className="col-12 col-md-6">
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
                  <div className="col-12 col-md-6 d-flex align-items-center mt-3 mt-md-0">
                    <h4 className={`${poppins.className} text_dk_blue`}>
                      {PHONE_NUMBER?.toShow}
                    </h4>
                  </div>
                </a>

                <hr />

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
                        button: 'footer_call',
                      },
                    });
                  }}
                >
                  <div className="col-12 col-md-6">
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
                  <div className="col-12 col-md-6 d-flex align-items-center mt-3 mt-md-0">
                    <h4 className={`${poppins.className} text_dk_blue`}>
                      {PHONE_NUMBER?.toShow}
                    </h4>
                  </div>
                </a>

                <hr />

                <a
                  id="send-email"
                  className="row mt-3 mb-5"
                  href="mailto:info@deya-co.nl"
                >
                  <div className="col-12 col-md-6">
                    <h4 className={poppins.className}>
                      <IoMailUnreadOutline
                        className="flex-shrink-0 me-3"
                        size={24}
                      />
                      {this.props.intl.formatMessage({
                        id: 'footer.emailus.title',
                      })}
                    </h4>
                    <div className="text_dk_blue">
                      {this.props.intl.formatMessage({
                        id: 'footer.emailus.subtl1',
                      })}
                      <br />
                      {this.props.intl.formatMessage({
                        id: 'footer.emailus.subtl2',
                      })}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-center mt-3 mt-md-0">
                    <h4 className={`${poppins.className} text_dk_blue`}>
                      info@deya-co.nl
                    </h4>
                  </div>
                </a>
                <hr />

                <div className="row">
                  <div className="col-12 col-md-2 text-center pb-3">
                    <Link href="/">
                      <Image
                        src={logoMain}
                        alt="DEYA construction logo"
                        priority={true}
                        height={100}
                      />
                    </Link>
                    <hr className="d-block d-md-none" />
                  </div>

                  <div className="col-12 col-md-2 pb-5">
                    <div>
                      <Link href="/">
                        <b>
                          {this.props.intl.formatMessage({
                            id: 'navbar.btn.index',
                          })}
                        </b>
                      </Link>
                    </div>
                    <div className="mt-2">
                      <Link href="/faq">
                        <b>FAQ</b>
                      </Link>
                    </div>
                    <div className="mt-2">
                      <Link href="/about-us">
                        <b>
                          {this.props.intl.formatMessage({
                            id: 'navbar.btn.about_us',
                          })}
                        </b>
                      </Link>
                    </div>
                    <div className="mt-2">
                      <Link href="/contact">
                        <b>
                          {this.props.intl.formatMessage({
                            id: 'footer.links.contact',
                          })}
                        </b>
                      </Link>
                    </div>
                    <div className="mt-2">
                      <Link href="/blog">
                        <b>Blog</b>
                      </Link>
                    </div>
                  </div>

                  <div className="col-12 col-md-3 pb-5">
                    <div>
                      <Link href="/budgetplanner">
                        <b>
                          {this.props.intl.formatMessage({
                            id: 'footer.link.1',
                          })}
                        </b>
                      </Link>
                    </div>
                    <div className="mt-2">
                      <Link href="/">
                        <b>
                          {this.props.intl.formatMessage({
                            id: 'footer.link.2',
                          })}
                        </b>
                      </Link>
                    </div>

                    <div className="mt-4">
                      <Link href="/cookie-policy">
                        <b>
                          {this.props.intl.formatMessage({
                            id: 'footer.link.3',
                          })}
                        </b>
                      </Link>
                    </div>
                  </div>

                  <div className="col-12 col-md-2 pb-5">
                    <div className="text_lt_blue">
                      <b>
                        <MdReviews /> Reviews
                      </b>
                    </div>
                    <div className="mt-2">
                      <a
                        href="https://www.werkspot.nl/profiel/deya"
                        target="_blank"
                      >
                        <FaStar /> Werkspot Reviews - 4,5
                      </a>
                    </div>
                    <div className="mt-2">
                      <a
                        href="https://www.google.com/maps/place/DeYa-Construction/@52.6803594,4.8388545,17z/data=!4m8!3m7!1s0x47cf55cee50e5419:0x3b6dad5981e11838!8m2!3d52.6803562!4d4.8414294!9m1!1b1!16s%2Fg%2F11s34hscwl?entry=ttu"
                        target="_blank"
                      >
                        <FaStar /> Google Reviews - 4,2
                      </a>
                    </div>
                    <div className="mt-2">
                      <a
                        href="https://www.instagram.com/deya_construction_hhw/"
                        target="_blank"
                      >
                        <FaInstagram /> Instagram
                      </a>
                    </div>
                  </div>

                  <div className="col-12 col-md-3 pb-5">
                    <div>
                      <div>
                        <b>DEYA Construction</b>
                      </div>
                      <div>
                        <span className="text_dk_blue fw-bold">KVK: </span>
                        86363972
                      </div>
                      <br />
                      <div>
                        <b>
                          {this.props.intl.formatMessage({
                            id: 'footer.address',
                          })}
                        </b>
                      </div>
                      <a
                        href="https://maps.app.goo.gl/FZgrfZpXFLnJZsBr7"
                        target="_blank"
                      >
                        De Vork 16, <br />
                        1704 BX, Heerhugowaard
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <CallMeBack />
      </>
    );
  }
}

export default (function (props) {
  const router = useRouter();
  const intl = useIntl();
  return <Footer {...props} router={router} intl={intl} />;
});
