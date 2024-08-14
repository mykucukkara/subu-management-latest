export const saveForm = async (data) =>
  fetch("/api/forms", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });

export const updateForm = async (id, data) =>
  fetch("/api/forms/" + id, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });

export const getForms = async (data) =>
  fetch("/api/forms", {
    method: "GET",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });
export const getAssignedForms = async (data) =>
  fetch("/api/assigned-forms", {
    method: "GET",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });

export const getSingleAssignedForm = async (id) =>
  fetch("/api/assigned-forms/" + id, {
    method: "GET",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });
export const sendSingleAssignedForm = async (id, data) =>
  fetch("/api/assigned-forms/" + id, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });

export const getForm = async (id) =>
  fetch("/api/forms/" + id, {
    method: "GET",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });

export const publishAndAssingFormToUsers = async (formId) =>
  fetch(`/api/forms/${formId}/assign`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });

export const unpublishAndDeleteAssingedFormToUsers = async (formId) =>
  fetch(`/api/forms/${formId}/assign`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });

export const getFormForStatistics = async () =>
  fetch("/api/forms/statistics", {
    method: "GET",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });
export const getAssignedFormsForStatistics = async (id) =>
  fetch("/api/forms/statistics/" + id, {
    method: "GET",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });
