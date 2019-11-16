export const KARMA_RESET = 'KARMA_RESET';

/**
 * Action creators and functions handling everything happening to karma.
 * @namespace
 * @name karmaActions
 * @TODO implement karma actions here
 */
export const karmaActions = {
  resetKarma,
};

export const karmaReset = group => {
  return {
    type: KARMA_RESET,
    group,
  };
};

export function resetKarma(group) {
  if (group) {
    // reset group karma
    // dispatch updapteGroup
  }
}
