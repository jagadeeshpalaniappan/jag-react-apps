import PropTypes from "prop-types";
import React from "react";
import { AppCard, AppModal } from "../../common/components";
import PostFiltersModalForm from "./PostFiltersModalForm";

const PostFiltersModal = ({ filters, isOpen, onOk, onCancel }) => {
  console.log("### PostFiltersModal:", { filters });

  return (
    <AppModal toggle={onCancel} isOpen={isOpen}>
      <AppCard>
        <legend>Post Filter</legend>
        <PostFiltersModalForm
          filters={filters}
          onOk={onOk}
          onCancel={onCancel}
        />
      </AppCard>
    </AppModal>
  );
};

PostFiltersModal.propTypes = {
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default React.memo(PostFiltersModal);
