import React from 'react';
import renderer from 'react-test-renderer';
import {eIcons} from 'models';
import Icon from './icon';

describe('Icon Component rendered correctly', () => {
  it('Task One Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.taskOne} />);
    expect(icon).toMatchSnapshot();
  });
  it('Task One Focused Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.taskOneFocused} />);
    expect(icon).toMatchSnapshot();
  });
  it('Task Two Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.taskTwo} />);
    expect(icon).toMatchSnapshot();
  });
  it('Task Two Focused Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.taskTwoFocused} />);
    expect(icon).toMatchSnapshot();
  });
  it('Task Three Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.taskThree} />);
    expect(icon).toMatchSnapshot();
  });
  it('Task Three Focused Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.taskThreeFocused} />);
    expect(icon).toMatchSnapshot();
  });
  it('Task Four Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.taskFour} />);
    expect(icon).toMatchSnapshot();
  });
  it('Task Four Focused Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.taskFourFocused} />);
    expect(icon).toMatchSnapshot();
  });
  it('About Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.about} />);
    expect(icon).toMatchSnapshot();
  });
  it('About Focused Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.aboutFocused} />);
    expect(icon).toMatchSnapshot();
  });
  it('Backspace Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.backspace} />);
    expect(icon).toMatchSnapshot();
  });
});
