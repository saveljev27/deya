import React, { Component } from 'react';

import logo from "../../public/assets/svg/deya_logo_no_text.svg"
import Image from 'next/image';
import MainCta from './ctas/MainCta';
import { poppins } from '@/pages/_app';
import { useIntl } from 'react-intl';

import { FaStar  } from "react-icons/fa";

export default function Hero () {
  const intl = useIntl();

  return (
    <>
      <div className="pt-5 d-flex flex-wrap bg_lt_grey">
        <div className="col-12">
          <h1 className={`${poppins.className} fw-bold text_blue text-center`}>DEYA construction</h1>
        </div>
        <div className="col-12 container-fluid">
          <p className="lead text-center">
            {intl.formatMessage({ id: "index.hero.subt.1" })} <br className="d-block d-md-none"/>
            {intl.formatMessage({ id: "index.hero.subt.2" })}
          </p>
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-7">
              <p className="">
                {intl.formatMessage({ id: "index.hero.body" })}
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="col-12">
            <MainCta justify="center" />
          </div>
        </div>
        <div className="pb-4"></div>
      </div>
      <div className="container bg_lt_grey py-5">
        <div className="row mb-4 mb-lg-5 justify-content-lg-between">
          <div className="col-3 col-md-1 col-lg-2 d-none d-md-flex align-items-center">
            <div className="lc-block bg_lt_blue ratio ratio-1x1"> </div>
          </div>
          <div className="col-4 col-md-3 col-lg-2 d-flex flex-column justify-content-between">
            <div className="lc-block ratio ratio-1x1" style={{backgroundColor: "#E2E2E2"}}>
              {/* <div className="row justify-content-center align-items-center text-white">
                <a 
                  href="https://www.werkspot.nl/profiel/deya" 
                  target='_blank'
                  className='text-center'
                >
                  Werkspot - 4,5
                </a>
                <hr />
                <a 
                  href="https://www.google.com/maps/place/DeYa-Construction/@52.6803594,4.8388545,17z/data=!4m8!3m7!1s0x47cf55cee50e5419:0x3b6dad5981e11838!8m2!3d52.6803562!4d4.8414294!9m1!1b1!16s%2Fg%2F11s34hscwl?entry=ttu"
                  target='_blank'
                  className='text-center'
                >
                  Google - 4,2
                </a>
              </div> */}
            </div>
            <div className="lc-block">
              <Image
                src="/assets/pages/index/bathroom_1.jpg"
                alt="Shower and bathroom after DEYA Construction renovation in Amsterdam"
                width={512}
                height={512}
                sizes="100%"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </div>
          <div className="col-4 col-md-4 col-lg-3">
            <Image
              src="/assets/pages/index/bathroom_3_v1.jpg"
              alt="Mirror, furniture and sinks in bathroom after DEYA Construction work in Alkmaar"
              width={512}
              height={1032}
              sizes="100%"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
          <div className="col-4 col-md-3 col-lg-2 d-flex flex-column justify-content-between">
            <div className="lc-block">
              <Image
                src="/assets/pages/index/bathroom_2.jpg"
                alt="Mirror, furniture and tiles in the bathroom after DEYA Construction renovation in Haarlem"
                width={512}
                height={512}
                sizes="100%"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className="lc-block ratio ratio-1x1" style={{backgroundColor: "#E2E2E2"}}>
              <Image
                src={logo}
                alt="DEYA logo"
              />
            </div>
          </div>
          <div className="col-3 col-md-1 col-lg-2 d-none d-md-flex  align-items-center">
            <div className="lc-block bg_lt_blue ratio ratio-1x1">
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
