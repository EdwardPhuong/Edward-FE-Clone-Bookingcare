import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomePage.scss";

import HomeHeader from "./HomeHeader";
import Specialty from "./Sections/Specialty";
import MedicalCampus from "./Sections/MedicalCampus";
import OutstandingDoctor from "./Sections/OutstandingDoctor";
import Handbook from "./Sections/Handbook";
import About from "./Sections/About";
import HomeFooter from "./HomeFooter";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
  // handleAfterChange = (event, slick, currentSlide) => {

  // }
  render() {
    let setting = {
      dot: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      // slickGoTo: this.handleAfterChange
    };
    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <Specialty setting={setting} />
        <MedicalCampus setting={setting} />
        <OutstandingDoctor setting={setting} />
        <Handbook setting={setting} />
        <About />
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
