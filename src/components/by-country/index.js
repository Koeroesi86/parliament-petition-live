import * as PropTypes from "prop-types";
import React, { PureComponent } from "react";
import CountrySummary from "../by-country-item";

class ByCountry extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { byCountry: [], totalCount: 1 };
    this.props.addListener(state => {
      this.setState({
        byCountry: state.data.signatures_by_country,
        totalCount: state.data.signature_count
      });
    });
  }

  render() {
    let { byCountry, totalCount } = this.state;
    const sortItems = (a, b) => b.signature_count - a.signature_count;
    const mapItems = item => <CountrySummary key={item.code} {...item} totalCount={totalCount}/>;
    return (
      <div className="list">
        <div className="header">By countries</div>
        <div className="scrollable">
          {byCountry && byCountry.sort(sortItems).map(mapItems)}
        </div>
      </div>
    );
  }
}

ByCountry.defaultProps = {
  addListener: () => {}
};

ByCountry.propTypes = {
  addListener: PropTypes.func
};

export default ByCountry;
