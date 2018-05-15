import React, { Component } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash.find';
import debounce from 'lodash.debounce';

import createAbsoluteGrid from '../../../src/AbsoluteGrid';
import screens from './sampleData';

class ExampleView extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      data: screens,
    };

    this.onMove = ::this.onMove;

    this.AbsoluteGrid = createAbsoluteGrid(
      ({ item }) => (
        <div
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            backgroundImage: `url('${item.url}')`,
          }}
          className="gridItem"
        >
          <span className="name">{item.name}</span>
        </div>
      ),
      { someProp: 'my component needs this' },
    );
  }

  onMove(source, target) {
    const Testsource = find(this.state.data, { key: parseInt(source, 10) });
    const Testtarget = find(this.state.data, { key: parseInt(target, 10) });

    const targetSort = Testtarget.sort;

    const newScreens = this.state.data.map((item) => {
      if (item.key === Testsource.key) {
        return {
          ...item,
          sort: targetSort,
        };
      } else if (
        Testtarget.sort > Testsource.sort &&
        (item.sort <= Testtarget.sort && item.sort > Testsource.sort)
      ) {
        return {
          ...item,
          sort: item.sort - 1,
        };
      } else if (item.sort >= Testtarget.sort && item.sort < Testsource.sort) {
        return {
          ...item,
          sort: item.sort + 1,
        };
      }
      return item;
    });
    this.setState({ data: newScreens });
  }

  render() {
    const AbsoluteGrid = this.AbsoluteGrid;
    const onMoveDebounced = debounce(this.onMove, 40);
    return (
      <div style={{ minHeight: '100vh' }}>
        {/* <AbsoluteGrid items={this.state.data} responsive /> */}
        {/* <AbsoluteGrid
          dragEnabled
          items={this.state.data}
          zoom={0.7}
          responsive
          verticalMargin={42}
          itemWidth={230}
          itemHeight={409}
        /> */}
        <AbsoluteGrid
          onMove={onMoveDebounced}
          dragEnabled
          items={this.state.data}
          zoom={0.7}
          responsive
          verticalMargin={42}
          itemWidth={230}
          itemHeight={409}
        />
      </div>
    );
  }
}

export default ExampleView;
