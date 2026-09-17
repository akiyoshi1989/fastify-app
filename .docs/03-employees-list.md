# 従業員一覧 GET

## 目的

フロントの従業員テーブルが呼ぶ `GET /api/employees` に相当する API を提供する。

## 対象外

- クエリによる検索・フィルタ・ソート
- ページネーション
- 認証

検索はフロントが取得後に `filterEmployees()` で行う。API は全件を返す。

## 参照するフロント設計

- [04-employee-list.md](../../mui-crud-dashboard/.docs/04-employee-list.md)
- [06-json-server.md](../../mui-crud-dashboard/.docs/06-json-server.md)
- [07-tanstack-query.md](../../mui-crud-dashboard/.docs/07-tanstack-query.md)

## エンドポイント

| 項目 | 値 |
| --- | --- |
| メソッド | GET |
| Fastify パス | `/employees` |
| フロントパス | `/api/employees` |
| 成功 | 200 |
| 成功ボディ | `{ "employees": 従業員オブジェクトの配列 }` |

### 成功例

```json
{
  "employees": [
    {
      "id": 1,
      "name": "Edward Perry",
      "age": 25,
      "joinDate": "2025-07-16T00:00:00.000Z",
      "role": "Finance",
      "isFullTime": true,
      "birthDate": "2000-03-12T00:00:00.000Z"
    }
  ]
}
```

`birthDate` は一覧画面では使わないが、シードに含まれるため返してよい。フロントは未知フィールドを無視する。

空のときは `{ "employees": [] }` を返す。フロントは `employees` 配列を取り出して使う。

### 失敗

サーバエラーは [08-api-error.md](./08-api-error.md) に従い、2xx 以外を返す。フロントは `load-employees` として扱う。

## 受け入れ条件

- `GET /employees` が 200 で `{ "employees": [...] }` を返す
- 起動直後の `employees` はシード 3 件である
- 配列をトップレベルで返さない
- クエリパラメータがなくても全件を返す
- UT は listen せず、Fastify の `inject` で通る
- `npm run test` が成功する

## 次の段階

1 件取得は [04-employees-detail.md](./04-employees-detail.md) を参照する。
