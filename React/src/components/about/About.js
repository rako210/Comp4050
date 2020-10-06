import React from "react";
import Base from '../Base'

class About extends React.Component {
  render() {
    return (
      <div>
        <Base authenticated={this.props.authenticated} userData={this.props.userData}></Base>
        <Main></Main>
      </div>
    );
  }
}

class Main extends React.Component {
  render() {
    return (
      <div>
        <div className="about-section">
          <h1>About Us Page</h1>
          <p>Some text about who we are and what we do.</p>
          <p>
            Resize the browser window to see that this page is responsive by the
            way.
          </p>
        </div>
        <h2 style={{ textAlign: "center" }}>Our Team</h2>
        <div className="row">
          <div className="column">
            <div className="card">
              <img
                src="/static/images/Ashpic.jpg"
                alt="Ashrey"
                style={{ width: "100%" }}
              />
              <div className="container">
                <h2>Ashrey Ranjit</h2>
                <p className="title">Staff</p>
                <p>Hi I am ASHREY RANJIT</p>
                <p>ashrey.ranjit@students.mq.edu.au</p>
                <p>
                  <button className="about_button">Contact</button>
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                src="/static/images/Ahmadpic.jpg"
                alt="Ahmad"
                style={{ width: "100%" }}
              />
              <div className="container">
                <h2>Ahmad Sikder</h2>
                <p className="title">staff</p>
                <p>i am Ahmad i am Ahmad</p>
                <p>Ahmad.sikder@students.mq.edu.au</p>
                <p>
                  <button className="about_button">Contact</button>
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                src="/static/images/connorpic.jpg"
                alt="Conor"
                style={{ width: "100%" }}
              />
              <div className="container">
                <h2>Connor Wilson</h2>
                <p className="title">Staff</p>
                <p>I am connor</p>
                <p>conor.wilson@students.mq.edu.au</p>
                <p>
                  <button className="about_button">Contact</button>
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                src="/static/images/burakpic.jpg"
                alt="Burak"
                style={{ width: "100%" }}
              />
              <div className="container">
                <h2>Burak Ozturker</h2>
                <p className="title">Staff</p>
                <p>Hi I AM BURAK</p>
                <p>burak.Ozturker@students.mq.edu.au</p>
                <p>
                  <button className="about_button">Contact</button>
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                src="/static/images/Mohamedpic.jpg"
                alt="Mohamed"
                style={{ width: "100%" }}
              />
              <div className="container">
                <h2>Mohamed Maatouk</h2>
                <p className="title">Staff</p>
                <p>Hi I AM MOHAMED</p>
                <p>Mohamed.Maatouk@students.mq.edu.au</p>
                <p>
                  <button className="about_button">Contact</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
