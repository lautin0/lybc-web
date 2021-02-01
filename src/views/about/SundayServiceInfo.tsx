import React, { useEffect } from "react";

// react-bootstrap components
import { Table, Container, Row, Col } from "react-bootstrap";
import { useIntl } from "react-intl";

// core components

function SundayServiceInfo() {

  const intl = useIntl()

  useEffect(() => {
    //Default scroll to top
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="section">
      <Container>
        <Row className="justify-content-md-center">
          <Col className="text-left" lg="8" md="12">
            <Table striped>
              <thead className="text-center">
                <tr>
                  <th>{intl.formatMessage({ id: "app.timetable.group-name" })}</th><th>{intl.formatMessage({ id: "app.timetable.datetime" })}</th><th>{intl.formatMessage({ id: "app.timetable.target-audience" })}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{intl.formatMessage({ id: "app.sunday-service" })}</td><td>{intl.formatMessage({ id: "app.timetable.morning" })}</td><td>{intl.formatMessage({ id: "app.timetable.all-members" })}</td>
                </tr>
                <tr>
                  <td>{intl.formatMessage({ id: "app.timetable.prayer-meeting" })}</td><td>{intl.formatMessage({ id: "app.timetable.morning-of-1st-sunday" })}</td><td>{intl.formatMessage({ id: "app.timetable.all-members" })}</td>
                </tr>
              </tbody>
              <thead className="text-center">
                <tr>
                  <th>{intl.formatMessage({ id: "app.timetable.bible-study" })}</th><th>{intl.formatMessage({ id: "app.timetable.lesson" })}</th><th>{intl.formatMessage({ id: "app.timetable.time" })}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{intl.formatMessage({ id: "app.timetable.youth-group" })}</td><td>{intl.formatMessage({ id: "app.timetable.david" })}</td><td rowSpan={6} style={{ verticalAlign: "middle", textAlign: "center" }}
                  >{intl.formatMessage({ id: "app.timetable.sunday-morning" })}<br />10:00-11:00</td>
                </tr>
                <tr>
                  <td rowSpan={4}>{intl.formatMessage({ id: "app.timetable.adult" })}</td><td>{intl.formatMessage({ id: "app.timetable.samuel" })}</td>
                </tr>
                <tr>
                  <td>{intl.formatMessage({ id: "app.timetable.daniel" })}</td>
                </tr>
                <tr>
                  <td>{intl.formatMessage({ id: "app.timetable.moses" })}</td>
                </tr>
                <tr>
                  <td>{intl.formatMessage({ id: "app.timetable.elijah" })}</td>
                </tr>
                <tr>
                  <td>{intl.formatMessage({ id: "app.timetable.elderly-group" })}</td><td>{intl.formatMessage({ id: "app.timetable.caleb" })}</td>
                </tr>
                <tr>
                  <td>{intl.formatMessage({ id: "app.timetable.specified" })}</td><td>({intl.formatMessage({ id: "app.timetable.contact-worker" })})</td><td>—</td>
                </tr>
              </tbody>
              <thead className="text-center">
                <tr>
                  <th>{intl.formatMessage({ id: "app.timetable.fellowship" })}</th><th>{intl.formatMessage({ id: "app.timetable.datetime" })}</th><th>{intl.formatMessage({ id: "app.timetable.target" })}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{intl.formatMessage({ id: "app.timetable.john" })}</td><td>{intl.formatMessage({ id: "app.timetable.timeslot-1" })}</td><td>{intl.formatMessage({ id: "app.timetable.elderly" })}</td>
                </tr>
                <tr>
                  <td>{intl.formatMessage({ id: "app.timetable.joshua" })}</td><td>{intl.formatMessage({ id: "app.timetable.timeslot-2" })}</td><td>{intl.formatMessage({ id: "app.timetable.youth" })}</td>
                </tr>
                <tr>
                  <td>{intl.formatMessage({ id: "app.timetable.married-couple-group" })}</td><td>{intl.formatMessage({ id: "app.timetable.timeslot-3" })}</td><td>{intl.formatMessage({ id: "app.timetable.married-couple" })}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SundayServiceInfo;
