# BFS (Breadth-First Search)

BFS는 너비 우선 탐색 알고리즘으로, 가까운 노드부터 차례대로 탐색한다.
BFS는 선입선출 방식의 큐 자료구조를 이용하며, 인접한 노드를 반복적으로 큐에 넣으면서 가까운 노드부터 탐색을 진행한다.

## 탐색 과정

BFS는 큐 자료구조를 이용하며, 탐색 과정은 아래와 같다.

1. 탐색을 시작할 노드를 큐에 삽입하고 방문 처리한다.
2. 큐에서 노드를 꺼낸 뒤, 해당 노드의 인접 노드 중 방문하지 않은 노드를 모두 큐에 삽입하고 방문 처리한다.
3. 2번 과정을 더 이상 수행할 수 없을 때까지 반복한다.

## 구현 예시

아래 코드는 `deque`를 이용해 BFS를 구현한 예시이다.
큐에서 노드를 꺼내면서 가까운 노드부터 차례대로 탐색한다.

```python
from collections import deque

def bfs(graph, start, visited):
    queue = deque([start])
    visited[start] = True

    while queue:
        v = queue.popleft()
        print(v, end=" ")
        for i in graph[v]:
            if not visited[i]:
                queue.append(i)
                visited[i] = True

graph = [
    [],
    [2, 3, 8],
    [1, 7],
    [1, 4, 5],
    [3, 5],
    [3, 4],
    [7],
    [2, 6, 8],
    [1, 7],
]

visited = [False] * 9

bfs(graph, 1, visited)
```
