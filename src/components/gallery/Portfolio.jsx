import React, { Component } from 'react';
import MainCta from '../ctas/MainCta';
import Image from 'next/image';

export default class 
 extends Component {
  render() {
    return (
      <>
        <div className="row mt-4">
          <div className="col-6 col-lg-4 mb-4 mb-lg-0">
            <Image
              src="/assets/pages/index/gallery/1.jpg"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Fully finished bathroom with DEYA Construction in the Netherlands"
              width={3024}
              height={3024}
              sizes="100%"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />

            <Image
              src="/assets/pages/index/gallery/2.jpg"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Toilet renovation with DEYA Construction"
              width={3024}
              height={3024}
              sizes="100%"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>

          <div className="col-6 col-lg-4 mb-4 mb-lg-0">
            <Image
              src="/assets/pages/index/gallery/5.jpg"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Dark and white bathroom inspiration with DEYA Construction"
              width={3024}
              height={3024}
              sizes="100%"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />

            <Image
              src="/assets/pages/index/gallery/6.jpg"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Toilet, bath, tiles, furniture - everything finished in less than 2 weeks by DEYA Construction"
              width={3024}
              height={3024}
              sizes="100%"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>

          <div className="col-6 col-lg-4 mb-4 mb-lg-0 d-none d-lg-inline-block">
            <Image
              src="/assets/pages/index/gallery/3.jpg"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Bright bathroom in Amsterdam, finished by DEYA COnstruction"
              width={3024}
              height={3024}
              sizes="100%"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />

            <Image
              src="/assets/pages/index/gallery/4.jpg"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Toilet, heating and tiles mix by DEYA Construction"
              width={3024}
              height={3024}
              sizes="100%"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>

        </div>

        <div className="mt-4">
          <MainCta justify="center" />
        </div>
      </>
    )
  }
}
