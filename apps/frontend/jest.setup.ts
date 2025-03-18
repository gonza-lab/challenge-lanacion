/* eslint-disable @typescript-eslint/no-empty-object-type, no-undef, @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom'

declare global {
  interface Element {}
  interface IntersectionObserverEntry {}
}

class MockIntersectionObserver implements IntersectionObserver {
  root: Element | null = null;
  rootMargin: string = "";
  thresholds: ReadonlyArray<number> = [];

  constructor() {}

  disconnect(): void {}
  observe(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve(): void {}
}

// Definir IntersectionObserver globalmente para Jest
(global as any).IntersectionObserver = MockIntersectionObserver;