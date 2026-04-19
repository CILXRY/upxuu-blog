export interface CommitInfo {
	sha: string;
	shortSha: string;
	date: string;
	message: string;
	author: string;
}

/**
 * 获取最新的 Git commit 信息
 * 通过 GitHub API 获取
 */
export async function getLatestCommit(): Promise<CommitInfo | null> {
	try {
		// 在生产环境中，从 GitHub API 获取
		const response = await fetch('https://api.github.com/repos/ImUpXuu/myblog/commits?per_page=1', {
			headers: {
				'Accept': 'application/vnd.github.v3+json',
			},
			// 5 分钟缓存
			next: { revalidate: 300 }
		});

		console.log('[GitInfo] Response status:', response.status);

		if (!response.ok) {
			const errorText = await response.text();
			console.error('[GitInfo] API error:', response.status, errorText);
			throw new Error(`Failed to fetch commit info: ${response.status}`);
		}

		const commits = await response.json();
		console.log('[GitInfo] Commits data:', commits);
		
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
		console.error('[GitInfo] Error fetching git info:', error);
		return null;
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
