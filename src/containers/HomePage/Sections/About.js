import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import Slider from "react-slick";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          From Edward With Love &hearts;
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%%"
              height="400px"
              src="https://www.youtube.com/embed/_7V_2xILtJ8"
              title="Nhạc Lofi Hot TikTok 2022 - Nhạc Lofi Chill Nhẹ Nhàng ♫ Nhạc Trẻ Lofi Buồn Tâm Trạng Nhất Hiện Nay"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              Nhạc Lofi Hot TikTok 2022 - Nhạc Lofi Chill Nhẹ Nhàng ♫ Nhạc Trẻ
              Lofi Buồn Tâm Trạng Nhất Hiện Nay ◕◕◕ Welcome to CAY BANG NON ◕◕◕
              ✦ CÂY BÀNG NON - Kênh nhạc lofi hàng đầu tại Việt Nam, xây dựng
              theo tiêu chí mang lại những cảm xúc âm nhạc Sâu Lắng - Nhẹ Nhàng
              - Tình Cảm nhất để phục vụ hài lòng khán giả, cũng như thư giãn -
              xả stress sau những khó khăn và bộn bề của cuộc sống.
              ------------------------------------------------------------------------------------------------
              ◕‿◕ PLEASE SUBSCRIBE to be the first to see the LATEST PRODUCTS!
              ◕‿◕ ----------------------------------------------- ✏Liên Hệ tài
              trợ/ Quảng cáo: ►Mail: PinMedia.vn@gmail.com
              ---------------------------------------------------------------------------
              © Bản quyền thuộc về Pin Media & H2O Remix. © Copyright by Pin
              Media & H2O Remix ☞ Do not Reup.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
