# Agent Context — TIL 프로젝트

> 이 파일은 GitHub Copilot이 매 요청마다 참고하는 프로젝트 컨텍스트 파일이다.
> 요청을 처리하기 전에 이 파일을 먼저 읽고 프로젝트 규칙과 구조를 파악한 뒤 작업할 것.

---

## 프로젝트 개요

- **이름**: TIL (Today I Learn)
- **목적**: 개인 학습 내용을 카테고리별로 Markdown 파일로 정리하는 저장소
- **언어**: 한국어로 작성 (코드, 파일명은 영어 혼용 허용)
- **패키지 매니저**: Yarn Berry (v4) — `npm` 또는 `npx` 대신 `yarn` 사용

---

## 디렉토리 구조 및 역할

```
TIL/
├── Books/              # 책 독후감 및 핵심 내용 정리
├── CS/                 # CS 이론 (프로세스, 스레드, 네트워크 등)
├── CodingTest/         # 코딩 테스트 문제 풀이
│   └── Greedy/
├── Language/           # 언어 및 프레임워크별 학습 내용
│   ├── CSS/            # CSS 실습 파일 (.html, .css)
│   ├── HTML/           # HTML 실습 파일 (.html)
│   ├── JavaScript/
│   │   └── 이론/       # JS 이론 정리 (.md)
│   ├── React/
│   │   └── 이론/       # React 이론 정리 (.md)
│   ├── NextJs/
│   │   ├── 이론/       # Next.js 이론 정리 (.md)
│   │   └── Project/    # Next.js 실습 프로젝트
│   └── TypeScript/     # TypeScript 이론 정리 (.md)
├── .scripts/
│   ├── generate_tree.sh      # README.md 트리 자동 생성 스크립트
│   └── readme_template.md    # README 템플릿
├── agent.md            # (이 파일) Copilot 컨텍스트 파일
└── README.md           # 자동 생성됨 — 직접 수정 금지
```

---

## Markdown 작성 규칙

### 파일 위치

| 카테고리              | 경로                                |
| --------------------- | ----------------------------------- |
| 책 정리               | `Books/<책 제목>.md`                |
| CS 이론               | `CS/<주제>.md`                      |
| 코딩 테스트           | `CodingTest/<알고리즘>/<문제명>.md` |
| JS/TS/React/Next 이론 | `Language/<기술>/이론/<주제>.md`    |

### 파일 네이밍 규칙 (kebab-case)

- **영어**: 소문자 + 하이픈 (`EventLoop.md` → `event-loop.md`, `Closure.md` → `closure.md`)
- **영어 여러 단어**: 공백/쉼표 → 하이픈 (`call, apply, bind.md` → `call-apply-bind.md`)
- **한국어**: 한글 유지, 공백/특수문자(`&`, `,`) → 하이픈 (`브라우저 렌더링.md` → `브라우저-렌더링.md`)
- **약어**: 대문자 유지 (`SSR-CSR.md`, `web-API.md`)
- `prototype.md` 같이 이미 소문자 단일 단어인 경우 그대로 유지

### 포맷 규칙

- 제목은 `#`, `##`, `###` 계층 구조 사용
- 섹션 번호는 `## 1. 제목` 형식 (Books 카테고리)
- 이론 정리는 **굵게** 강조, 코드 인라인은 `` `백틱` `` 사용
- 코드 블록은 언어 명시: ` ```js `, ` ```ts `, ` ```bash ` 등
- 목록(리스트)은 `-` 사용
- 한국어 서술체로 작성, 존댓말 사용 안 함 (예: "~이다", "~한다")
- 내부 링크는 `<a href="./파일명.md">텍스트</a>` 또는 `[텍스트](./파일명.md)` 형식

### 내용 보완 시 주의사항

- 기존 작성자의 어투와 서술 방식 유지
- 형식(섹션 구조, 헤딩 레벨)을 해치지 않음
- 구체적인 예시, 코드, 핵심 포인트를 불릿 리스트로 보완
- 마무리 섹션(`---` 구분선 + `## 책을 읽고나서`)은 원문에 없으면 추가 가능

---

## 툴링 및 스크립트

| 도구            | 역할                                                          |
| --------------- | ------------------------------------------------------------- |
| **Prettier**    | 코드 포맷터 (`.prettierrc` 기준)                              |
| **Husky**       | pre-commit: lint-staged 실행, commit-msg: commitlint 실행     |
| **lint-staged** | 스테이징된 `js,ts,json,css,md,html` 파일에 Prettier 자동 적용 |
| **commitlint**  | 커밋 메시지 검사 (conventional 형식, 단 규칙은 모두 비활성화) |
| **commitizen**  | `cz-conventional-changelog` 기반 커밋 도우미                  |

### 주요 스크립트

```bash
yarn commit   # generate_tree.sh 실행 후 날짜(YYYY-MM-DD)로 자동 커밋
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
  "trailingComma": "none",
  "arrowParens": "avoid"
}
```

---

## README.md 자동 생성

- `README.md`는 `.scripts/generate_tree.sh`가 자동으로 생성함
- `Language/<기술>/이론/` 하위 `.md` 파일만 트리에 포함됨
- **직접 수정 금지** — 수정해도 다음 `yarn commit` 시 덮어씌워짐
- 새 이론 파일을 추가하면 자동으로 README에 반영됨

---

## 작업 처리 가이드

### 새 TIL 파일 생성 요청 시

1. 카테고리에 맞는 경로에 파일 생성
2. `# 제목` 으로 시작, 한국어 서술체 작성
3. 코드 예시, 핵심 개념 포함
4. `Language/*/이론/` 경로에 생성 시 README에 자동 반영됨을 안내

### 기존 파일 내용 보완 요청 시

1. 기존 어투와 형식 유지
2. 빈 내용이나 단순한 설명에 구체적인 예시/코드 추가
3. 불릿 리스트로 핵심 포인트 구조화
4. 원문의 헤딩 레벨 구조를 변경하지 않음

### 파일 이동/삭제 시

- `mv` 명령어 사용 (터미널)
- `Language/*/이론/` 경로 변경 시 README 트리에 영향을 줌을 확인

---

## 기타 참고사항

- `.gitignore`에 `node_modules/`, `.yarn/cache` 등 포함
- Next.js 실습 프로젝트는 `Language/NextJs/Project/`에 위치 (별도의 `package.json` 보유)
- `CodingTest`는 현재 `Greedy` 카테고리만 존재하나 확장 가능
- 이 저장소는 1인 운영이므로 브랜치 전략 없이 `main` 단일 브랜치 사용
