"use client";
import Image from "next/image";
import Link from "next/link";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { getCookie } from "cookies-next";
import { UserProvider } from "../../app/context/UserContext";
import { Modal } from "react-bootstrap";

const BASE_URL = process.env.BASE_URL;

export const getUser = async () =>
  fetch("/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Cookie: getCookie("token") + ";",
    },
  }).then((res) => {
    // if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });

export default function DashboardLayout({ children }) {
  // const { data } = await getUser();

  const [user, setUser] = React.useState();

  const [show, setShow] = useState(false);

  React.useEffect(() => {
    (async () => {
      const { success, data } = await getUser();

      if (success) setUser(data);
    })();
  }, []);

  return (
    <UserProvider user={user}>
      {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          {/* Sidebar - Brand */}
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="index.html"
          >
            <Image
              width={"200"}
              className="rounded-4 mt-3"
              src={require("../../assets/logo-dark.png")}
            ></Image>
          </a>
          {/* Divider */}
          <hr className="sidebar-divider my-0" />
          {/* Nav Item - Dashboard */}
          <li className="nav-item active">
            <Link href="/" className="nav-link">
              <span>Anasafya</span>
            </Link>
          </li>
          {/* Divider */}
          <hr className="sidebar-divider" />
          {/* Heading */}
          <div className="sidebar-heading">İşlemler</div>
          {/* Nav Item - Pages Collapse Menu */}
          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              <i className="fas fa-fw fa-form" />
              <span>Form İşlemleri</span>
            </Link>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                {user?.mission == "Kalite Yöneticisi" ? (
                  <>
                    <Link className="collapse-item" href={"/form/create-form"}>
                      Form Oluştur
                    </Link>
                    <Link className="collapse-item" href="/form/view-forms">
                      Formları Görüntüle
                    </Link>
                  </>
                ) : user?.mission == "Bölüm Başkan Yardımcısı" ? (
                  <Link className="collapse-item" href="/form/statistics">
                    Bölüm Form İstatistik
                  </Link>
                ) : (
                  <Link className="collapse-item" href="/form/assigned-forms">
                    Atanmış Formlar
                  </Link>
                )}
              </div>
            </div>
          </li>

          <hr className="sidebar-divider" />
        </ul>
        {/* End of Sidebar */}
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              {/* Sidebar Toggle (Topbar) */}
              <button
                id="sidebarToggleTop"
                className="btn btn-link d-md-none rounded-circle mr-3"
              >
                <i className="fa fa-bars" />
              </button>

              {/* Topbar Navbar */}
              <ul className="navbar-nav ml-auto">
                {/* Nav Item - Search Dropdown (Visible Only XS) */}
                <li className="nav-item dropdown no-arrow d-sm-none">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="searchDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-search fa-fw" />
                  </a>
                  {/* Dropdown - Messages */}
                  <div
                    className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                    aria-labelledby="searchDropdown"
                  >
                    <form className="form-inline mr-auto w-100 navbar-search">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control bg-light border-0 small"
                          placeholder="Search for..."
                          aria-label="Search"
                          aria-describedby="basic-addon2"
                        />
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm" />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </li>

                <li className="nav-item dropdown no-arrow">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                      {user?.name_surname}
                    </span>
                    <Image
                      className="img-profile rounded-circle"
                      src={require("../../assets/icons/undraw_profile.svg")}
                    />
                  </a>
                  {/* Dropdown - User Information */}
                  <div
                    className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown"
                  >
                    <a
                      className="dropdown-item"
                      href="#"
                      data-toggle="modal"
                      data-target="#logoutModal"
                    >
                      <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                      {user?.mission}
                    </a>
                    <a
                      className="dropdown-item"
                      href="#"
                      data-toggle="modal"
                      data-target="#logoutModal"
                      onClick={() => setShow(true)}
                    >
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                      Çıkış Yap
                    </a>
                  </div>
                </li>
              </ul>
            </nav>
            {/* End of Topbar */}
            {/* Begin Page Content */}
            <div className="container-fluid">{children}</div>
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}
          {/* Footer */}
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>
                  Sakarya Uygulamalı Bilimler Universitesi -{" "}
                  {new Date().getFullYear()}
                </span>
              </div>
            </div>
          </footer>
          {/* End of Footer */}
        </div>
        {/* End of Content Wrapper */}
      </div>
      {/* End of Page Wrapper */}
      {/* Scroll to Top Button*/}
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up" />
      </a>
      {/* Logout Modal*/}
      <LogoutModal show={show} onHide={() => setShow(false)} />
    </UserProvider>
  );
}

const LogoutModal = ({ show, onHide }) => {
  const router = useRouter();

  return (
    <Modal
      className="modal fade"
      show={show}
      id="logoutModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Çıkış yapıyorsunuz
            </h5>
            <button
              className="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            Oturumun sonlanması için &quot;Çıkış yap&quot; butonuna basınız.
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >
              İptal
            </button>
            <button
              className="btn btn-primary"
              href="login.html"
              // className="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                deleteCookie("token");
                router.replace("/sign-in");
                onHide();
              }}
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
