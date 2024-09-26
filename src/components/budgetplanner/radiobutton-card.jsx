import Image from 'next/image';
import React, { Component } from 'react';

export default class RadiobuttonCard extends Component {
  render() {
    return (
      <div className="col-6 col-md-4 pt-3 d-flex align-items-stretch">
        <div 
          className="card cursor_pointer"
          onClick={this.props.action}
        >
          <Image
            src={this.props.imgSrc}
            alt={this.props.imgAlt}
            width={466}
            height={300}
            sizes="100%"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-center">{this.props.title}</h5>
            <p className="text-center">
              {this.props.body}
            </p>
            <p className="text-success text-center mt-auto">
              <b>{this.props.price}</b>
            </p>
            <div className="d-flex justify-content-center">
              <input 
                className="form-check-input" 
                type="radio" 
                checked={this.props.checked}
                onClick={this.props.action}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
