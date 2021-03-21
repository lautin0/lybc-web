import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import UNIVERSALS from 'Universals';

function ArticleComponent() {

  const intl = useIntl()

  return <div className="section section-about-us">
    <Container>
      <Row>
        <Col className="ml-auto mr-auto text-center" md="8">
          <h2 className="title">{intl.formatMessage({ id: "app.theme2.subtitle" })}</h2>
          <h5 className="description">
            {intl.formatMessage({ id: "app.theme2.l0" })}
          </h5>
        </Col>
      </Row>
      <div className="separator separator-primary"></div>
      <div className="section-story-overview">
        <Row>
          <Col md="6">
            <div
              className="image-container image-left"
              style={{
                backgroundImage:
                  "url(" + UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + "/lybcstorage/pray.jpg)"
              }}
            >
              <p className="blockquote blockquote-info">
                "{intl.formatMessage({ id: 'app.theme.statement.scripture' })}"<br></br>
                <br></br>
                <small>-{intl.formatMessage({ id: 'app.theme.statement.scripture.source' })}</small>
              </p>
            </div>
            <div
              className="image-container"
              style={{
                backgroundImage:
                  "url(" + UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + "/lybcstorage/towards_light.jpg)"
              }}
            ></div>
          </Col>
          <Col md="5">
            <div
              className="image-container image-right"
              style={{
                backgroundImage:
                  "url(" + UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + "/lybcstorage/bible_white.jpg)"
              }}
            ></div>
            <h3>
              {intl.formatMessage({ id: 'app.theme.statement.title' })}
            </h3>
            <p>-{intl.formatMessage({ id: 'app.theme.statement.l1' })}</p>
            <p>-{intl.formatMessage({ id: 'app.theme.statement.l2' })}</p>
            <p>-{intl.formatMessage({ id: 'app.theme.statement.l3' })}</p>
            <p>-{intl.formatMessage({ id: 'app.theme.statement.l4' })}</p>
            <p>-{intl.formatMessage({ id: 'app.theme.statement.l5' })}</p>
            <p>-{intl.formatMessage({ id: 'app.theme.statement.l6' })}</p>
          </Col>
        </Row>
      </div>
    </Container>
  </div>
}

export default ArticleComponent;