export interface SubProjConfig {
  /**
   * The ID for the sub-project
   */
  id: string;
  /**
   * The paths that defines
   * this sub-project within
   * the repository.
   */
  paths: string[];
  /**
   * A list of check IDs that
   * are expected to pass for
   * the sub-project.
   */
  checks: string[];
}

export interface CheckGroupConfig {
  /**
   * The sub-project configurations.
   */
  subProjects: SubProjConfig[];
}

/**
 * The result of the processing pipeline.
 */
export type CheckResult = "all_passing" | "has_failure" | "pending";
