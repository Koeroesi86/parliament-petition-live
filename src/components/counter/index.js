import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';

class Counter extends PureComponent {
  constructor(props) {
    super(props);
    this.countRef = createRef();
    this.currentCount = 0;
    this.state = {
      displayCount: 0
    };
    this.onVisibilityChange = this.onVisibilityChange.bind(this);
  }

  componentDidMount() {
    this.updateCount();

    document.addEventListener("visibilitychange", this.onVisibilityChange);
  }

  componentWillUnmount() {
    document.removeEventListener("visibilitychange", this.onVisibilityChange)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.count !== this.props.count) {
      this.updateCount();
    }
  }

  onVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      cancelAnimationFrame(this.frame);
    }
    if (document.visibilityState === 'visible') {
      this.updateCount();
    }
  }

  updateCount() {
    const { format, count, animationSteps } = this.props;
    if (this.currentCount === count) return;

    if (!this.initialUpdateDone || 'ontouchstart' in window) {
      if (count) this.initialUpdateDone = true;
      this.currentCount = count;
    } else if (this.currentCount < count) {
      this.currentCount += Math.floor((count - this.currentCount) / animationSteps) + 1;
    } else if (this.currentCount > count) {
      this.currentCount -= Math.floor((this.currentCount - count) / animationSteps) + 1;
    }

    this.countRef.current.textContent = format(this.currentCount);

    if (this.currentCount !== count) {
      cancelAnimationFrame(this.frame);
      this.frame = requestAnimationFrame(() => {
        setTimeout(() => this.updateCount(), 100 / (count - this.currentCount))
      });
    }
  }

  render() {
    return (
      <span ref={this.countRef} />
    )
  }
}

Counter.defaultProps = {
  count: 0,
  animationSteps: 30,
  format: a => a,
};

Counter.propTypes = {
  count: PropTypes.oneOfType([
    PropTypes.number,
    (propValue, key, componentName, location, propFullName) => {
      if (isNaN(propValue[key])) {
        return new Error(`Invalid prop "${propFullName}" supplied to "${componentName}". Validation failed.`);
      }
    }
  ]),
  animationSteps: PropTypes.number,
  format: PropTypes.func,
};

export default Counter;
