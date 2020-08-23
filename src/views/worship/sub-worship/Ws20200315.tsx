import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200315(props: any) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState(`<p><br></p><h2><strong>講題：主恩奇妙，因病得福</strong><strong> </strong>(列王紀下5:1-19上)</h2><p><br></p><p><br></p><h3><strong>- 乃缦遇上了人生憾事v1-7</strong></h3><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><h3><strong>- 神藉以利沙治好乃缦v8-14</strong></h3><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><h3><strong>- 乃缦全心歸向耶和華v15-19</strong></h3><p><br></p><p><br></p><p><br></p><br>`)
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
          <h2>2020年3月15日 主日崇拜</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <iframe width="660" height="371" src="https://www.youtube-nocookie.com/embed/videoseries?playsinline=1&list=PLUxHXOrQ-4zzJmK9-pRfrCIBmDeP0x84u" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
                <a href="https://drive.google.com/file/d/13XRBak2302qOSXJNfkQvYnae-W-gflzH/view?usp=sharing" target="_blank" rel="noopener noreferrer">
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
              <p style={{ fontSize: 24 }}><b><i>列王紀下5:1-19上</i></b></p>
              <h4><b className="mr-3">5 : 1</b>亞蘭王的軍長乃縵在他的主人面前是一個大人物，很得王的賞識，因為耶和華曾藉他把勝利賜給亞蘭。這個人是個勇猛的戰士，可惜他是個痲風病人。</h4>
              <h4><b className="mr-3">5 : 2</b>亞蘭人曾經出去結隊搶掠，從以色列地擄了一個小女孩，她就侍候乃縵的妻子。</h4>
              <h4><b className="mr-3">5 : 3</b>她對她的女主人說：“如果我的主人去見撒瑪利亞的先知就好了，他必定能治好他的痲風。”</h4>
              <h4><b className="mr-3">5 : 4</b>於是乃縵去告訴他的主人說：“從以色列地擄回來的女孩子這樣這樣說。”</h4>
              <h4><b className="mr-3">5 : 5</b>亞蘭王說：“你去吧！我會送一封書信給以色列王的。”於是乃縵去了，手裡帶著三百公斤銀子，約七十公斤金子和十套衣裳。</h4>
              <h4><b className="mr-3">5 : 6</b>他把信帶到以色列王那裡，信上說：“這信既已達到你那裡，你看見我差去見你的臣僕乃縵，你就要醫好他的痲風。”</h4>
              <h4><b className="mr-3">5 : 7</b>以色列王讀了這信後，就撕裂自己的衣服，說：“我是　神，能使人死使人活嗎？這人竟派人到我這裡來，要我治好他的痲風。請你們想想看，他是要找機會攻擊我。”</h4>
              <h4><b className="mr-3">5 : 8</b>神人以利沙聽見以色列王撕裂自己的衣服，就打發人去見王說：“你為甚麼撕裂自己的衣服呢？請你把他送到我這裡來吧！他就知道在以色列中有先知了。”</h4>
              <h4><b className="mr-3">5 : 9</b>於是乃縵帶著他的車馬來到，停在以利沙的門前。</h4>
              <h4><b className="mr-3">5 : 10</b>以利沙差派一個使者去見他說：“你去在約旦河中沐浴七次，你的身體就會復原，得著潔淨。”</h4>
              <h4><b className="mr-3">5 : 11</b>乃縵卻發怒走了，他說：“我以為他必會出來，站著求告耶和華他的　神的名，向著患處搖手，潔淨這痲風病。</h4>
              <h4><b className="mr-3">5 : 12</b>大馬士革的亞罷拿河和法珥法河，不是比以色列一切河流更好嗎？我不是可以在那裡沐浴，得著潔淨嗎？”於是他掉過頭來，氣忿忿地走了。</h4>
              <h4><b className="mr-3">5 : 13</b>他的僕人上前，對他說：“我父啊，先知如果吩咐你作一件大事，你不是照著行嗎？何況他只是說：‘你去沐浴就得潔淨’呢？”</h4>
              <h4><b className="mr-3">5 : 14</b>於是他下去，在約旦河裡浸了七趟，正如神人所吩咐的。他的肌肉就復原，好像小孩子的肌肉，他就得了潔淨。</h4>
              <h4><b className="mr-3">5 : 15</b>乃縵和他的隨員又回到神人那裡，他進去，站在他面前，說：“看哪！現在我知道除了在以色列以外，全地都沒有　神。現在，請你收下你僕人一點禮物吧。”</h4>
              <h4><b className="mr-3">5 : 16</b>以利沙說：“我指著我所事奉永活的耶和華起誓，我決不收取任何禮物。”乃縵再三促請他接受，都被他拒絕。</h4>
              <h4><b className="mr-3">5 : 17</b>乃縵說：“你若是不肯收取，就請你賜你僕人兩頭驢子可以馱的泥土，因為你的僕人不再獻燔祭或別的祭給別的神，只獻給耶和華。</h4>
              <h4><b className="mr-3">5 : 18</b>但有一件事，求耶和華赦免你的僕人；我的主人到臨門廟那裡叩拜的時候，他總是靠在我的手臂上，因此，我也曾在臨門廟叩拜。我在臨門廟叩拜這事，求耶和華赦免你的僕人。”</h4>
              <h4><b className="mr-3">5 : 19</b>以利沙說：“你平平安安回去吧。”</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200315;