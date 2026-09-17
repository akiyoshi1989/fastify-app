# 従業員リソース

## 目的

`mui-crud-dashboard` 向け従業員 API の共通仕様（リソース・ポート・パス・応答の包み方）を固定する。

以降のエンドポイント設計は、このドキュメントを前提にする。JSON Server の配列直返しは踏襲しない。

## 対象外

- 各 HTTP メソッドの詳細（後続ドキュメント）
- 認証
- データベース
- ページネーション API

## 参照するフロント設計

- [06-json-server.md](../../mui-crud-dashboard/.docs/06-json-server.md)
- [04-employee-list.md](../../mui-crud-dashboard/.docs/04-employee-list.md)
- [07-tanstack-query.md](../../mui-crud-dashboard/.docs/07-tanstack-query.md)

## 構成

- サーバは `http://localhost:3001` で listen する（JSON Server と同じ）
- Hello World（[01-hello-world.md](./01-hello-world.md)）も同じプロセスで提供する。従業員 API 導入時にポートを `3000` から `3001` へ合わせる
- リソース名は `employees`
- Fastify のパスは `/employees` と `/employees/:id`（Vite が `/api` を除去したあとのパス）
- データはプロセス内メモリで持つ。起動時にシードを載せる
- `id` はサーバが採番する（既存の最大 `id` + 1）
- 応答は JSON。`Content-Type` は `application/json`
- 成功応答は `{ "employees": ... }` で包む。一覧は配列、詳細・作成・更新は従業員オブジェクト 1 件、削除は空オブジェクト
- リクエストボディは従業員フィールドを直接送る（`employees` では包まない）

## 従業員オブジェクト

フロントの `Employee` と同じ項目にする。公式テンプレートと同じ項目に、詳細用の生年月日を足す。

| 項目 | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| id | number（正の整数） | 応答では必須 | サーバ採番。作成リクエストには含めない |
| name | string | 必須 | 氏名 |
| age | number（正の整数） | 必須 | 年齢 |
| joinDate | ISO 8601 文字列 | 必須 | 入社日。フロントは `YYYY-MM-DD` を `YYYY-MM-DDT00:00:00.000Z` にして送る |
| role | `"Market"` / `"Finance"` / `"Development"` | 必須 | 部署。画面上の表示名は Department |
| isFullTime | boolean | 必須 | 正社員かどうか |
| birthDate | ISO 8601 文字列 | 任意 | 生年月日。一覧画面では出さないが、詳細・更新で使う |

日付はフロントが先頭 10 文字 `YYYY-MM-DD` を表示するため、`...T00:00:00.000Z` 形式を維持する。

## シード

`mui-crud-dashboard/src/data/db.json` と同じ 3 件を起動時に載せる。

| id | name | age | joinDate | role | isFullTime | birthDate |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Edward Perry | 25 | 2025-07-16T00:00:00.000Z | Finance | true | 2000-03-12T00:00:00.000Z |
| 2 | Josephine Drake | 36 | 2025-07-16T00:00:00.000Z | Market | false | 1989-11-04T00:00:00.000Z |
| 3 | Cody Phillips | 19 | 2025-07-16T00:00:00.000Z | Development | true | 2006-08-21T00:00:00.000Z |

## フロントが使う操作

| メソッド | Fastify パス | フロント関数 | 設計書 |
| --- | --- | --- | --- |
| GET | `/employees` | `getEmployees()` | [03-employees-list.md](./03-employees-list.md) |
| GET | `/employees/:id` | `getEmployee()` | [04-employees-detail.md](./04-employees-detail.md) |
| POST | `/employees` | `createEmployee()` | [05-employees-create.md](./05-employees-create.md) |
| DELETE | `/employees/:id` | `deleteEmployee()` | [06-employees-delete.md](./06-employees-delete.md) |
| PUT | `/employees/:id` | `updateEmployee()` | [07-employees-update.md](./07-employees-update.md) |

フロントは成功時に `employees` を取り出す。失敗は `response.ok` が偽なら [08-api-error.md](./08-api-error.md) のステータスとして扱う。

## 受け入れ条件

- ポート `3001` で起動できる
- 従業員オブジェクトの項目と型がフロントの `Employee` と一致する
- 起動直後の一覧がシード 3 件である
- 成功応答を `{ "employees": ... }` で包む（配列直返しや `{ "employee": ... }` にはしない）
- `npm run test` が成功する

## 次の段階

一覧取得は [03-employees-list.md](./03-employees-list.md) を参照する。
