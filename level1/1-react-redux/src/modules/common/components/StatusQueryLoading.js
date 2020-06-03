import PropTypes from "prop-types";
import React from "react";
import { Spinner } from "reactstrap";

function StatusQueryLoading({ loading, text }) {
  return (
    <>
      {loading && (
        <div className="align-items-center d-flex justify-content-center my-5">
          <Spinner style={{ width: "3rem", height: "3rem" }} type="grow" />
          <div className="ml-2">{text}</div>
        </div>
      )}
    </>
  );
}

StatusQueryLoading.propTypes = {
  loading: PropTypes.bool.isRequired,
  text: PropTypes.string,
};

export default StatusQueryLoading;
