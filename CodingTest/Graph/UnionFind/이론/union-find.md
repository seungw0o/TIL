# Union-Find (Disjoint Set)

Disjoint Set는 서로소 집합이라고 불리는 자료구조이다. 서로소 집합 자료구조는 서로소 부분 집합들로 나누어진 원소들의 데이터를 처리하기 위한 자료구조이며, `union`과 `find` 두 개의 연산으로 조작할 수 있다.

`union`(합집합) 연산은 두 원소가 포함된 집합을 하나의 집합으로 합치는 연산이다. `find`(찾기) 연산은 특정 원소가 속한 집합이 어떤 집합인지 알려주는 연산이다.

이 자료구조는 `union`과 `find` 연산을 사용하므로 Union-Find라고도 불린다.

## 동작 과정

서로소 집합 자료구조는 트리 자료구조를 이용해 집합을 표현한다.

1. `union` 연산을 확인하여 서로 연결된 두 노드 `A`, `B`를 확인한다.

- `A`와 `B`의 루트 노드 `a`, `b`를 각각 찾는다.
- `a`를 `b`의 부모 노드로 설정한다. (`b`가 `a`를 가리키도록 한다.)

2. 모든 `union`(합집합) 연산을 처리할 때까지 1번 과정을 반복한다.

## 구현 예시

실제로 구현할 때는 `a`와 `b` 중에서 더 번호가 작은 원소가 부모 노드가 되도록 구현하는 경우가 많다. 아래 예시도 이러한 방식을 따른다.

```python
def find_parent(parent, x):
  # 루트 노드를 찾을 때까지 재귀적으로 호출
  if parent[x] != x:
    return find_parent(parent, parent[x])
  return x

def union_parent(parent, a, b):
  # 두 원소의 루트 노드를 찾기
  a = find_parent(parent,a)
  b = find_parent(parent,b)

  # 더 작은 번호를 부모 노드로 설정
  if a < b:
    parent[b] = a
  else:
    parent[a] = b

v, e = map(int, input().split())

# 부모 테이블 초기화
parent = [0] * (v+1)

# 부모를 자기 자신으로 초기화
for i in range(1, v+1):
  parent[i] = i

# union 연산 수행
for i in range(e):
  a,b = map(int, input().split())
  union_parent(parent, a, b)

# 각 원소가 속한 집합 출력
print('각 원소가 속한 집합: ', end=' ')
for i in range(i, v + 1):
  print(find_parent(parent,i), end=' ')

print()

# 부모 테이블 내용 출력
print('부모 테이블: ', end=' ')
for i in range(1, v + 1):
  print(parent[i], end=' ')
```
