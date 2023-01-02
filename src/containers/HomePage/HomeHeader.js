import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HomeHeader.scss";
import logo from "../../assets/Bookingcare-Logo.svg";
import vietnamflag from "../../assets/flags/vietnam.png";
import unitedstatesflag from "../../assets/flags/united-states.png";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";

class HomeHeader extends Component {
	changeLanguage = (language) => {
		this.props.changeLanguageAppRedux(language);
		// fire redux actions
	};

	returnToHome = () => {
		if (this.props.history) {
			this.props.history.push(`/home`);
		}
	};
	render() {
		let language = this.props.language;
		return (
			<React.Fragment>
				<div className="home-header-container">
					<div className="home-header-content">
						<div className="left-content">
							<i className="fas fa-bars"></i>
							<img
								className="header-logo"
								src={logo}
								onClick={() => this.returnToHome()}
							/>
							<div className="header-logo"></div>
						</div>
						<div className="center-content">
							<div className="child-content">
								<div>
									<b>
										<FormattedMessage id="home-header.speciality" />
									</b>
								</div>
								<div className="sub-title">
									<FormattedMessage id="home-header.search-doctor-with-speciality" />
								</div>
							</div>
							<div className="child-content">
								<div>
									<b>
										<FormattedMessage id="home-header.facilities" />
									</b>
								</div>
								<div className="sub-title">
									<FormattedMessage id="home-header.choose-hospital-clinic" />
								</div>
							</div>
							<div className="child-content">
								<div>
									<b>
										<FormattedMessage id="home-header.doctor" />
									</b>
								</div>
								<div className="sub-title">
									<FormattedMessage id="home-header.choose-qualified-doctor" />
								</div>
							</div>
							<div className="child-content">
								<div>
									<b>
										<FormattedMessage id="home-header.medical-examination-package" />
									</b>
								</div>
								<div className="sub-title">
									<FormattedMessage id="home-header.health-medical-check" />
								</div>
							</div>
						</div>
						<div className="right-content">
							<div className="support">
								<i className="fas fa-question-circle"></i>
								<FormattedMessage id="home-header.support" />
							</div>
							<div
								className={
									language === LANGUAGES.VI
										? "language-vi active"
										: "language-vi hover"
								}
							>
								<img src={vietnamflag} />
								<span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
							</div>
							<div
								className={
									language === LANGUAGES.EN
										? "language-en active"
										: "language-en hover"
								}
							>
								<img src={unitedstatesflag} />
								<span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
							</div>
						</div>
					</div>
				</div>
				{this.props.isShowBanner === true && (
					<div className="home-header-banner">
						<div className="top-content">
							<div className="title1">
								<FormattedMessage id="banner.title1" />
							</div>
							<div className="title2">
								<b>
									<FormattedMessage id="banner.title2" />
								</b>
							</div>
							<div className="search">
								<i className="fas fa-search"></i>
								<input type="text" placeholder="Tìm Chuyên Khoa Khám Bệnh" />
							</div>
						</div>
						<div className="bottom-content">
							<div className="options">
								<div className="option-child">
									<div className="option-icon-child">
										<i className="fas fa-hospital-alt"></i>
									</div>
									<div className="text-icon-child">
										<FormattedMessage id="banner.text-icon-child-1" />
									</div>
								</div>
								<div className="option-child">
									<div className="option-icon-child">
										<i className="fas fa-mobile"></i>
									</div>
									<div className="text-icon-child">
										<FormattedMessage id="banner.text-icon-child-2" />
									</div>
								</div>
								<div className="option-child">
									<div className="option-icon-child">
										<i className="fas fa-procedures"></i>
									</div>
									<div className="text-icon-child">
										<FormattedMessage id="banner.text-icon-child-3" />
									</div>
								</div>
								<div className="option-child">
									<div className="option-icon-child">
										<i className="fas fa-flask"></i>
									</div>
									<div className="text-icon-child">
										<FormattedMessage id="banner.text-icon-child-4" />
									</div>
								</div>
								<div className="option-child">
									<div className="option-icon-child">
										<i className="fas fa-user-md"></i>
									</div>
									<div className="text-icon-child">
										<FormattedMessage id="banner.text-icon-child-5" />
									</div>
								</div>
								<div className="option-child">
									<div className="option-icon-child">
										<i className="fas fa-briefcase-medical"></i>
									</div>
									<div className="text-icon-child">
										<FormattedMessage id="banner.text-icon-child-6" />
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		isLoggedIn: state.user.isLoggedIn,
		userInfo: state.user.userInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
