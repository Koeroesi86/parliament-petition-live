import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import ConstituentSummary from "../by-constituentcy-item";

class ByConstituency extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { byConstituency: [], totalCount: 1 };
    this.props.addListener(state => {
      this.setState({
        byConstituency: state.data.signatures_by_constituency,
        totalCount: state.data.signature_count
      });
    });
  }

  render() {
    let { byConstituency, totalCount } = this.state;
    const sortItems = (a, b) => b.signature_count - a.signature_count;
    const mapItems = item => <ConstituentSummary key={item.ons_code} {...item} totalCount={totalCount}/>;
    return (
      <div className="list">
        <div className="header">By constituencies</div>
        <div className="scrollable">
          {byConstituency && byConstituency.sort(sortItems).map(mapItems)}
        </div>
      </div>
    );
  }
}

ByConstituency.propTypes = {
  byConstituency: PropTypes.any,
  totalCount: PropTypes.number
};

export default ByConstituency;
