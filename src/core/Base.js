import React from "react";
import Menu from "./Menu";

export default function Base({
  title = "my title",
  description = "mydescription",
  className = "p-4",
  children,
}) {
  return (
    <div>
        <Menu/>
      <div className="container-fluid">
        <div className="jumbotron text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        
        <div classname={children}>{children}</div>
        <footer className="footer mt-auto py-3">
            <div className="container-fluid bg-success text-white text-center py-3">
                <h4>if you goy any question reach me out on instagram </h4>
                <button className="btn btn-warning btn-lg my-3">contact us</button>
                <div className="conatiner">
                    <span classname="text-muted">an Amazing Django plus React course</span>
                </div>
            </div>
        </footer>
      </div>
    </div>
  );
}
