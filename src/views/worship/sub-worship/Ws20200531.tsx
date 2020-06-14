import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200531(props: any) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState('')
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
          <h2>2020年5月31日 分享主日</h2>
        </Col>
      </Row>
      {/* <Row className="justify-content-center mt-3">
        <iframe width="660" height="371" src="https://www.youtube.com/embed/videoseries?list=PLUxHXOrQ-4zxaMMuf0dNNJcDhbfvRXYVa&playsinline=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </Row> */}
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
                <a href={require('assets/pdf/20200531rundown.pdf')} target="_blank">
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
              <p style={{ fontSize: 24 }}><b><i>啟應經文 #28 彼此愛顧</i></b></p>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 我賜給你們一條新命令，乃是叫你們彼此相愛，我怎樣愛你們，你們也要怎麼相愛。</h4>
              <h4><b className="mr-3">(應)</b> 你們若有彼此相愛的心，眾人因此就認出你們是我的門徒了。</h4>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 一切苦毒，惱恨，忿怒，嚷鬧，毀謗，並一切的惡毒，都當從你們中間除掉。</h4>
              <h4><b className="mr-3">(應)</b> 並要以恩慈相待，存憐憫的心，彼此饒恕，正如神在基督裏饒恕了你們一樣。</h4>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 所以你們該效法神，好像蒙慈愛的兒女一樣，也要憑愛心行事。</h4>
              <h4><b className="mr-3">(應)</b> 正如基督愛我們，為我們捨了自己，當作馨香的供物和祭物，獻與神。</h4>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 我們因為愛弟兄，就曉得是已經出死入生了。沒有愛心的仍住死中。</h4>
              <h4><b className="mr-3">(應)</b> 凡恨他弟兄的，就是殺人的，你們曉得凡殺人的，沒有永生存在他裏面。</h4>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 主為我們捨命，我們從此就知道何為愛，我們也當為弟兄捨命。</h4>
              <h4><b className="mr-3">(應)</b> 凡有世上財物的，看見弟兄窮乏，卻塞住憐憫的心，愛神的心怎能存在他裏面呢？</h4>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 小子們哪，我們相愛，不要只在言語和舌頭上，總要在行為和誠實上。</h4>
              <h4><b className="mr-3">(應)</b> 親愛的弟兄的，我們應當彼此相愛，因為愛是從神來的，凡有愛心的，都是由神生的，並且認識神。</h4>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 總而言之，你們要同心，彼此體恤。</h4>
              <h4><b className="mr-3">(應)</b> 相愛如弟兄，存慈憐謙卑的心。</h4>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 不以惡報惡，以辱罵還辱罵，倒要祝福。</h4>
              <h4><b className="mr-3">(應)</b> 因你們是為此蒙召，好叫你們承受福氣。</h4>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 最要緊是彼此切實相愛，因為愛能遮掩許多的罪。</h4>
              <h4><b className="mr-3">(應)</b> 你們要互相款待，不發怨言。</h4>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 各人要照所得的恩賜彼此服事，作神百般恩賜的好管家。</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200531;