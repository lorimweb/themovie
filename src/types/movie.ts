export interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	release_date: string;
	vote_average: number;
	vote_count: number;
	adult?: boolean;
	genre_ids?: number[];
	original_language?: string;
	original_title?: string;
	popularity?: number;
	video?: boolean;
	media_type?: string;
}

export interface MovieResponse {
	results: Movie[];
	page: number;
	total_pages: number;
	total_results: number;
}