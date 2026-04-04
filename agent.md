# Agent Context — TIL 프로젝트

> 이 파일은 GitHub Copilot이 매 요청마다 참고하는 프로젝트 컨텍스트 파일이다.
> 요청을 처리하기 전에 이 파일을 먼저 읽고, 프로젝트 규칙과 구조를 파악한 뒤 작업할 것.

---

## 프로젝트 개요

- **이름**: TIL (Today I Learn)
- **목적**: 개인 학습 내용을 카테고리별 Markdown 파일과 일부 실습 프로젝트로 정리하는 저장소
- **기본 언어**: 한국어로 작성 (코드, 파일명, 기술 용어는 영어 혼용 허용)
- **패키지 매니저**: 루트와 `Language/NextJs/Project/` 모두 Yarn Berry (v4) 사용
- **README 관리 방식**: 루트 `README.md`는 자동 생성 파일이며 직접 수정하지 않음

---

## 현재 디렉토리 구조 및 역할

<!-- AUTO-GENERATED:PROJECT_STRUCTURE:START -->

```text
TIL/
├── Books/ # 책 정리 및 독후감
├── CS/ # CS 이론 정리
├── CodingTest/ # 코딩 테스트 이론/문제 풀이
│   ├── DFS-BFS/ # DFS/BFS 관련 학습
│   │   ├── 문제/ # DFS/BFS 관련 문제 풀이
│   │   └── 이론/ # DFS/BFS 이론 정리
│   └── Graph/ # 그래프 관련 학습
│       ├── Kruskal/
│       │   └── 이론/
│       └── UnionFind/ # Union-Find 관련 학습
│           └── 이론/ # Union-Find 이론 정리
├── Language/ # 언어/프레임워크별 학습 내용
│   ├── CSS/ # CSS 실습 파일
│   ├── HTML/ # HTML 실습 파일
│   ├── JavaScript/ # JavaScript 학습 내용
│   │   └── 이론/ # JavaScript 이론 정리
│   ├── NextJs/ # Next.js 학습 내용
│   │   ├── Project/ # Next.js 실습 프로젝트
│   │   └── 이론/ # Next.js 이론 정리
│   ├── React/ # React 학습 내용
│   │   └── 이론/ # React 이론 정리
│   └── TypeScript/ # TypeScript 학습 내용
│       └── 이론/ # TypeScript 이론 정리
├── .husky/ # Git hook 설정
├── .scripts/ # 자동화 스크립트
│   ├── generate_agent.mjs # agent.md 구조 자동 동기화 스크립트
│   ├── generate_tree.sh # README.md 트리 자동 생성 스크립트
│   └── readme_template.md # README 템플릿
├── .vscode/ # 워크스페이스 설정
├── .lintstagedrc.json # lint-staged 설정
├── .prettierrc # Prettier 설정
├── commitlint.config.js # commitlint 설정
├── package.json # 루트 스크립트 및 도구 설정
├── agent.md # (이 파일) 프로젝트 컨텍스트 파일
└── README.md # 자동 생성됨 — 직접 수정 금지
```

<!-- AUTO-GENERATED:PROJECT_STRUCTURE:END -->

---

## Markdown 작성 규칙

### 파일 위치

| 카테고리                          | 경로                                              |
| --------------------------------- | ------------------------------------------------- |
| 책 정리                           | `Books/<책 제목>.md`                              |
| CS 이론                           | `CS/<주제>.md`                                    |
| 코딩 테스트 문제 풀이             | `CodingTest/<알고리즘>/문제/<문제명>.md`          |
| 코딩 테스트 이론                  | `CodingTest/<알고리즘>/이론/<주제>.md`            |
| 세부 분류가 있는 코딩 테스트 이론 | `CodingTest/<상위분류>/<알고리즘>/이론/<주제>.md` |
| JS/TS/React/Next 이론             | `Language/<기술>/이론/<주제>.md`                  |

<!-- AUTO-GENERATED:PATH_EXAMPLES:START -->

- 현재 예시
  - `CodingTest/DFS-BFS/문제/음료수-얼려-먹기.md`
  - `CodingTest/DFS-BFS/이론/BFS.md`
  - `CodingTest/Graph/Kruskal/이론/Kruskal.md`
  - `Language/TypeScript/이론/제네릭.md`
  <!-- AUTO-GENERATED:PATH_EXAMPLES:END -->

### 파일 네이밍 규칙

- **영어**: 소문자 + 하이픈 사용 (`event-loop.md`, `call-apply-bind.md`)
- **한국어**: 한글 유지, 공백은 하이픈으로 연결 (`브라우저-렌더링.md`)
- **약어/고유명**: 프로젝트에서 이미 널리 쓰는 표기는 유지 가능 (`SSR-CSR.md`, `web-API.md`, `BFS.md`, `DFS.md`, `JSX.md`)
- **기존 파일명 존중**: 이미 저장소에 정착된 파일명은 불필요하게 리네이밍하지 않음

### 포맷 규칙

- 제목은 `#`, `##`, `###` 계층 구조 사용
- Books 카테고리는 `## 1. 제목` 형식을 우선 사용
- 일반 목록은 `-`를 기본으로 사용하고, 단계 설명이나 순서가 중요한 경우 번호 목록 사용 가능
- 코드 블록은 언어를 명시 (` ```js `, ` ```ts `, ` ```tsx `, ` ```bash ` 등)
- 한국어 서술체로 작성하고 존댓말은 사용하지 않음 (`~이다`, `~한다`)
- 핵심 개념, 용어, 코드 인라인은 필요에 따라 `**굵게**` 또는 `` `백틱` ``으로 강조
- 내부 링크는 가능하면 상대 경로 사용 (`[텍스트](./파일명.md)`, `<a href="./파일명.md">텍스트</a>`)

### 내용 보완 시 주의사항

- 기존 작성자의 어투와 서술 방식 유지
- 기존 형식(섹션 구조, 헤딩 레벨)을 해치지 않음
- 구체적인 예시, 코드, 핵심 포인트를 불릿 리스트로 보완
- 마무리 섹션(`---` 구분선 + `## 책을 읽고 나서`)은 Books 카테고리에서 필요할 때 추가 가능

---

## 툴링 및 스크립트

| 도구            | 역할                                                       |
| --------------- | ---------------------------------------------------------- |
| **Prettier**    | 코드/문서 포맷터 (`.prettierrc` 기준)                      |
| **Husky**       | pre-commit: lint-staged 실행, commit-msg: commitlint 실행  |
| **lint-staged** | 스테이징된 `js,jsx,ts,tsx,json,css,scss,md,html` 파일 포맷 |
| **commitlint**  | 커밋 메시지 검사 (conventional 기반, 일부 규칙 비활성화)   |
| **commitizen**  | `cz-conventional-changelog` 기반 커밋 도우미               |

### 주요 스크립트

```bash
yarn sync:meta # README.md와 agent.md의 구조 정보를 동기화
yarn commit    # pre-commit에서 메타 파일 동기화 후 날짜(YYYY-MM-DD)로 자동 커밋
yarn format   # 전체 파일 Prettier 포맷
```

### Prettier 설정 요약 (`.prettierrc`)

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "quoteProps": "consistent",
  "trailingComma": "none",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "auto"
}
```

---

## README.md 자동 생성

- 루트 `README.md`는 `.scripts/readme_template.md` + `.scripts/generate_tree.sh`로 생성됨
- `Books/*.md`, `CS/*.md`, `CodingTest/**/*.md`, `Language/*/이론/*.md`가 루트 README 트리에 포함됨
- `CodingTest`는 중첩 디렉토리 구조를 유지한 채 재귀적으로 렌더링됨 (`문제/`, `이론/`, 세부 분류 포함)
- `Language/NextJs/Project/**`, `Language/HTML/**`, `Language/CSS/**` 같은 프로젝트/비마크다운 영역은 루트 README 트리에서 제외됨
- commit hook에서 실행되는 메타 동기화는 working tree가 아니라 `git index` 기준으로 생성되므로, unstaged 파일은 README/agent 자동 반영 대상에 포함되지 않음
- **직접 수정 금지** - 수정해도 다음 `yarn commit` 또는 스크립트 실행 시 덮어씌워짐
- 새 파일을 `Books`, `CS`, `CodingTest`, `Language/*/이론/` 규칙에 맞게 추가하면 README 생성 대상에 포함됨

---

## 작업 처리 가이드

### 새 TIL 파일 생성 요청 시

1. 카테고리에 맞는 경로에 파일 생성
2. `# 제목`으로 시작하고 한국어 서술체로 작성
3. 코드 예시, 핵심 개념, 예외 사항을 필요한 만큼 포함
4. `Books`, `CS`, `CodingTest`, `Language/*/이론/` 경로에 생성하는 경우 루트 README 자동 생성 대상임을 안내

### 기존 파일 내용 보완 요청 시

1. 기존 어투와 형식 유지
2. 빈 내용이나 단순한 설명에 구체적인 예시/코드 추가
3. 핵심 포인트는 불릿 리스트 또는 짧은 문단으로 구조화
4. 원문의 헤딩 레벨 구조를 임의로 변경하지 않음

### 파일 이동/삭제 시

- `mv` 명령어 사용
- `Books`, `CS`, `CodingTest`, `Language/*/이론/` 경로 변경 시 README 트리에 미치는 영향 확인
- `CodingTest`는 `문제/`, `이론/`, 세부 분류 디렉토리 구조를 유지한 채 이동 여부를 판단

---

## 기타 참고사항

- `.gitignore`에 `node_modules/`, `.yarn/cache` 등 포함
- Next.js 실습 프로젝트는 `Language/NextJs/Project/`에 위치하며 별도의 `package.json`을 가짐
<!-- AUTO-GENERATED:CODINGTEST_SUMMARY:START -->
- `CodingTest`는 현재 `DFS-BFS`, `Graph/Kruskal`, `Graph/UnionFind` 구조를 사용 중이며 이후 더 확장될 수 있음
<!-- AUTO-GENERATED:CODINGTEST_SUMMARY:END -->
- `agent.md`의 구조 관련 일부 블록은 `.scripts/generate_agent.mjs`와 commit hook으로 자동 동기화됨
- 루트 `README.md`는 학습 이론 노트 목록용이며 저장소 전체 인덱스는 아님
- 이 저장소는 1인 운영 기준이며 기본 브랜치는 `main`이다
