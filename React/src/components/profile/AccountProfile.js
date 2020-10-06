import React from 'react'
import Base from '../Base'
import './AccountProfile.css'

class AccountProfile extends React.Component {
  render() {
    return (
      <div>
        <Base authenticated={this.props.authenticated}> </Base>
        <Main></Main>
      </div>
    )
  }
}

class Main extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="profile-header">
            <div className="profile-img">
              <img
                src="/static/images/Ashpic.JPG"
                alt="Profile Image"
                width={200}
              />
            </div>
            <div className="profile-nav-info">
              <h3 className="user-name">Ashrey Ranjit</h3>
              <div className="address">
                <p id="state" className="state">
                  Sydney,
                </p>
                <span id="country" className="country">
                  Australia.
                </span>
              </div>
            </div>
          </div>
          <div className="main-bd">
            <div className="left-side">
              <div className="profile-side">
                <p className="mobile-no">
                  <i className="fa fa-phone" /> +61 444 777 859
                </p>
                <p className="user-mail">
                  <i className="fa fa-envelope" /> fname.lastname@gmail.com
                </p>
                <div className="user-bio">
                  <h3>Bio</h3>
                  <p className="bio">
                    Hi welcome to my bio. Hi! My name is (what?) Excuse me, (my
                    name is) (who? My name is) Slim Shady Can I get the
                    attention of the class (huh my name is, what my name is) For
                    one second My name is (My name is Slim Shady)
                  </p>
                </div>
                <div className="user-rating">
                  <h1>RATING: </h1>
                  <h3 className="rating">4.5</h3>
                </div>
              </div>
            </div>
            <div className="right-side">
              <div className="nav">
                <h1 className="skills">Skills</h1>
                <ul>
                  <li><p>plumbing</p></li>
                  <li><p>painting</p></li>
                  <li><p>reparing</p></li>
                </ul>
              </div>
              <div className="profile-body">
                <div className="profile-posts tab">
                  <h1>Your Post</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ipsa quia sunt itaque ut libero cupiditate ullam qui velit
                    laborum placeat doloribus, non tempore nisi ratione error
                    rem minima ducimus. Accusamus adipisci quasi at itaque
                    repellat sed magni eius magnam repellendus. Quidem inventore
                    repudiandae sunt odit. Aliquid facilis fugiat earum ex
                    officia eveniet, nisi, similique ad ullam repudiandae
                    molestias aspernatur qui autem, nam? Cupiditate ut quasi
                    iste, eos perspiciatis maiores molestiae.
                  </p>
                </div>
                <div className="profile-reviews tab">
                  <h1>User reviews</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aliquam pariatur officia, aperiam quidem quasi, tenetur
                    molestiae. Architecto mollitia laborum possimus iste esse.
                    Perferendis tempora consectetur, quae qui nihil voluptas.
                    Maiores debitis repellendus excepturi quisquam temporibus
                    quam nobis voluptatem, reiciendis distinctio deserunt vitae!
                    Maxime provident, distinctio animi commodi nemo, eveniet
                    fugit porro quos nesciunt quidem a, corporis nisi dolorum
                    minus sit eaque error sequi ullam. Quidem ut fugiat,
                    praesentium velit aliquam!
                  </p>
                </div>
                <div className="profile-settings tab">
                  <div className="account-setting">
                    <h1>Acount Setting</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Reprehenderit omnis eaque, expedita nostrum, facere libero
                      provident laudantium. Quis, hic doloribus! Laboriosam nemo
                      tempora praesentium. Culpa quo velit omnis, debitis
                      maxime, sequi animi dolores commodi odio placeat, magnam,
                      cupiditate facilis impedit veniam? Soluta aliquam
                      excepturi illum natus adipisci ipsum quo, voluptatem,
                      nemo, commodi, molestiae doloribus magni et. Cum, saepe
                      enim quam voluptatum vel debitis nihil, recusandae, omnis
                      officiis tenetur, ullam rerum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountProfile
