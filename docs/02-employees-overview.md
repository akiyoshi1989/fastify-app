# 従業員リソース

## 目的

従業員 API の共通仕様（リソース・ポート・パス・応答の包み方）を固定する。

以降のエンドポイント設計は、このドキュメントを前提にする。永続化は [02-postgres.md](./02-postgres.md) の PostgreSQL コンテナを使う。テーブル定義は [02-db-tables.md](./02-db-tables.md)。

## 対象外

- 各 HTTP メソッドの詳細（後続ドキュメント）
- 認証
- ページネーション API
- 呼び出し側 UI・クライアント実装

## 構成

- サーバは `http://localhost:3000` で listen する
- health check（[01-health-check.md](./01-health-check.md)）も同じプロセスで提供する
- ローカルでは [02-postgres.md](./02-postgres.md) の Docker Compose（`app` + `db`）で起動する
- リソース名は `employees`
- Fastify のパスは `/employees` と `/employees/:id`
- 永続化先は PostgreSQL の `employees` テーブル。部署は `departments`、役職は `positions`（詳細は [02-db-tables.md](./02-db-tables.md)）
- `id` はデータベースの IDENTITY が採番する。HTTP 応答の `id` として返す
- 応答は JSON。`Content-Type` は `application/json`
- 成功応答は `{ "employees": ... }` で包む。一覧は配列、詳細・作成・更新は従業員オブジェクト 1 件、削除は空オブジェクト
- リクエストボディは従業員フィールドを直接送る（`employees` では包まない）

## HTTP 契約: 従業員オブジェクト（JSON）

ワイヤ上の JSON 形であり、DB 列定義ではない。

| JSON キー | 型 | 必須 | 層の扱い | 説明 |
| --- | --- | --- | --- | --- |
| id | number（正の整数） | 応答では必須 | HTTP ← DB | DB 採番。作成リクエストには含めない |
| name | string | 必須 | HTTP ↔ DB | 氏名。列 `name` |
| age | number（正の整数） | `birthDate` があるとき必須 | アプリ内 → HTTP | DB 列はない。`birthDate`（DB の `birth_date`）からアプリが算出 |
| joinDate | ISO 8601 文字列 | 必須 | HTTP ↔ DB | 入社日。列 `join_date`（DATE）。HTTP では `YYYY-MM-DDT00:00:00.000Z` |
| role | `"Market"` / `"Finance"` / `"Development"` | 必須 | HTTP ← DB | 部署名。`departments.name` を JOIN して返す |
| isFullTime | boolean | 必須 | HTTP ↔ DB | 正社員。列 `is_full_time` |
| birthDate | ISO 8601 文字列 | 任意 | HTTP ↔ DB | 生年月日。列 `birth_date`。無ければキー省略。`age` の算出元 |

日付は HTTP では UTC 午前零時の ISO 8601（`...T00:00:00.000Z`）とする。DB では `DATE` として保持する（[02-db-tables.md](./02-db-tables.md)）。変換はアプリ内。

### アプリ内ルール

- リクエスト JSON に `age` が含まれていても DB には書かない
- 応答の `age` は、応答生成時に `birthDate` / `birth_date` から都度算出する
- `birthDate` が無いときは応答から `age` キーを省略する
- 日付ライブラリ（`date-fns`）でパース・整形・年齢算出を行う

## HTTP 応答例に使うシード相当データ

DB シードの正は [02-db-tables.md](./02-db-tables.md) と `db/init.sql`。下表は、その 3 件を HTTP JSON 形で見たときの例である。`age` は基準日 `2025-12-01` での算出例。

| id | name | age（算出例） | joinDate | role | isFullTime | birthDate |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Edward Perry | 25 | 2025-07-16T00:00:00.000Z | Finance | true | 2000-03-12T00:00:00.000Z |
| 2 | Josephine Drake | 36 | 2025-07-16T00:00:00.000Z | Market | false | 1989-11-04T00:00:00.000Z |
| 3 | Cody Phillips | 19 | 2025-07-16T00:00:00.000Z | Development | true | 2006-08-21T00:00:00.000Z |

## エンドポイント一覧

| メソッド | パス | 設計書 |
| --- | --- | --- |
| GET | `/employees` | [03-employees-list.md](./03-employees-list.md) |
| GET | `/employees/:id` | [04-employees-detail.md](./04-employees-detail.md) |
| POST | `/employees` | [05-employees-create.md](./05-employees-create.md) |
| DELETE | `/employees/:id` | [06-employees-delete.md](./06-employees-delete.md) |
| PUT | `/employees/:id` | [07-employees-update.md](./07-employees-update.md) |

失敗時のステータスとボディは [08-api-error.md](./08-api-error.md) に従う。

## テスト仕様

[tests/02-employees-overview.md](./tests/02-employees-overview.md)

## 次の段階

一覧取得は [03-employees-list.md](./03-employees-list.md) を参照する。
