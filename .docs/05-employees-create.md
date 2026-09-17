# 従業員追加 POST

## 目的

フロントの作成画面が呼ぶ `POST /api/employees` に相当する API を提供する。

## 対象外

- 編集
- 削除
- 生年月日の入力（作成フォームに無い）
- 通知トースト
- 認証

## 参照するフロント設計

- [05-employee-create.md](../../mui-crud-dashboard/.docs/05-employee-create.md)
- [06-json-server.md](../../mui-crud-dashboard/.docs/06-json-server.md)

## エンドポイント

| 項目 | 値 |
| --- | --- |
| メソッド | POST |
| Fastify パス | `/employees` |
| フロントパス | `/api/employees` |
| 成功 | 201 |
| 成功ボディ | `{ "employees": 採番済みの従業員オブジェクト }` |

フロントの `toEmployeePayload()` が送る JSON を受け取る。`id` は PostgreSQL の IDENTITY が採番する。

### リクエスト

`Content-Type: application/json`

```json
{
  "name": "Ada Lovelace",
  "age": 36,
  "joinDate": "2026-01-15T00:00:00.000Z",
  "role": "Development",
  "isFullTime": true
}
```

| 項目 | 型 | 制約 |
| --- | --- | --- |
| name | string | 前後空白を除いて 1 文字以上 |
| age | number | 正の整数 |
| joinDate | string | ISO 8601。フロントは `YYYY-MM-DDT00:00:00.000Z` |
| role | string | `Market` / `Finance` / `Development` のみ |
| isFullTime | boolean | — |
| id | — | 受け取っても採番結果で上書きする。クライアント指定は採用しない |
| birthDate | string | 任意。無ければ保存しない |

フロントの項目バリデーションは画面側 Zod で行う。API に不正値が来た場合は 400 を返す。

### 成功例

```json
{
  "employees": {
    "id": 4,
    "name": "Ada Lovelace",
    "age": 36,
    "joinDate": "2026-01-15T00:00:00.000Z",
    "role": "Development",
    "isFullTime": true
  }
}
```

`id` はデータベースが採番する。シード最大が 3 なら次は 4。

`name` は保存前に trim する。

### 失敗

| 状況 | ステータス | フロントの扱い |
| --- | --- | --- |
| JSON が読めない / 必須欠落 / 型不正 | 400 | `create-employee` |
| サーバエラー | 500 | `create-employee` |

フロントは送信前にフォームを検証する。API の 400 も `response.ok` が偽なので `create-employee` になる。項目エラー用のレスポンス形はフロントが読まない。

## 受け入れ条件

- 妥当な POST で 201 と `{ "employees": { ... } }` を返す
- 作成後の `GET /employees` の `employees` 配列に追加行が含まれる
- `id` はデータベースが採番する
- 不正なボディは追加せず 400 を返す
- UT は listen せず、Fastify の `inject` で通る
- `npm run test` が成功する

## 次の段階

削除は [06-employees-delete.md](./06-employees-delete.md) を参照する。
