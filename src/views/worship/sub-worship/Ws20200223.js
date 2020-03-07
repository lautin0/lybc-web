import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'

function Ws20200223(props) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState(`<br /><h3>
  <b>
    講道筆記
  </b>
</h3><br/>
<h3>(馬太五:3-16)</h3>`)
  const componentRef = useRef();

  const handleChange = (content) => {
    setData(content);
  }

  const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <div className="m-5" ref={ref} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.content) }}>
      </div>
    )
  })

  return (
    <Container style={{ marginTop: -20 }}>
      <Row className="justify-content-md-center">
        <Col className="text-center" lg="8" md="12">
          <h2>2020年2月23日 主日崇拜</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <iframe src="https://drive.google.com/file/d/1WMqJjnvRAOGcqGEV_vIFjFkJ8QDgNFVW/preview" width="660" height="371"></iframe>
      </Row>
      <Row className="mt-5 mb-5 text-center justify-content-center ml-1 mr-1">
        <Tabs
          activeKey={key}
          onSelect={k => setKey(k)}
          className="nav-justified w-100 mb-5"
          style={{ fontSize: 20 }}
        >
          <Tab eventKey="home" title="講章">
            <Row className="mb-3">
              <ReactQuill
                className="mb-3"
                value={data}
                onChange={handleChange}
                modules={props.editorModules}
                style={{ 
                  minHeight: 500, 
                  maxWidth: '98vw' 
                }}              
              />
            </Row>
            <Row className="mt-5 justify-content-end">
              <div className="d-block d-lg-none">
                <Button style={{ transform: 'translate(0px, 25px)' }} variant="primary" onClick={props.handleDownloadNote}>
                  文字轉圖<i className="ml-1 fas fa-exchange-alt"></i>
                </Button>
              </div>
              <div className="d-none d-lg-block">
                <ReactToPrint
                  trigger={() =>
                    <Button variant="primary">另存PDF<i className="fa fa-print ml-1" aria-hidden="true"></i>
                    </Button>}
                  content={() => componentRef.current}
                />
              </div>
              <div className="d-none">
                <ComponentToPrint
                  ref={el => (componentRef.current = el)}
                  content={data}
                />
              </div>
            </Row>
          </Tab>
          <Tab eventKey="script" title="經文">
            <div className="text-left mb-5">
              <p style={{ fontSize: 24 }}><b><i>馬太福音5:3-16</i></b></p>
              <h4><b className="mr-3">5 : 3</b> 「心靈貧窮的人有福了！ 因為天國是他們的。</h4>
              <h4><b className="mr-3">5 : 4</b> 哀慟的人有福了！ 因為他們必得安慰。</h4>
              <h4><b className="mr-3">5 : 5</b> 謙和的人有福了！ 因為他們必承受土地。</h4>
              <h4><b className="mr-3">5 : 6</b> 飢渴慕義的人有福了！ 因為他們必得飽足。</h4>
              <h4><b className="mr-3">5 : 7</b> 憐憫人的人有福了！ 因為他們必蒙憐憫。</h4>
              <h4><b className="mr-3">5 : 8</b> 清心的人有福了！ 因為他們必得見　神。</h4>
              <h4><b className="mr-3">5 : 9</b> 締造和平的人有福了！ 因為他們必稱為　神的兒子。</h4>
              <h4><b className="mr-3">5 : 10</b> 為義受迫害的人有福了！ 因為天國是他們的。</h4>
              <h4><b className="mr-3">5 : 11</b> 「人若因我辱罵你們，迫害你們，捏造各樣壞話毀謗你們，你們就有福了！</h4>
              <h4><b className="mr-3">5 : 12</b> 要歡喜快樂，因為你們在天上的賞賜是很多的。在你們以前的先知，人也是這樣迫害他們。」</h4>
              <h4><b className="mr-3">5 : 13</b> 「你們是地上的鹽。鹽若失了味，怎能叫它再鹹呢？它不再有用，只好被丟在外面，任人踐踏。</h4>
              <h4><b className="mr-3">5 : 14</b> 你們是世上的光。城造在山上是不能隱藏的。</h4>
              <h4><b className="mr-3">5 : 15</b> 人點燈，不放在斗底下，而是放在燈臺上，就照亮一家的人。</h4>
              <h4><b className="mr-3">5 : 16</b> 你們的光也要這樣照在人前，叫他們看見你們的好行為，把榮耀歸給你們在天上的父。」</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200223;