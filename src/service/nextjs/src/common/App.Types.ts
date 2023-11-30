// App.types.ts 파일에서 정의

interface RuleType {
	_id: string; // MongoDB의 ObjectId가 문자열로 표현됩니다.
	title: string;
	content: string[]; // content는 문자열 배열입니다.
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}

export default RuleType;
