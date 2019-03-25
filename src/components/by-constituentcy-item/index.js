import React from "react";
import AppContext from "../app/context";
import Counter from "../counter";

const ConstituentSummary = ({ name, mp, signature_count = 0, totalCount }) => (
  <div className="item">
    <div className="mainField">
      {name}
      <span className="meta">[MP: {mp && mp.replace(' MP', '').replace('Rt Hon ', '')}]</span>
    </div>
    <div className="field">
      <AppContext.Consumer>
        {({ formatNumber }) => (
          <Counter format={formatNumber} count={signature_count} />
        )}
      </AppContext.Consumer>
      <span>({((signature_count / totalCount) * 100).toFixed(2)}%)</span>
    </div>
  </div>
);

export default ConstituentSummary;
