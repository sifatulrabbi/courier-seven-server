import { config } from '../configs';

export function runOnDevMode(callback: () => void) {
  if (!config.PROD && config.NODE_ENV === 'development') {
    callback();
  }
}
