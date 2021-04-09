import 'react-native';
import React from 'react';
import renderer, {act} from 'react-test-renderer';
// Note: test renderer must be required after react-native.
import TaskOneScreen from './taskOne';

jest.mock('@react-navigation/native');

describe('<TaskOneScreen />', () => {
  it('should render successfully', async () => {
    const result = renderer.create(<TaskOneScreen />);
    await act(async () => {
      expect(result).toBeDefined;
    });
  });
});
