import React, { Component } from "react";
import "./footer.css";

export class FooterComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <footer className="main-footer">
          <div className="footer">
            <i className="pi pi-facebook"></i>
            <div
              className="footer_texto"
              data-description=" Grupo 6 - All rights reserved"
            >
              Food Overflow \ 2020.
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
