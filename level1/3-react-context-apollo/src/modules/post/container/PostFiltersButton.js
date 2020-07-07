import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { Button } from "reactstrap";
import { connectAppContext } from "../../../store/AppContext";
import PostFiltersModal from "../components/PostFiltersModal";
import { setPostFiltersAction } from "../state/post.action";

const PostFiltersButton = ({ filters, setFilters }) => {
  console.log("### PostFiltersButton:", { filters });
  const [filterModalOpened, setFilterModalOpened] = useState(false);
  const openFilterModal = useCallback(() => setFilterModalOpened(true), []);
  const closeFilterModal = useCallback(() => setFilterModalOpened(false), []);

  const handleModalOk = useCallback(
    (newFilters) => {
      console.log("PostFiltersButton:onOk", { newFilters });
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
      <PostFiltersModal
        filters={filters}
        isOpen={filterModalOpened}
        onCancel={closeFilterModal}
        onOk={handleModalOk}
      />
    </div>
  );
};

PostFiltersButton.propTypes = {
  filters: PropTypes.array,
};

const mapStateToProps = (state) => {
  console.log("PostFiltersButton:", state);
  return {
    filters: state.postState.filters,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setFilters: (filters) => dispatch(setPostFiltersAction(filters)),
  };
};

const PostFiltersModalMemoz = React.memo(PostFiltersButton);
export default connectAppContext(
  mapStateToProps,
  mapDispatchToProps,
  PostFiltersModalMemoz
);
