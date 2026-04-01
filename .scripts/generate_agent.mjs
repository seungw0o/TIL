import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const agentPath = path.join(root, "agent.md");
const useIndex = process.env.SYNC_META_USE_INDEX === "1";
const trackedPaths = useIndex
  ? execFileSync("git", ["ls-files", "--cached", "-z"], {
      cwd: root,
      encoding: "buffer"
    })
      .toString("utf8")
      .split("\u0000")
      .filter(Boolean)
  : null;

const commentMap = {
  "Books": "책 정리 및 독후감",
  "CS": "CS 이론 정리",
  "CodingTest": "코딩 테스트 이론/문제 풀이",
  "CodingTest/DFS-BFS": "DFS/BFS 관련 학습",
  "CodingTest/DFS-BFS/문제": "DFS/BFS 관련 문제 풀이",
  "CodingTest/DFS-BFS/이론": "DFS/BFS 이론 정리",
  "CodingTest/Graph": "그래프 관련 학습",
  "CodingTest/Graph/UnionFind": "Union-Find 관련 학습",
  "CodingTest/Graph/UnionFind/이론": "Union-Find 이론 정리",
  "Language": "언어/프레임워크별 학습 내용",
  "Language/CSS": "CSS 실습 파일",
  "Language/HTML": "HTML 실습 파일",
  "Language/JavaScript": "JavaScript 학습 내용",
  "Language/JavaScript/이론": "JavaScript 이론 정리",
  "Language/React": "React 학습 내용",
  "Language/React/이론": "React 이론 정리",
  "Language/NextJs": "Next.js 학습 내용",
  "Language/NextJs/이론": "Next.js 이론 정리",
  "Language/NextJs/Project": "Next.js 실습 프로젝트",
  "Language/TypeScript": "TypeScript 학습 내용",
  "Language/TypeScript/이론": "TypeScript 이론 정리",
  ".husky": "Git hook 설정",
  ".scripts": "자동화 스크립트",
  ".scripts/generate_agent.mjs": "agent.md 구조 자동 동기화 스크립트",
  ".scripts/generate_tree.sh": "README.md 트리 자동 생성 스크립트",
  ".scripts/readme_template.md": "README 템플릿",
  ".vscode": "워크스페이스 설정",
  ".lintstagedrc.json": "lint-staged 설정",
  ".prettierrc": "Prettier 설정",
  "commitlint.config.js": "commitlint 설정",
  "package.json": "루트 스크립트 및 도구 설정",
  "agent.md": "(이 파일) 프로젝트 컨텍스트 파일",
  "README.md": "자동 생성됨 — 직접 수정 금지"
};

const rootOrder = [
  "Books",
  "CS",
  "CodingTest",
  "Language",
  ".husky",
  ".scripts",
  ".vscode",
  ".lintstagedrc.json",
  ".prettierrc",
  "commitlint.config.js",
  "package.json",
  "agent.md",
  "README.md"
];

const depthMap = {
  "Books": 0,
  "CS": 0,
  "CodingTest": 3,
  "Language": 2,
  ".husky": 0,
  ".scripts": 1,
  ".vscode": 0
};

function normalizeRel(relPath) {
  return relPath.split(path.sep).join("/");
}

function trackedPathExists(relPath) {
  return trackedPaths.some(
    trackedPath =>
      trackedPath === relPath || trackedPath.startsWith(`${relPath}/`)
  );
}

function listEntries(relPath, options = {}) {
  if (useIndex) {
    const { includeFiles = false } = options;
    const prefix = relPath ? `${relPath}/` : "";
    const entryMap = new Map();

    for (const trackedPath of trackedPaths) {
      if (
        relPath &&
        !(trackedPath === relPath || trackedPath.startsWith(prefix))
      ) {
        continue;
      }

      if (!relPath && trackedPath.startsWith(".")) {
        // keep hidden root entries; handled below
      }

      const remainder = relPath
        ? trackedPath.slice(prefix.length)
        : trackedPath;
      if (!remainder || (remainder === trackedPath && relPath)) {
        continue;
      }

      const [entryName, ...rest] = remainder.split("/");
      if (!entryName || entryName === ".DS_Store") {
        continue;
      }

      const isDirectory = rest.length > 0;
      if (!isDirectory && !includeFiles) {
        continue;
      }

      const entryRelPath = relPath ? `${relPath}/${entryName}` : entryName;
      const prev = entryMap.get(entryName);
      entryMap.set(entryName, {
        name: entryName,
        isDirectory: prev?.isDirectory || isDirectory,
        relPath: entryRelPath
      });
    }

    return [...entryMap.values()].sort((a, b) =>
      a.name.localeCompare(b.name, "en")
    );
  }

  const absPath = path.join(root, relPath);
  if (!fs.existsSync(absPath) || !fs.statSync(absPath).isDirectory()) {
    return [];
  }

  const { includeFiles = false } = options;
  const entries = fs
    .readdirSync(absPath, { withFileTypes: true })
    .filter(entry => {
      if (entry.name === ".DS_Store") {
        return false;
      }
      if (entry.isDirectory()) {
        return true;
      }
      return includeFiles;
    })
    .map(entry => ({
      name: entry.name,
      isDirectory: entry.isDirectory(),
      relPath: normalizeRel(path.join(relPath, entry.name))
    }));

  return entries.sort((a, b) => a.name.localeCompare(b.name, "en"));
}

function buildChildren(relPath, depthRemaining) {
  if (depthRemaining <= 0) {
    return [];
  }

  const includeFiles = relPath === ".scripts";
  let children = listEntries(relPath, { includeFiles }).filter(
    entry => entry.isDirectory || relPath === ".scripts"
  );

  if (relPath === "Language") {
    children = children.filter(entry => entry.isDirectory);
  }

  if (relPath === "Language/CSS" || relPath === "Language/HTML") {
    return [];
  }

  if (relPath.startsWith("Language/")) {
    const segments = relPath.split("/");
    if (segments.length === 2) {
      children = children.filter(
        entry => entry.isDirectory && ["이론", "Project"].includes(entry.name)
      );
    }

    if (segments.length >= 3) {
      return [];
    }
  }

  return children.map(entry => ({
    ...entry,
    children: entry.isDirectory
      ? buildChildren(entry.relPath, depthRemaining - 1)
      : []
  }));
}

function buildRootTree() {
  return rootOrder
    .filter(entry =>
      useIndex
        ? trackedPathExists(entry)
        : fs.existsSync(path.join(root, entry))
    )
    .map(entry => {
      const isDirectory = useIndex
        ? trackedPaths.some(trackedPath => trackedPath.startsWith(`${entry}/`))
        : fs.statSync(path.join(root, entry)).isDirectory();
      return {
        name: entry,
        relPath: entry,
        isDirectory,
        children: isDirectory ? buildChildren(entry, depthMap[entry] ?? 0) : []
      };
    });
}

function renderLine(prefix, connector, label, comment) {
  return `${prefix}${connector} ${label}${comment ? ` # ${comment}` : ""}`;
}

function renderNodes(nodes, prefix = "") {
  const lines = [];

  nodes.forEach((node, index) => {
    const isLast = index === nodes.length - 1;
    const connector = isLast ? "└──" : "├──";
    const label = node.isDirectory ? `${node.name}/` : node.name;
    lines.push(renderLine(prefix, connector, label, commentMap[node.relPath]));

    if (node.children.length > 0) {
      const childPrefix = `${prefix}${isLast ? "    " : "│   "}`;
      lines.push(...renderNodes(node.children, childPrefix));
    }
  });

  return lines;
}

function buildStructureBlock() {
  const lines = ["```text", "TIL/"];
  lines.push(...renderNodes(buildRootTree()));
  lines.push("```");
  return lines.join("\n");
}

function walkFiles(startRelPath, matcher) {
  if (useIndex) {
    return trackedPaths
      .filter(
        relPath => relPath.startsWith(`${startRelPath}/`) && matcher(relPath)
      )
      .sort((a, b) => a.localeCompare(b, "en"));
  }

  const startAbsPath = path.join(root, startRelPath);
  const results = [];

  function visit(currentAbsPath, currentRelPath) {
    if (!fs.existsSync(currentAbsPath)) {
      return;
    }

    for (const entry of fs.readdirSync(currentAbsPath, {
      withFileTypes: true
    })) {
      if (entry.name === ".DS_Store") {
        continue;
      }

      const nextAbsPath = path.join(currentAbsPath, entry.name);
      const nextRelPath = normalizeRel(path.join(currentRelPath, entry.name));

      if (entry.isDirectory()) {
        visit(nextAbsPath, nextRelPath);
      } else if (matcher(nextRelPath)) {
        results.push(nextRelPath);
      }
    }
  }

  visit(startAbsPath, startRelPath);
  return results.sort((a, b) => a.localeCompare(b, "en"));
}

function buildPathExamplesBlock() {
  const examples = [];
  const addExample = relPath => {
    if (relPath && !examples.includes(relPath)) {
      examples.push(relPath);
    }
  };

  const codingProblem = walkFiles(
    "CodingTest",
    relPath => relPath.endsWith(".md") && relPath.includes("/문제/")
  )[0];
  const codingTheory = walkFiles(
    "CodingTest",
    relPath => relPath.endsWith(".md") && relPath.includes("/이론/")
  );
  const nestedCodingTheory = codingTheory.find(
    relPath => relPath.split("/").length >= 5
  );
  const languageTheory =
    walkFiles(
      "Language",
      relPath => relPath.endsWith(".md") && relPath.includes("/이론/")
    ).find(relPath => relPath.includes("/TypeScript/이론/")) ||
    walkFiles(
      "Language",
      relPath => relPath.endsWith(".md") && relPath.includes("/이론/")
    )[0];

  addExample(codingProblem);
  addExample(codingTheory[0]);
  addExample(nestedCodingTheory);
  addExample(languageTheory);

  const lines = ["- 현재 예시"];
  for (const example of examples) {
    lines.push(`  - \`${example}\``);
  }

  return lines.join("\n");
}

function buildCodingTestSummaryLine() {
  const notePaths = walkFiles(
    "CodingTest",
    relPath =>
      relPath.endsWith(".md") &&
      (relPath.includes("/이론/") || relPath.includes("/문제/"))
  );

  const categories = [
    ...new Set(
      notePaths.map(relPath => {
        const trimmed = relPath.replace(/^CodingTest\//, "");
        return trimmed.replace(/\/(이론|문제)\/[^/]+\.md$/, "");
      })
    )
  ];

  if (categories.length === 0) {
    return "- `CodingTest`는 현재 별도 학습 구조가 없으며 이후 확장될 수 있음";
  }

  const formatted = categories.map(category => `\`${category}\``).join(", ");
  return `- \`CodingTest\`는 현재 ${formatted} 구조를 사용 중이며 이후 더 확장될 수 있음`;
}

function replaceManagedBlock(content, markerName, replacement) {
  const pattern = new RegExp(
    `(<!-- AUTO-GENERATED:${markerName}:START -->)([\\s\\S]*?)(<!-- AUTO-GENERATED:${markerName}:END -->)`,
    "m"
  );

  if (!pattern.test(content)) {
    throw new Error(`Missing auto-generated marker block: ${markerName}`);
  }

  return content.replace(pattern, `$1\n${replacement}\n$3`);
}

let agentContent = fs.readFileSync(agentPath, "utf8");
agentContent = replaceManagedBlock(
  agentContent,
  "PROJECT_STRUCTURE",
  buildStructureBlock()
);
agentContent = replaceManagedBlock(
  agentContent,
  "PATH_EXAMPLES",
  buildPathExamplesBlock()
);
agentContent = replaceManagedBlock(
  agentContent,
  "CODINGTEST_SUMMARY",
  buildCodingTestSummaryLine()
);

fs.writeFileSync(agentPath, agentContent);
execFileSync("git", ["add", agentPath], { cwd: root });
