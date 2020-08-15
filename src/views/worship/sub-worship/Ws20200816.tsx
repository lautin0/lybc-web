import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200816(props: any) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState('<h2><br></h2><h2><strong>講題：好等我們去支取</strong></h2><p><br></p><p><strong>經文：彼得前書1：13-21</strong></p>')
  const componentRef: any = useRef();

  const handleChange = (content: any) => {
    setData(content);
  }

  const ComponentToPrint = React.forwardRef((props: ComponentToPrintProps, ref: any) => {
    return (
      <div className="m-5" ref={ref} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.content) }}>
      </div>
    )
  })

  return (
    <Container style={{ marginTop: -20 }}>
      <Row className="justify-content-md-center">
        <Col className="text-center" lg="8" md="12">
          <h2>2020年8月16日 主日崇拜</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <iframe width="660" height="371" src="https://www.youtube.com/embed/videoseries?list=PLUxHXOrQ-4zzOpvX4lR_JsIvQEmZaFEuU&playsinline=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </Row>
      <Row className="mt-5 mb-5 text-center justify-content-center ml-1 mr-1">
        <Tabs
          id=""
          activeKey={key}
          onSelect={(k: any) => setKey(k)}
          className="nav-justified w-100 mb-5"
          style={{ fontSize: 20 }}
        >
          <Tab eventKey="home" title="筆記">
            <div className="mb-2">
              <div style={{ width: 'fit-content' }}>
                <a href="https://drive.google.com/file/d/1I98Y7ejvEIKbNcebRrCA48Y8kj6MrpBD/view?usp=drivesdk" target="_blank">
                  <div>
                    <i style={{ fontSize: 48, color: '#f04100' }} className="far fa-file-pdf"></i>
                  </div>
                  <div>
                    <label>程序表</label>
                  </div>
                </a>
              </div>
            </div>
            <Row>
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
                <div className="d-none">
                  <ComponentToPrint
                    ref={el => (componentRef.current = el)}
                    content={data}
                  />
                </div>
              </div>
            </Row>
          </Tab>
          <Tab eventKey="script" title="經文">
            <div className="text-left mb-5">
              <p className="my-3" style={{ fontSize: 24 }}><b><i>彼得前書1：13-21</i></b></p>
              <h4><b className="mr-3">1 : 13</b>所以，要準備好你們的心，謹慎自守，專心盼望耶穌基督顯現的時候帶給你們的恩惠。</h4>
              <h4><b className="mr-3">1 : 14</b>作為順服的兒女，就不要效法從前蒙昧無知的時候那放縱私慾的樣子。</h4>
              <h4><b className="mr-3">1 : 15</b>但那召你們的既是聖潔，你們在一切所行的事上也要聖潔；</h4>
              <h4><b className="mr-3">1 : 16</b>因為經上記著：「你們要成為聖，因為我是神聖的。」</h4>
              <h4><b className="mr-3">1 : 17</b>既然你們稱那不偏待人、按各人行為審判人的主為父，就當存敬畏的心，度你們在世寄居的日子。</h4>
              <h4><b className="mr-3">1 : 18</b>你們知道，你們得以從你們祖先傳下來虛妄的行為中救贖出來，不是靠著會朽壞的金銀等物，</h4>
              <h4><b className="mr-3">1 : 19</b>而是憑著基督的寶血，如同無瑕疵、無玷污的羔羊的血。</h4>
              <h4><b className="mr-3">1 : 20</b>基督是　神在創世以前所預知，而在這末世才為你們顯現的。</h4>
              <h4><b className="mr-3">1 : 21</b>你們也因著他而信那使他從死人中復活、又給他榮耀的　神，好讓你們的信心和盼望都在於　神。</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200816;