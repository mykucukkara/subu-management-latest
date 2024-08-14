"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import { getForms } from "../../../services/form";
import { Card, Col, Container, Row } from "react-bootstrap";
import SingleFormItem from "../../../components/dashboard/SingleFormItem";

const ViewFormsPageWrapper = () => {
  return (
    <DashboardLayout>
      <ViewFormsPage />
    </DashboardLayout>
  );
};

const ViewFormsPage = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await getForms();

      if (result?.success) setForms(result.data);
    })();
  }, []);

  return (
    <>
      <Card>
        <Card.Header>
          <h4>Kaydedilen Formlar</h4>
        </Card.Header>
        <Card.Body className="">
          <Row>
            {forms.map((item, index) => (
              <Col lg={3} key={index} sm={12} className="p-3" xs={12}>
                <SingleFormItem data={item} />
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default ViewFormsPageWrapper;
