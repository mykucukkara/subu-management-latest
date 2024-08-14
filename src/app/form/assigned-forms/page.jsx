"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import { getAssignedForms, getForms } from "../../../services/form";
import { Card, Col, Container, Row } from "react-bootstrap";
import SingleFormItem from "../../../components/dashboard/SingleFormItem";
import SingleAssignedFormItem from "../../../components/dashboard/SingleAssignedFormItem";

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
      const result = await getAssignedForms();

      if (result?.success) setForms(result.data);
    })();
  }, []);

  return (
    <>
      <Card>
        <Card.Header>
          <h4>Tarafıma Atanmış Formlar</h4>
        </Card.Header>
        <Card.Body className="">
          <Row>
            {forms?.map((item, index) => (
              <Col lg={3} sm={12} key={index} className="p-3" xs={12}>
                <SingleAssignedFormItem data={item} />
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default ViewFormsPageWrapper;
