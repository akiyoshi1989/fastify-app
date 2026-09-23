# Fastify バックエンド

## 目標

従業員リソース向けの Web API を、Fastify で提供する。

## HTTP の共通形

| 項目 | 値 |
| --- | --- |
| ベース URL（ローカル） | `http://localhost:3000` |
| 従業員コレクション | `/employees` |
| 従業員 1 件 | `/employees/:id` |

成功応答は従業員データを `employees` キーで包む。一覧は配列、1 件はオブジェクトを入れる。エラー応答は包まない（[08-api-error.md](./08-api-error.md)）。

## 進め方

1 機能ずつ実装し、機能ごとに UT を追加する。実装は `docs` 配下の設計書に従う。ローカル開発は Docker Compose で行う。

| 段階 | 内容 | 層 | この設計書 |
| --- | --- | --- | --- |
| 1 | health check エンドポイント | HTTP | [01-health-check.md](./01-health-check.md) |
| 2 | Docker ローカル開発（app + PostgreSQL） | 実行環境 | [02-postgres.md](./02-postgres.md) |
| 3 | DB テーブル設計 | DB | [02-db-tables.md](./02-db-tables.md) |
| 4 | 従業員リソース共通 | HTTP + アプリ内 | [02-employees-overview.md](./02-employees-overview.md) |
| 5 | 従業員一覧 GET | HTTP | [03-employees-list.md](./03-employees-list.md) |
| 6 | 従業員詳細 GET | HTTP | [04-employees-detail.md](./04-employees-detail.md) |
| 7 | 従業員追加 POST | HTTP | [05-employees-create.md](./05-employees-create.md) |
| 8 | 従業員削除 DELETE | HTTP | [06-employees-delete.md](./06-employees-delete.md) |
| 9 | 従業員更新 PUT | HTTP | [07-employees-update.md](./07-employees-update.md) |
| 10 | API エラー応答 | HTTP | [08-api-error.md](./08-api-error.md) |

## 共通の対象外

- 認証
- ページネーション / ソート / サーバ側検索
- CORS
- 同時起動用ライブラリ
- 呼び出し側 UI・クライアント実装
