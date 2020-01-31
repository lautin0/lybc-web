import React from "react";

// reactstrap components
import { Table, Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";

// core components

function SundayServiceInfo() {
  return (
    <>
      <div
        className="section section-download"
        id="sunday-service-info-section"
      >
        <Container>
          <Row className="justify-content-md-center">
            <Col className="text-left" lg="8" md="12">
              <h3 className="title">聚會資料</h3>

              <Table striped>        
                <thead className="text-center">
                  <tr>
                    <th>聚會名稱</th><th>日期、時間</th><th>適合對象</th>
                  </tr>
                </thead>      
                <tbody>
                  <tr>
                    <td>主日崇拜</td><td>早上 11:30-12:45</td><td>所有信徒</td>
                  </tr>
                  <tr>
                    <td>教會祈禱會</td><td>第一個主日早上 10:00-10:45</td><td>所有信徒</td>
                  </tr>
                </tbody>
                <thead className="text-center">
                  <tr>
                  <th>聖經班</th><th>課   程</th><th>時間</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>青年組</td><td>大衛組</td><td rowSpan="6" style={{verticalAlign: "middle", textAlign: "center"}}
                  >主日上午<br/>10:00-11:00</td>
                  </tr>
                  <tr>
                    <td rowSpan="4">成人組</td><td>撒母耳組</td>
                  </tr>
                  <tr>
                    <td>但以理組</td>
                  </tr>
                  <tr>
                    <td>摩西組</td>
                  </tr>
                  <tr>
                    <td>以利亞組</td>
                  </tr>
                  <tr>
                    <td>長者組</td><td>迦勒組</td>
                  </tr>
                  <tr>
                    <td>個別栽培</td><td>(請與同工聯絡)</td><td>—</td>
                  </tr>
                </tbody>
                <thead className="text-center">
                  <tr>
                  <th>團契</th><th>日期、時間</th><th>對象</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>約翰團</td><td>第一、三週週六下午 2:00-3:30</td><td>長者</td>
                  </tr>
                  <tr>
                    <td>約書亞團</td><td>週六晚上 7:00 ~ 9:30</td><td>青年</td>
                  </tr>
                  <tr>
                    <td>伉儷團</td><td>逢雙月第四週六下午4:00-6:00</td><td>夫婦</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
      <hr style={{width: '80%'}} />
    </>
  );
}

export default SundayServiceInfo;
