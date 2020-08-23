import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200405(props: any) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState('<h2><br></h2><h2><strong>講題：主需要用你(</strong><strong>太21：1-11)</strong></h2><p><br></p><h3><strong><em>主題：透過耶穌騎驢進入耶路撒冷這段經文，帶出服侍方面我們可以學習的地方。</em></strong></h3><p><br></p><h3><strong>一、前言</strong></h3><p><br></p><p><br></p><p><br></p><p><br></p><h3><strong>二、不一樣的進城</strong></h3><p><br></p><p><br></p><p><br></p><p><br></p><h3><strong>三、被主使用的生命</strong></h3><h3><strong>       a. 個人榮耀 Vs 順服主命 v.1-3、6 </strong></h3><p><br></p><p><br></p><p><br></p><p><br></p><h3><strong>       b. 互相分擔、候主隨時使用 v.2、7</strong></h3><p><br></p><p><br></p><p><br></p><p><br></p><h3><strong>四、主需要用你</strong></h3><p><br></p><p><br></p><p><br></p><br><br><br>')
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
          <h2>2020年4月5日 主日崇拜</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <iframe width="660" height="371" src="https://www.youtube.com/embed/videoseries?list=PLUxHXOrQ-4zz94UDYON3VQbSvpSvt20zH&playsinline=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </Row>
      <Row className="mt-5 mb-5 text-center justify-content-center ml-1 mr-1">
        <Tabs
          id=""
          activeKey={key}
          onSelect={(k: any) => setKey(k)}
          className="nav-justified w-100 mb-5"
          style={{ fontSize: 20 }}
        >
          <Tab eventKey="home" title="講章">
            <div className="mb-2">
              <div style={{ width: 'fit-content' }}>
                <a href="https://drive.google.com/file/d/1JDlvizRAZR8zU17-Rn8-nHNrBZtqqTEm/view?usp=sharing" target="_blank">
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
              <p style={{ fontSize: 24 }}><b><i>馬太福音21:1-11</i></b></p>
              <h4><b className="mr-3">21 : 1</b> 耶穌和門徒將近耶路撒冷，到了伯法其，在橄欖山那裡。</h4>
              <h4><b className="mr-3">21 : 2</b> 耶穌就打發兩個門徒，對他們說：你們往對面村子裡去，必看見一匹驢拴在那裡，還有驢駒同在一處；你們解開，牽到我這裡來。</h4>
              <h4><b className="mr-3">21 : 3</b> 若有人對你們說什麼，你們就說：主要用他。那人必立時讓你們牽來。</h4>
              <h4><b className="mr-3">21 : 4</b> 這事成就是要應驗先知的話，說：</h4>
              <h4><b className="mr-3">21 : 5</b>「要對錫安的居民（原文是女子）說：看哪，你的王來到你這裡，是溫柔的，又騎著驢，就是騎著驢駒子。」</h4>
              <h4><b className="mr-3">21 : 6</b> 門徒就照耶穌所吩咐的去行，</h4>
              <h4><b className="mr-3">21 : 7</b> 牽了驢和驢駒來，把自己的衣服搭在上面，耶穌就騎上。</h4>
              <h4><b className="mr-3">21 : 8</b> 眾人多半把衣服鋪在路上；還有人砍下樹枝來鋪在路上。</h4>
              <h4><b className="mr-3">21 : 9</b> 前行後隨的眾人喊著說： 「和散那（原有求救的意思，在此是稱頌的話）歸於大衛的子孫！奉主名來的是應當稱頌的！高高在上和散那！ 」</h4>
              <h4><b className="mr-3">21 : 10</b> 耶穌既進了耶路撒冷，合城都驚動了，說： 「這是誰？ 」</h4>
              <h4><b className="mr-3">21 : 11</b> 眾人說： 「這是加利利拿撒勒的先知耶穌。 」</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200405;