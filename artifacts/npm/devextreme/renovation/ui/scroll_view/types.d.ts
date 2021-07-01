/**
* DevExtreme (renovation/ui/scroll_view/types.d.ts)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export interface ScrollableBoundary {
  reachedBottom: boolean;
  reachedLeft: boolean;
  reachedRight: boolean;
  reachedTop: boolean;
}

export interface ScrollEventArgs extends Partial<ScrollableBoundary> {
  event?: Event;
  scrollOffset: ScrollOffset;
}

export type ScrollableShowScrollbar = 'onScroll' | 'onHover' | 'always' | 'never';

export type ScrollableDirection = 'both' | 'horizontal' | 'vertical';

export type RefreshStrategy = 'pullDown' | 'swipeDown' | 'simulated';
export interface ScrollOffset {
  top: number;
  left: number;
}

export interface DxMouseEvent extends MouseEvent {
  originalEvent: DxMouseEvent;
  delta: number;
  isScrollingEvent: boolean;
  cancel: boolean;
  velocity: { x: number; y: number };
}

export interface DxKeyboardEvent extends KeyboardEvent {
  originalEvent: DxKeyboardEvent;
}
