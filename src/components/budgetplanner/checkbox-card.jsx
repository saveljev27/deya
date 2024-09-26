import Image from 'next/image';
import React, { Component } from 'react';

export default class CheckboxCard extends Component {
  render() {
    return (
      <div className="col-6 col-md-4">
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
          <div className="card-body">
            <h5 className="card-title text-center">{this.props.title}</h5>
            <div className="d-flex justify-content-center">
              <input 
                className="form-check-input" 
                type="checkbox" 
                checked={this.props.checked}
                readOnly={true}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
