import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import UserFiltersModal from "../components/UserFiltersModal";
import { setUserFiltersAction } from "../state/user.action";

const UserFiltersButton = ({ filters, setFilters }) => {
  console.log("### UserFiltersButton:", { filters });
  const [filterModalOpened, setFilterModalOpened] = useState(false);
  const openFilterModal = useCallback(() => setFilterModalOpened(true), []);
  const closeFilterModal = useCallback(() => setFilterModalOpened(false), []);

  const handleModalOk = useCallback(
    (newFilters) => {
      console.log("UserFiltersButton:onOk", { newFilters });
      setFilters(newFilters);
      closeFilterModal();
    },
    [setFilters, closeFilterModal]
  );

  return (
    <div>
      <Button className="ml-2" onClick={openFilterModal}>
        <div className="d-flex align-items-center">
          <FaFilter className="mr-1" />
          {filters && filters.length ? `(${filters.length})` : ""}
          <span className="ml-1">Filters</span>
        </div>
      </Button>
      <UserFiltersModal
        filters={filters}
        isOpen={filterModalOpened}
        onCancel={closeFilterModal}
        onOk={handleModalOk}
      />
    </div>
  );
};

UserFiltersButton.propTypes = {
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("UserFiltersButton:", state);
  return {
    filters: state.userState.filters,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setFilters: (filters) => dispatch(setUserFiltersAction(filters)),
  };
};

const UserFiltersModalMemoz = React.memo(UserFiltersButton);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFiltersModalMemoz);
