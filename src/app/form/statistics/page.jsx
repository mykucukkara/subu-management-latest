"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import { getFormForStatistics } from "../../../services/form";
import { Card, Col, Container, Row } from "react-bootstrap";
import SingleFormStatisticsItem from "../../../components/dashboard/SingleFormStatisticsItem";
import StatisticsDetailModal from "../../../modals/StatisticsDetailModal";

const FormStatisticsPageWrapper = () => {
  return (
    <DashboardLayout>
      <FormStatisticsPage />
    </DashboardLayout>
  );
};

const FormStatisticsPage = () => {
  const [forms, setForms] = useState([]);

  const [show, setShow] = useState(false);

  const [selectedFormId, setSelectedFormId] = useState("");

  useEffect(() => {
    (async () => {
      const result = await getFormForStatistics();

      if (result?.success) setForms(result.data);
    })();
  }, []);

  useEffect(() => {
    if (selectedFormId) setShow(true);
  }, [selectedFormId]);

  return (
    <>
      <Card>
        <StatisticsDetailModal
          formId={selectedFormId}
          show={show}
          onHide={() => {
            setShow(false);
            setSelectedFormId("");
          }}
        />
        <Card.Header>
          <h4>Formlar</h4>
        </Card.Header>
        <Card.Body className="">
          <Row>
            {forms.map((item, index) => (
              <Col lg={3} sm={12} key={index} className="p-3" xs={12}>
                <SingleFormStatisticsItem
                  selectedFormId={selectedFormId}
                  setSelectedFormId={setSelectedFormId}
                  data={item}
                />
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default FormStatisticsPageWrapper;
