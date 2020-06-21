import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200517(props: any) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState('<h2><br></h2><h2><strong>講題：與神同工的領袖</strong></h2><p><br></p><h3><strong>經文：林前 三5-17</strong></h3><p><br></p><h3><strong>主旨：藉保羅指出哥林多教會領袖的問題，帶出領袖在教會應有的角色。</strong></h3><h3><br></h3><h3><strong>一、前言</strong></h3><h3><br></h3><h3><br></h3><p><br></p><h3><br></h3><h3><strong>二、僕人領袖、成果交主手（3:5-9）</strong></h3><h3><br></h3><p><br></p><h3><br></h3><h3><br></h3><h3><strong>三、謹慎建造、工程需評檢 （3:10-15）</strong></h3><h3><br></h3><p><br></p><h3><br></h3><h3><br></h3><h3><strong>四、信徒神殿、守望防毀壞 （3:16-17）</strong></h3><h3><br></h3><h3><br></h3><h3><br></h3><p><br></p><h3><strong>五、結語</strong></h3><p><br></p><p><br></p><p><br></p><p><br></p>')
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
          <h2>2020年5月17日 主日崇拜</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <iframe width="660" height="371" src="https://www.youtube.com/embed/videoseries?list=PLUxHXOrQ-4zznO763xUGxFupaBUJuzlPM&playsinline=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
                <a href="https://drive.google.com/file/d/1hv5PQ9i2LiwZhg4MI-ede8Up3oSMw3Nc/view?usp=sharing" target="_blank">
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
              <p style={{ fontSize: 24 }}><b><i>哥林多前書3:5-17</i></b></p>
              <h4><b className="mr-3">3 : 5</b> 亞波羅算什麼﹖保羅算什麼﹖無非是執事，照主所賜給他們各人的，引導你們相信。</h4>
              <h4><b className="mr-3">3 : 6</b> 我栽種了，亞波羅澆灌了，惟有神叫他生長。 </h4>
              <h4><b className="mr-3">3 : 7</b> 可見栽種的，算不得什麼，澆灌的，也算不得什麼；只在那叫他生長的神。</h4>
              <h4><b className="mr-3">3 : 8</b> 栽種的和澆灌的，都是一樣，但將來各人要照自己的工夫得自己的賞賜。</h4>
              <h4><b className="mr-3">3 : 9</b> 因為我們是與神同工的；你們是神所耕種的田地，所建造的房屋。</h4>
              <h4><b className="mr-3">3 : 10</b> 我照神所給我的恩，好像一個聰明的工頭，立好了根基，有別人在上面建造；只是各人要謹慎怎樣在上面建造。</h4>
              <h4><b className="mr-3">3 : 11</b> 因為那已經立好的根基就是耶穌基督，此外沒有人能立別的根基。</h4>
              <h4><b className="mr-3">3 : 12</b> 若有人用金、銀、寶石、草木，禾稭在這根基上建造，</h4>
              <h4><b className="mr-3">3 : 13</b> 各人的工程必然顯露，因為那日子要將他表明出來，有火發現；這火要試驗各人的工程怎樣。</h4>
              <h4><b className="mr-3">3 : 14</b> 人在那根基上所建造的工程若存得住，他就要得賞賜。</h4>
              <h4><b className="mr-3">3 : 15</b> 人的工程若被燒了，他就要受虧損，自己卻要得救；雖然得救，乃像從火裡經過的一樣。</h4>
              <h4><b className="mr-3">3 : 16</b> 豈不知你們是神的殿，神的靈住在你們裡頭嗎﹖</h4>
              <h4><b className="mr-3">3 : 17</b> 若有人毀壞神的殿，神必要毀壞那人；因為神的殿是聖的，這殿就是你們。</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200517;