import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Component } from 'react';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { useIntl } from 'react-intl';

const werkspotfeedback = [
  {
    id: "w90sqw90eqiwo",
    title: "Badkamer: 5 m² - Complete renovatie",
    date: "07.03.2024",
    name: "Sander, Koog aan de Zaan",
    content: "Mark doet zeer nauwkeurig alle voorbereidingen voor de verbouwing van onze badkamer. Zijn team ruimt iedere dag alles op. Ze doen echt ook hun best om de overlast zoveel mogelijk te beperken. De communicatie met Mark gaat perfect. Met zijn team is dat wat uitdagender. Maar uiteindelijk wordt het opgelost."
  },
  {
    id: "87d378eijw",
    title: "Badkamer: 5 m² - Installatie in andere ruimte",
    date: "11.01.2024",
    name: "User, Heiloo",
    content: "Mark en zijn team zijn geweldige professionals. Alles is minutieus voorbereid en uiteindelijk precies afgewerkt. Zéér vriendelijke vakmensen die hun woord nakomen. Ik kan niets anders doen om deze aannemer aan te raden."
  },
  {
    id: "2899812i",
    title: "Extension",
    date: "15.11.2023",
    name: "Sandra",
    content: "The guys did their job well. Based on the results, we got what we wanted. there is more space in the house. I recommend this team"
  }
];

const googlefeedback = [
  {
    id: "e89dq89d",
    title: "Badkamer: 5 m² - Complete renovatie",
    date: "a year ago",
    name: "Romeo Rebic",
    content: "Fantastische ervaring gehad met Deya! Super blij met de resultaten!"
  }
];

class Comments extends Component {
  render() {
    return (
      <div className="container pt-5">
        <h2 className="text-center text_dk_blue pt-5 pt-md-0" id="ervaringen">
          {this.props.intl.formatMessage({ id: "reviews.title" })}
        </h2>
        {/* <h4 className="text-center text_dk_blue pt-4 pt-md-0">
          Werkspot Reviews
        </h4> */}
        <div className="row">
            {
              werkspotfeedback.map((one) => (
                <div className="col-12 col-md-4 d-flex align-items-stretch mt-3" key={one.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        {one.title}
                      </h5>
                      <FiveStars />
                      <h6 className="card-subtitle mb-2 text-muted">
                        {one.date}, {one.name}
                      </h6>
                      <p className="card-text">
                        {one.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            }
        </div>
        <div className="mt-3 text-end">
          <a href="https://www.werkspot.nl/profiel/deya" target='_blank'>
            {this.props.intl.formatMessage({ id: "reviews.btn.werkspot" })}
          </a>
          <a 
            href="https://www.google.com/maps/place/DeYa-Construction/@52.6803594,4.8388545,17z/data=!4m8!3m7!1s0x47cf55cee50e5419:0x3b6dad5981e11838!8m2!3d52.6803562!4d4.8414294!9m1!1b1!16s%2Fg%2F11s34hscwl?entry=ttu"
            target='_blank'
            className="ms-3"
          >
            {this.props.intl.formatMessage({ id: "reviews.btn.google" })}
          </a>
        </div>

        {/* <h4 className="text-center text_dk_blue pt-4 pt-md-0">
          Google Reviews
        </h4>
        <div className="row">
          {
            googlefeedback.map((one) => (
              <div className="col-12 col-md-4 d-flex align-items-stretch mt-3" key={one.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      {one?.title}
                    </h5>
                    <FiveStars />
                    <h6 className="card-subtitle mb-2 text-muted">
                      Date posted: {one?.date}
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                      By: {one?.name}
                    </h6>
                    <p className="card-text">
                      {one?.content}
                    </p>
                  </div>
                </div>
              </div>
            ))
          }
        </div> */}
        {/* <div className="text-end mt-2">
          <a 
            href="https://www.google.com/maps/place/DeYa-Construction/@52.6803594,4.8388545,17z/data=!4m8!3m7!1s0x47cf55cee50e5419:0x3b6dad5981e11838!8m2!3d52.6803562!4d4.8414294!9m1!1b1!16s%2Fg%2F11s34hscwl?entry=ttu"
            target='_blank'
          >
            All Google Reviews
          </a>
        </div> */}

      </div>
    )
  }
}

function FiveStars() {
  return (
    <div className="mb-3">
      <MdOutlineStarPurple500 color="#FFD700" />
      <MdOutlineStarPurple500 color="#FFD700" />
      <MdOutlineStarPurple500 color="#FFD700" />
      <MdOutlineStarPurple500 color="#FFD700" />
      <MdOutlineStarPurple500 color="#FFD700" />
    </div>
  )
}

export default (function(props) {
  const router = useRouter();
  const intl = useIntl();
  return <Comments {...props} router={router} intl={intl} />;
});