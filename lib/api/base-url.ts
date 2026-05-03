export function resolveApiBaseUrl(fallback = "http://localhost:4000/api"): string {
	const configured = process.env.EXPO_PUBLIC_API_BASE_URL || fallback;
	return configured.replace(/\/$/, "");
}

