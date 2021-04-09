import 'react-native';
import React from 'react';
import renderer, {act} from 'react-test-renderer';
// Note: test renderer must be required after react-native.
import TaskFourScreen from './taskFour';

jest.mock('@react-navigation/native');

describe('<TaskFourScreen />', () => {
  it('should render successfully', async () => {
    const result = renderer.create(<TaskFourScreen />);
    await act(async () => {
      expect(result).toBeDefined;
    });
  });
});
