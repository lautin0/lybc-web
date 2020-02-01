/*eslint-disable*/
import React from "react";
import { Link } from 'react-router-dom'

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <footer className="footer footer-default" style={{ marginTop: '20vh' }}>
      <div className="d-flex flex-wrap" style={{ marginBottom: '7vh' }}>
        <div className="offset-sm-2 col-sm-1 col-md-2" style={{ width: '50%' }}>
          <h4>教會活動</h4>
          <ul className="sitemap">
            <li>
              <Link to="/">
                最新活動
              </Link>
            </li>
            <li>
              <Link to="/">
                團契
              </Link>
            </li>
            <li>
              <Link to="/">
                相冊
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-sm-1 col-md-2" style={{ width: '50%' }}>
          <h4>事工介紹</h4>
          <ul className="sitemap">
            <li>
              <Link to="/">
                探訪事工
              </Link>
            </li>
            <li>
              <Link to="/">
                青少年事工
              </Link>
            </li>
            <li>
              <Link to="/">
                街頭福音事工
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-sm-1 col-md-2" style={{ width: '50%' }}>
          <h4>教會刊物</h4>
          <ul className="sitemap">
            <li>
              <Link to="/">
                程序表
              </Link>
            </li>
            <li>
              <Link to="/download">
                教會月刊
              </Link>
            </li>
            <li>
              <Link to="/">
                見證欄
              </Link>
            </li>
            <li>
              <Link to="/">
                牧者的話
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-sm-1 col-md-2" style={{ width: '50%' }}>
          <h4>認識綠楊</h4>
          <ul className="sitemap">
            <li>
              <Link to="/about-us">
                關於我們
              </Link>
            </li>
            <li>
              <Link to="/">
                聚會時間
              </Link>
            </li>
            <li>
              <Link to="/">
                聯絡我們
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Container>
        <nav>
          <ul>
            <li>
              <a
                target="_blank"
                href="http://www.hkabwe.org/"
              >
                ABWE
                </a>
            </li>
            <li>
              <Link
                to="/about-us"
              >
                About Us
                </Link>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright" style={{ paddingTop: 2 }}>
          版權所有{" "}©2020{" "}綠楊浸信會
        </div>
      </Container>
    </footer>
  );
}

export default DefaultFooter;
