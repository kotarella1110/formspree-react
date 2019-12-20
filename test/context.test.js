import React from 'react';
import { StaticKit, useStaticKit } from '../src';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import StaticKitFactory from '@statickit/core';

jest.mock('@statickit/core');

const { act } = ReactTestUtils;

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('instantiates a client and provides it via useStaticKit hook', () => {
  StaticKitFactory.mockImplementation(({ site }) => `client for ${site}`);

  const Component = () => {
    const statickit = useStaticKit();
    return <div id="client">{statickit}</div>;
  };

  const Page = ({ site }) => {
    return (
      <StaticKit site={site}>
        <Component />
      </StaticKit>
    );
  };

  act(() => {
    ReactDOM.render(<Page site="xxx" />, container);
  });

  expect(container.querySelector('#client').textContent).toBe('client for xxx');
});
