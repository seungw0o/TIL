# Kruskal

다양한 문제 상황에서 가능한 한 최소한의 비용으로 신장 트리를 찾아야 할 때가 있다.
예를 들어 `N`개의 도시가 존재하는 상황에서, 두 도시 사이에 도로를 놓아 전체 도시가 서로 연결될 수 있게 도로를 설치하는 경우를 생각해보자.
두 도시 `A`, `B`를 선택했을 때 도시 `A`에서 도시 `B`로 이동하는 경로가 반드시 존재하도록 도로를 설치하고자 한다.
모든 도시를 연결할 때 최소한의 비용으로 연결하려면 어떤 알고리즘을 이용해야 할까?

위와 같은 문제처럼 신장 트리 중에서 최소 비용으로 만들 수 있는 신장 트리를 찾는 알고리즘을 최소 신장 트리 알고리즘이라고 한다.
대표적인 최소 신장 트리 알고리즘으로는 크루스칼(`Kruskal`) 알고리즘이 있다.

## 탐색 과정

구체적인 알고리즘을 살펴보면 다음과 같다.

1. 간선 데이터를 비용에 따라 오름차순으로 정렬한다.
2. 간선을 하나씩 확인하며 현재의 간선이 사이클을 발생시키는지 확인한다.
   - 사이클이 발생하지 않는 경우 최소 신장 트리에 포함시킨다.
   - 사이클이 발생하는 경우 최소 신장 트리에 포함시키지 않는다.
3. 모든 간선에 대하여 2번의 과정을 반복한다.

## 구현 예시

```python
def find_parent(parent, x):
    if parent[x] != x:
        parent[x] = find_parent(parent, parent[x])
    return parent[x]

def union_parent(parent, a, b):
    a = find_parent(parent, a)
    b = find_parent(parent, b)
    if a < b:
        parent[b] = a
    else:
        parent[a] = b

v, e = map(int, input().split())
parent = [0] * (v + 1)

edges = []
result = 0

for i in range(1, v + 1):
    parent[i] = i

for _ in range(e):
    a, b, cost = map(int, input().split())
    edges.append((cost, a, b))

edges.sort()

for edge in edges:
    cost, a, b = edge

    if find_parent(parent, a) != find_parent(parent, b):
        union_parent(parent, a, b)
        result += cost

print(result)
```
