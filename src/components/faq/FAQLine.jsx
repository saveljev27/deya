import Image from 'next/image';
import React, { Component } from 'react';

import plusIcon from '/public/assets/svg/icons/plus.svg';
import { poppins } from '@/pages/_app';

const initialState = {
  accordionClosed: true,
};

export default class FAQLine extends Component {
  state = initialState;

  // Is actualy needed?
  // componentDidMount = () => {
  //   if (this.props.first) this.setState({ accordionClosed: false });
  // };

  toggleAccordion = () => {
    this.setState({
      ...this.state,
      accordionClosed: !this.state.accordionClosed,
    });
  };

  render() {
    const { questionAnswer } = this.props;
    const { accordionClosed } = this.state;

    return (
      <div className="card mt-3 cursor_pointer shadow">
        <div className="card-body" onClick={this.toggleAccordion}>
          <div className="d-flex">
            <Image src={plusIcon} alt="open" />
            <h5 className={`${poppins.className} text_dk_blue card-title ms-3`}>
              {questionAnswer?.question}
            </h5>
          </div>

          <hr className={`${accordionClosed ? 'd-none' : 'd-block'}`} />
          <div
            className={`card-text collapse ${accordionClosed ? '' : 'show'}`}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: questionAnswer?.answer,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
