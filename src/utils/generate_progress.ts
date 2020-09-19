/* eslint-disable @typescript-eslint/no-unused-vars */
import { SubProjConfig } from "../types";
/* eslint-enable @typescript-eslint/no-unused-vars */

/**
 * Generate the title for the status check.
 */
export const generateProgressTitle = (subprojects: SubProjConfig[]): string => {
  let totalCheckCnt = 0;
  let completedCheckCnt = 0;
  const lookup: Record<string, boolean> = {};
  subprojects.forEach((subproject) => {
    subproject.checks.forEach((check) => {
      /* eslint-disable no-magic-numbers */
      if (!(check.id in lookup)) {
        totalCheckCnt += 1;
        if (check.satisfied) {
          completedCheckCnt += 1;
        }
        lookup[check.id] = true;
      }
      /* eslint-enable no-magic-numbers */
    });
  });
  const msg = `Pending (${completedCheckCnt}/${totalCheckCnt})`;
  return msg;
};

export const generateProgressSummary = (): string => {
  return "Some checks are pending";
};

/**
 * Generates a progress report for currently finished checks
 * which will be posted in the status check report.
 *
 * @param subprojects The subprojects that the PR matches.
 * @param checksStatusLookup The lookup table for checks status.
 */
export const generateProgressDetails = (
  subprojects: SubProjConfig[],
  checksStatusLookup: Record<string, string>,
): string => {
  let progress = "";
  subprojects.forEach((subproject) => {
    progress += `Summary for sub-project ${subproject.id}\n\n`;
    subproject.checks.forEach((check) => {
      let mark = " ";
      /* eslint-disable security/detect-object-injection */
      if (
        check.id in checksStatusLookup &&
        checksStatusLookup[check.id] == "success"
      ) {
        mark = "x";
      }
      progress += `- [${mark}] ${check.id} with status ${
        checksStatusLookup[check.id]
      }\n`;
      /* eslint-enable security/detect-object-injection */
    });
    progress += "\n";
  });
  progress += "Currently received checks are:\n\n";
  /* eslint-disable security/detect-object-injection */
  for (const avaiableCheck in checksStatusLookup) {
    progress += `- ${avaiableCheck} with status ${checksStatusLookup[avaiableCheck]}\n`;
  }
  progress += "\n";
  /* eslint-enable security/detect-object-injection */
  return progress;
};
