/**
 * 获取 Git commit hash
 * 在构建时通过环境变量注入
 */

export function getGitCommitHash(): string {
	// 优先使用环境变量（由 CI/CD 注入）
	if (import.meta.env.PUBLIC_COMMIT_HASH) {
		return import.meta.env.PUBLIC_COMMIT_HASH;
	}
	
	// 本地开发时返回开发标识
	return 'development';
}

export function getGitCommitDate(): string {
	// 优先使用环境变量（由 CI/CD 注入）
	if (import.meta.env.PUBLIC_COMMIT_DATE) {
		return import.meta.env.PUBLIC_COMMIT_DATE;
	}
	
	return new Date().toISOString().split('T')[0];
}
