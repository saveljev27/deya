import { useRouter } from 'next/router';
import { Component } from 'react';
import { useIntl } from 'react-intl';

import imgEn from "/public/assets/svg/lang/gb.svg";
import imgNl from "/public/assets/svg/lang/nl.svg";
import imgRu from "/public/assets/svg/lang/ru.svg";

import Image from 'next/image';

const initialState = {
  langMenuOpened: false
};

class LanguageSwitch extends Component {
  state = initialState;

  changeLocale = (nextLocale) => {
    const { pathname, asPath, query } = this.props.router;

    setCookie("NEXT_LOCALE", nextLocale);
    this.props.router.push({ pathname, query }, asPath, { locale: nextLocale });
    return this.toggleMenu();
  };

  toggleMenu = () => {
    this.setState({
      ...this.state,
      langMenuOpened: !this.state.langMenuOpened
    })
  }

  render() {
    return (
      <div className="position-relative">

      <div className="dropdown show">
        <div 
          className="cursor_pointer" 
          onClick={this.toggleMenu}
        >
          {
            (this.props.router?.locale === "en-US") ? (
               <>
                <Image
                  src={imgEn}
                  alt="UK flag"
                  width={28}
                />
                <span className="language_txt">EN</span>
              </>
            ) : (
              <>
                <Image
                  src={imgNl}
                  alt="NL flag"
                  width={28}
                />
                <span className="language_txt">NL</span>
              </>    
            )
          }
          </div>          

          <div className={`dropdown-menu border-0 ${(this.state.langMenuOpened) ? ("show") : ("")}`}>
            <button 
              className="dropdown-item d-flex justify-content-center align-items-center"
              onClick={() => {this.changeLocale("en-US")}}
            >
              <Image
                src={imgEn}
                alt="UK flag"
                width={28}
              />
              <span className="language_txt">EN</span>
            </button>
            <button 
              className="dropdown-item d-flex justify-content-center align-items-center"
              onClick={() => {this.changeLocale("nl-NL")}}
            >
              <Image
                src={imgNl}
                alt="NL flag"
                width={28}
              />
              <span className="language_txt">NL</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

function setCookie( name, value ) {
  document.cookie = name + "=" + (value || "") + ";";
}

export default (function(props) {
  const router = useRouter();
  const intl = useIntl();
  return <LanguageSwitch {...props} router={router} intl={intl} />;
});