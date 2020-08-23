import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200614(props: any) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState('<h2><br></h2><h2><strong>講題：保持5G連線度困境</strong></h2><p><br></p><p><strong>經文：以賽亞書55:6-11，詩篇34:12-14，提摩太後書1:6-7</strong></p>')
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
          <h2>2020年6月14日 主日崇拜</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <iframe width="660" height="371" src="https://www.youtube.com/embed/videoseries?list=PLUxHXOrQ-4zxDs_RmRyirlpSw-JLrzC72&playsinline=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
                <a href="https://drive.google.com/file/d/10ZDA_VKTkKb8fTh5fX4UhE-3zFb7XA0x/view?usp=sharing" target="_blank">
                  <div>
                    <i style={{ fontSize: 48, color: '#f04100' }} className="far fa-file-pdf"></i>
                  </div>
                  <div>
                    <label>程序表.pdf</label>
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
              <p className="my-3" style={{ fontSize: 24 }}><b><i>以賽亞書55:6-11</i></b></p>
              <h4><b className="mr-3">55 : 6</b> 當趁耶和華可尋找的時候尋找他，在他接近的時候求告他。</h4>
              <h4><b className="mr-3">55 : 7</b> 惡人當離棄自己的道路，不義的人應除掉自己的意念。歸向耶和華，耶和華就必憐憫他；當歸向我們的上帝，因為他必廣行赦免。</h4>
              <h4><b className="mr-3">55 : 8</b> 我的意念非同你們的意念，我的道路非同你們的道路。這是耶和華說的。</h4>
              <h4><b className="mr-3">55 : 9</b> 天怎樣高過地，照樣，我的道路高過你們的道路，我的意念高過你們的意念。</h4>
              <h4><b className="mr-3">55 : 10</b> 雨雪從天而降，並不返回，卻要滋潤土地，使地面發芽結實，使撒種的有種，使要吃的有糧。</h4>
              <h4><b className="mr-3">55 : 11</b> 我口所出的話也必如此，絕不徒然返回，卻要成就我的旨意，達成我差它的目的。</h4>
              <p className="my-3" style={{ fontSize: 24 }}><b><i>詩篇34:12-14</i></b></p>
              <h4><b className="mr-3">34 : 12</b> 有誰喜愛生命，愛慕長壽，得享美福？</h4>
              <h4><b className="mr-3">34 : 13</b> 你要禁止舌頭不出惡言，嘴唇不說詭詐的話。</h4>
              <h4><b className="mr-3">34 : 14</b> 要棄惡行善，尋求和睦，一心追求。</h4>
              <p className="my-3" style={{ fontSize: 24 }}><b><i>提摩太後書1:6-7</i></b></p>
              <h4><b className="mr-3">1 : 6</b> 為這緣故，我提醒你要把上帝藉著我按手所給你的恩賜再如火挑旺起來。</h4>
              <h4><b className="mr-3">1 : 7</b> 因為上帝賜給我們的不是膽怯的心，而是剛強、仁愛、自制的心。</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200614;