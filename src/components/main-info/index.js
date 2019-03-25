import React, { PureComponent, Fragment, createRef } from "react";
import * as PropTypes from "prop-types";
import { numberWithCommas } from "../app/context";
import Counter from "../counter";

class MainInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      action: "",
      background: "",
      totalCount: "",
      state: "",
    };
    this.props.addListener(state => {
      this.setState({
        id: state.data.id,
        action: state.data.action,
        background: state.data.background,
        totalCount: state.data.signature_count,
        state: state.data.state,
      })
    });
    this.countRef = createRef();
    this.currentCount = 0;
  }


  componentDidMount() {
    this.props.initialise();
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   const { totalCount } = this.state;
  //
  //   if (prevState.totalCount !== totalCount) {
  //     this.updateCount();
  //   }
  // }

  updateCount() {
    const { formatNumber } = this.props;
    const { totalCount } = this.state;

    if (!this.initialUpdateDone) {
      this.initialUpdateDone = true;
      this.currentCount = totalCount;
    } else if (this.currentCount < totalCount) {
      this.currentCount++;
    } else if (this.currentCount > totalCount) {
      this.currentCount--;
    }

    this.countRef.current.innerHTML = formatNumber(this.currentCount);

    if (this.currentCount !== totalCount) {
      requestAnimationFrame(() => {
        setTimeout(() => this.updateCount(), 100 / (totalCount - this.currentCount))
      });
    }
  }

  render() {
    const { action = 'Petition', background, id, state, totalCount } = this.state;
    const { formatNumber } = this.props;

    if (!('ontouchstart' in window)) {
      document.title = `${action} (${numberWithCommas(totalCount)})`;
    }

    return (
      <Fragment>
        <h1>
          <a
            target="_blank"
            href={`https://petition.parliament.uk/petitions/${id}`}
            title="Click to open petition on new tab"
            className="link"
            rel="noreferrer"
          >
            {action}
          </a>
        </h1>
        <section>
          {background}
        </section>
        <h3>
          <Counter count={totalCount} format={formatNumber}/>
          <span className="signaturesSuffix">signatures</span>
          {state === "open" && (
            <a
              target="_blank"
              href={`https://petition.parliament.uk/petitions/${id}/signatures/new`}
              title="Click to open petition on new tab"
              className="button"
              rel="noreferrer"
            >
              Sign it
            </a>
          )}
        </h3>
      </Fragment>
    );
  }
}

MainInfo.defaultProps = {
  initialise: () => {},
  formatNumber: () => {},
  addListener: () => {}
};

MainInfo.propTypes = {
  initialise: PropTypes.func,
  formatNumber: PropTypes.func,
  addListener: PropTypes.func
};

export default MainInfo;
