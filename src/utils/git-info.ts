export interface CommitInfo {
	sha: string;
	shortSha: string;
	date: string;
	message: string;
	author: string;
}

/**
 * 带重试机制的 fetch 函数
 */
async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3): Promise<Response> {
	for (let i = 0; i < retries; i++) {
		try {
			const response = await fetch(url, options);
			if (response.ok) {
				return response;
			}
			// 如果是 403 或 429，等待后重试
			if (response.status === 403 || response.status === 429) {
				const retryAfter = response.headers.get('retry-after');
				const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : Math.pow(2, i) * 1000;
				console.warn(`GitHub API rate limited, waiting ${waitTime}ms before retry...`);
				await new Promise(resolve => setTimeout(resolve, waitTime));
				continue;
			}
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		} catch (error) {
			if (i === retries - 1) throw error;
			const waitTime = Math.pow(2, i) * 1000;
			console.warn(`Fetch failed, retrying in ${waitTime}ms...`, error);
			await new Promise(resolve => setTimeout(resolve, waitTime));
		}
	}
	throw new Error('All retries failed');
}

/**
 * 获取最新的 Git commit 信息
 * 通过 GitHub API 获取
 */
export async function getLatestCommit(): Promise<CommitInfo | null> {
	try {
		const headers: Record<string, string> = {
			'Accept': 'application/vnd.github.v3+json',
		};
		
		// 如果有 GitHub Token，使用它来避免速率限制
		const token = import.meta.env.GITHUB_TOKEN;
		if (token) {
			headers['Authorization'] = `token ${token}`;
		}

		const response = await fetchWithRetry(
			'https://api.github.com/repos/ImUpXuu/myblog/commits?per_page=1',
			{
				headers,
			}
		);

		const commits = await response.json();
		if (commits && commits.length > 0) {
			const commit = commits[0];
			return {
				sha: commit.sha,
				shortSha: commit.sha.substring(0, 7),
				date: commit.commit.author.date,
				message: commit.commit.message,
				author: commit.commit.author.name
			};
		}
		return null;
	} catch (error) {
		console.error('Error fetching git info:', error);
		// 返回 null，让页面继续渲染，只是不显示 commit 信息
		return null;
	}
}

/**
 * 获取 commit 历史记录（用于 diff 页面）
 */
export async function getCommitHistory(limit = 100): Promise<CommitInfo[]> {
	try {
		const headers: Record<string, string> = {
			'Accept': 'application/vnd.github.v3+json',
		};
		
		const token = import.meta.env.GITHUB_TOKEN;
		if (token) {
			headers['Authorization'] = `token ${token}`;
		}

		const response = await fetchWithRetry(
			`https://api.github.com/repos/ImUpXuu/myblog/commits?per_page=${limit}`,
			{ headers }
		);

		const commits = await response.json();
		return commits.map((commit: any) => ({
			sha: commit.sha,
			shortSha: commit.sha.substring(0, 7),
			date: commit.commit.author.date,
			message: commit.commit.message,
			author: commit.commit.author.name
		}));
	} catch (error) {
		console.error('Error fetching commit history:', error);
		return [];
	}
}

/**
 * 格式化相对时间
 */
export function formatRelativeTime(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 60) {
		return '刚刚';
	}

	const diffInMinute = Math.floor(diffInSeconds / 60);
	if (diffInMinute < 60) {
		return `${diffInMinute} 分钟前`;
	}

	const diffInHour = Math.floor(diffInMinute / 60);
	if (diffInHour < 24) {
		return `${diffInHour} 小时前`;
	}

	const diffInDay = Math.floor(diffInHour / 24);
	if (diffInDay < 30) {
		return `${diffInDay} 天前`;
	}

	const diffInMonth = Math.floor(diffInDay / 30);
	if (diffInMonth < 12) {
		return `${diffInMonth} 个月前`;
	}

	const diffInYear = Math.floor(diffInDay / 365);
	return `${diffInYear} 年前`;
}

/**
 * 格式化绝对日期
 */
export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	// 加上 8 小时（北京时间）
	date.setHours(date.getHours() + 8);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hour = String(date.getHours()).padStart(2, '0');
	const minute = String(date.getMinutes()).padStart(2, '0');
	
	return `${year}-${month}-${day} ${hour}:${minute}`;
}
