import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200510(props: any) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState('<h2 class="ql-align-justify"><strong>講題：「你的信心真大」</strong></h2><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong>經文：(馬太福音 15:21-28)</strong></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong style="color: blue;">講道大網</strong></p><p class="ql-align-justify"><strong>引言：「信心真大」的婦人是誰？</strong></p><p class="ql-align-justify"><strong> </strong></p><p class="ql-align-justify"><strong style="color: blue;">經文分段</strong></p><p class="ql-align-justify"><strong style="color: rgb(32, 33, 34);">一、迦南婦人的三樣痛苦 (21-24)</strong></p><p class="ql-align-justify"><strong style="color: rgb(32, 33, 34);">        1. ________________</strong></p><p class="ql-align-justify"><strong style="color: rgb(32, 33, 34);">        2. ________________</strong></p><p class="ql-align-justify"><strong style="color: rgb(32, 33, 34);">        3. ________________</strong></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong style="color: rgb(32, 33, 34);">二、婦人的信心表現 (25-27)</strong></p><p class="ql-align-justify"><strong style="color: rgb(32, 33, 34);">1.   ___________________________</strong></p><p class="ql-align-justify"><strong style="color: rgb(32, 33, 34);">2.   ___________________________</strong></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong style="color: rgb(32, 33, 34);">三、婦人所祈求的，耶穌立時給她成全了 (28)</strong></p><p class="ql-align-justify"><strong style="color: blue;">福音真理</strong></p><p class="ql-align-justify"><strong style="color: rgb(34, 34, 34);">1.    </strong><strong style="color: rgb(32, 33, 34);">信心是神所定的生活方式</strong></p><p class="ql-align-justify"><span style="color: rgb(34, 34, 34);">●     </span><strong style="color: rgb(32, 33, 34);">_____________________________</strong></p><p class="ql-align-justify"><span style="color: rgb(34, 34, 34);">●     </span><strong style="color: rgb(32, 33, 34);">_____________________________</strong></p><p class="ql-align-justify"><span style="color: rgb(34, 34, 34);"> </span></p><p class="ql-align-justify"><strong style="color: rgb(34, 34, 34);">2.    </strong><strong style="color: rgb(32, 33, 34);">信靠耶穌使你勝過黑暗</strong></p><p class="ql-align-justify"><span style="color: rgb(34, 34, 34);">●     </span><strong style="color: rgb(32, 33, 34);">黑暗一「害怕」</strong></p><p class="ql-align-justify"><strong style="color: rgb(32, 33, 34);">          _________________________________________</strong></p><p class="ql-align-justify"><span style="color: rgb(34, 34, 34);">●     </span><strong style="color: rgb(32, 33, 34);">黑暗二「不自由，受欺騙」</strong></p><p class="ql-align-justify"><strong style="color: rgb(32, 33, 34);">          _________________________________________</strong></p><p class="ql-align-justify"><span style="color: rgb(34, 34, 34);">●     </span><strong style="color: rgb(32, 33, 34);">黑暗三「負面思想」</strong></p><p class="ql-align-justify"><strong style="color: rgb(32, 33, 34);">           _________________________________________</strong></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong style="color: blue;">結語：</strong></p><p class="ql-align-justify"><strong>當過信心的生活：</strong></p><p class="ql-align-justify"><strong>1. ___________________</strong></p><p class="ql-align-justify"><strong>2. ___________________</strong></p>')
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
          <h2>2020年5月10日 母親節主日崇拜</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <iframe width="660" height="371" src="https://www.youtube.com/embed/videoseries?list=PLUxHXOrQ-4zxbH2QvyDwLWf2EqzqIHqEx&playsinline=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
                <a href="https://drive.google.com/file/d/15UVuPYTu9ztomHtuAZuFqB-J5Y2xSD2p/view?usp=sharing" target="_blank">
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
              <p style={{ fontSize: 24 }}><b><i>馬太福音15:21-28</i></b></p>
              <h4><b className="mr-3">15 : 21</b> 耶穌離開那裡，退到推羅、西頓的境內去。</h4>
              <h4><b className="mr-3">15 : 22</b> 有一個迦南婦人，從那地方出來，喊著說：主阿，大衛的子孫，可憐我！我女兒被鬼附得甚苦。</h4>
              <h4><b className="mr-3">15 : 23</b> 耶穌卻一言不答。門徒進前來，求他說：這婦人在我們後頭喊叫，請打發他走吧。</h4>
              <h4><b className="mr-3">15 : 24</b> 耶穌說：我奉差遣不過是到以色列家迷失的羊那裡去。</h4>
              <h4><b className="mr-3">15 : 25</b> 那婦人來拜他，說：主阿，幫助我！</h4>
              <h4><b className="mr-3">15 : 26</b> 他回答說：不好拿兒女的餅丟給狗吃。</h4>
              <h4><b className="mr-3">15 : 27</b> 婦人說：主阿，不錯；但是狗也吃他主人桌子上掉下來的碎渣兒。</h4>
              <h4><b className="mr-3">15 : 28</b> 耶穌說：婦人，你的信心是大的！照你所要的，給你成全了吧。從那時候，他女兒就好了。</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200510;