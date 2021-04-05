import TimelineItem from 'components/Timeline/TimelineItem';
import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import UNIVERSALS from 'Universals';

function TimelineSection() {

  const [timeline] = useState([
    { content: '111', header: '1991 ~ 1993', imageContent: '', src: UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + '/lybcstorage/bg-color-oil-paint.jpeg', subheader: 'aaaaaa aa' },
    { content: '2223', header: '1994 ~ 2006', imageContent: '', src: UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + '/lybcstorage/bg-blue-oil-paint.jpeg', subheader: 'bbbbbb bbbbb' },
    { content: '222442223', header: '2007 ~ 2021', imageContent: '', src: UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + '/lybcstorage/church-bench-md.jpg', subheader: 'ccccc zz' },
  ])

  return <Container className="section" style={{ marginBottom: 100 }}>
    <Row className="text-center" style={{ marginBottom: 80 }}>
      <h2 className="w-100"><strong>綠楊簡史</strong></h2>
    </Row>
    <Row>
      <Col lg={12}>
        <ul className="timeline">
          {timeline.map(({ content, header, imageContent, src, subheader }: any, idx: number) => (
            <TimelineItem
              invert={idx % 2 === 1}
              key={header}
              src={src}
              header={header}
              subheader={subheader}
              content={content}
              imageContent={
                imageContent ? (
                  <div dangerouslySetInnerHTML={{ __html: `<h4>${imageContent}</h4>` }} />
                ) : null
              }
            />
          ))}
        </ul>
      </Col>
    </Row>
  </Container>
}

export default TimelineSection;