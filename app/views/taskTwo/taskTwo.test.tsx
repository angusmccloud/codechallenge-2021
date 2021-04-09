import 'react-native';
import React from 'react';
import renderer, {act} from 'react-test-renderer';
// Note: test renderer must be required after react-native.
import TaskTwoScreen from './taskTwo';

jest.mock('@react-navigation/native');

describe('<TaskTwoScreen />', () => {
  it('should render successfully', async () => {
    const result = renderer.create(<TaskTwoScreen />);
    await act(async () => {
      expect(result).toBeDefined;
    });
  });
});
