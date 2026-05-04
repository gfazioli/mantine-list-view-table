import React from 'react';
import { render } from '@testing-library/react';
import { useDoubleTap } from './use-double-tap';

function TestTarget({ onDoubleTap }: { onDoubleTap: () => void }) {
  const { onPointerDown } = useDoubleTap({ onDoubleTap });
  return <div data-testid="target" onPointerDown={onPointerDown} />;
}

function fireTouch(target: Element, x: number, y: number) {
  // JSDOM strips `pointerType` when going through React's SyntheticEvent layer,
  // so dispatch a real Event and stamp the pointer fields onto it manually.
  const event: any = new Event('pointerdown', { bubbles: true, cancelable: true });
  event.pointerType = 'touch';
  event.clientX = x;
  event.clientY = y;
  target.dispatchEvent(event);
  return event;
}

describe('useDoubleTap', () => {
  it('fires onDoubleTap for two consecutive touch pointerdowns within the delay window', () => {
    const onDoubleTap = jest.fn();
    const { getByTestId } = render(<TestTarget onDoubleTap={onDoubleTap} />);
    const target = getByTestId('target');

    fireTouch(target, 10, 10);
    fireTouch(target, 12, 12);

    expect(onDoubleTap).toHaveBeenCalledTimes(1);
  });

  it('ignores mouse pointerdowns', () => {
    const onDoubleTap = jest.fn();
    const { getByTestId } = render(<TestTarget onDoubleTap={onDoubleTap} />);
    const target = getByTestId('target');

    const fireMouse = (x: number, y: number) => {
      const event: any = new Event('pointerdown', { bubbles: true, cancelable: true });
      event.pointerType = 'mouse';
      event.clientX = x;
      event.clientY = y;
      target.dispatchEvent(event);
    };

    fireMouse(10, 10);
    fireMouse(12, 12);

    expect(onDoubleTap).not.toHaveBeenCalled();
  });

  it('does not fire when the second tap exceeds the delay window', () => {
    const realNow = Date.now;
    let now = 1000;
    Date.now = () => now;

    try {
      const onDoubleTap = jest.fn();
      const { getByTestId } = render(<TestTarget onDoubleTap={onDoubleTap} />);
      const target = getByTestId('target');

      fireTouch(target, 10, 10);
      now += 500; // > 300ms default delay
      fireTouch(target, 12, 12);

      expect(onDoubleTap).not.toHaveBeenCalled();
    } finally {
      Date.now = realNow;
    }
  });

  it('does not fire when the second tap is too far from the first', () => {
    const onDoubleTap = jest.fn();
    const { getByTestId } = render(<TestTarget onDoubleTap={onDoubleTap} />);
    const target = getByTestId('target');

    fireTouch(target, 10, 10);
    fireTouch(target, 200, 200); // > 24px default threshold

    expect(onDoubleTap).not.toHaveBeenCalled();
  });

  it('preventDefault is called on the second tap so the wrapper can detect it', () => {
    const onDoubleTap = jest.fn();
    const { getByTestId } = render(<TestTarget onDoubleTap={onDoubleTap} />);
    const target = getByTestId('target');

    const first = fireTouch(target, 10, 10);
    expect(first.defaultPrevented).toBe(false); // first tap is only memorized

    const second = fireTouch(target, 12, 12);
    expect(onDoubleTap).toHaveBeenCalledTimes(1);
    expect(second.defaultPrevented).toBe(true);
  });
});
