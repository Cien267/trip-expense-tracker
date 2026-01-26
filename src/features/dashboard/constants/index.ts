export const dashboardKeys = {
  all: ['dashboard'] as const,
  dashboard: () => [...dashboardKeys.all, 'dashboard'] as const,
}
