import React, { Component } from 'react';

import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { LuPencilRuler } from "react-icons/lu";
import { FaRegCalendarCheck } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { LiaFileContractSolid } from "react-icons/lia";
import { LuBath } from "react-icons/lu";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { PiUserFocusBold } from "react-icons/pi";
import MainCta from './ctas/MainCta';
import { useIntl } from 'react-intl';

export default function FeautureGrid() {
  const intl = useIntl();

  const feautureList = [
    {
      id: "ws0daw89i",
      title: intl.formatMessage({ id: "index.4.pinp.1.head" }),
      body: intl.formatMessage({ id: "index.4.pinp.1.body" }),
      icon: <RiMoneyEuroCircleLine className="text_lt_blue flex-shrink-0 me-3" size={28} />
    },
    {
      id: "df89sdf0",
      title: intl.formatMessage({ id: "index.4.pinp.2.head" }),
      body: intl.formatMessage({ id: "index.4.pinp.2.body" }),
      icon: <LuPencilRuler className="text_lt_blue flex-shrink-0 me-3" size={28} />
    },
    {
      id: "8edauios",
      title: intl.formatMessage({ id: "index.4.pinp.3.head" }),
      body: intl.formatMessage({ id: "index.4.pinp.3.body" }),
      icon: <FaRegCalendarCheck className="text_lt_blue flex-shrink-0 me-3" size={28} />
    },
    {
      id: "637e62wye",
      title: intl.formatMessage({ id: "index.4.pinp.4.head" }),
      body: intl.formatMessage({ id: "index.4.pinp.4.body" }),
      icon: <IoMdTime className="text_lt_blue flex-shrink-0 me-3" size={28} />
    },
    {
      id: "e98r8deai",
      title: intl.formatMessage({ id: "index.4.pinp.5.head" }),
      body: intl.formatMessage({ id: "index.4.pinp.5.body" }),
      icon: <LiaFileContractSolid className="text_lt_blue flex-shrink-0 me-3" size={28} />
    },
    {
      id: "asdoq9wd",
      title: intl.formatMessage({ id: "index.4.pinp.6.head" }),
      body: intl.formatMessage({ id: "index.4.pinp.6.body" }),
      icon: <LuBath className="text_lt_blue flex-shrink-0 me-3" size={28} />
    },
    {
      id: "9d8dio0ad",
      title: intl.formatMessage({ id: "index.4.pinp.7.head" }),
      body: intl.formatMessage({ id: "index.4.pinp.7.body" }),
      icon: <LiaPeopleCarrySolid className="text_lt_blue flex-shrink-0 me-3" size={28} />
    },
    {
      id: "asda9daidi",
      title: intl.formatMessage({ id: "index.4.pinp.8.head" }),
      body: intl.formatMessage({ id: "index.4.pinp.8.body" }),
      icon: <PiUserFocusBold className="text_lt_blue flex-shrink-0 me-3" size={28} />
    }
  ];

  return (
    <>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
        {
          feautureList.map((item) => (
            <div className="col d-flex align-items-start" key={item?.id}>
              {item?.icon}
              <div>
                <h4 className="fw-bold mb-0 text_blue">
                  {item?.title}
                </h4>
                <p className="mt-3">
                  {item?.body}
                </p>
              </div>
            </div>
          ))
        }
      </div>
      <div className="mt-4">
        <MainCta justify="center" />
      </div>
    </>

  )
}
