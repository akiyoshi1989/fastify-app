# Fastify バックエンド

## 目標

[mui-crud-dashboard](../../mui-crud-dashboard) の JSON Server を置き換える HTTP API を、Fastify で提供する。


## フロントとの対応

Vite は `/api` を `http://localhost:3001` へプロキシし、先頭の `/api` を除いて転送する。

| フロントが呼ぶパス | Fastify が受けるパス |
| --- | --- |
| `/api/employees` | `/employees` |
| `/api/employees/:id` | `/employees/:id` |

成功応答は従業員データを `employees` キーで包む。一覧は配列、1 件はオブジェクトを入れる。エラー応答は包まない（[08-api-error.md](./08-api-error.md)）。

## 進め方

1 機能ずつ実装し、機能ごとに UT を追加する。実装は `.docs` 配下の設計書に従う。

| 段階 | 内容 | フロント設計 | この設計書 |
| --- | --- | --- | --- |
| 1 | Hello World エンドポイント | — | [01-hello-world.md](./01-hello-world.md) |
| 2 | 従業員リソース | [06-json-server.md](../../mui-crud-dashboard/.docs/06-json-server.md) | [02-employees-overview.md](./02-employees-overview.md) |
| 3 | 従業員一覧 GET | [04-employee-list.md](../../mui-crud-dashboard/.docs/04-employee-list.md) | [03-employees-list.md](./03-employees-list.md) |
| 4 | 従業員詳細 GET | [12-employee-detail.md](../../mui-crud-dashboard/.docs/12-employee-detail.md) | [04-employees-detail.md](./04-employees-detail.md) |
| 5 | 従業員追加 POST | [05-employee-create.md](../../mui-crud-dashboard/.docs/05-employee-create.md) | [05-employees-create.md](./05-employees-create.md) |
| 6 | 従業員削除 DELETE | [10-employee-delete.md](../../mui-crud-dashboard/.docs/10-employee-delete.md) | [06-employees-delete.md](./06-employees-delete.md) |
| 7 | 従業員更新 PUT | [13-employee-edit.md](../../mui-crud-dashboard/.docs/13-employee-edit.md) | [07-employees-update.md](./07-employees-update.md) |
| 8 | API エラー応答 | [09-api-error.md](../../mui-crud-dashboard/.docs/09-api-error.md) | [08-api-error.md](./08-api-error.md) |

削除確認モーダル（フロント [11-employee-delete-confirm.md](../../mui-crud-dashboard/.docs/11-employee-delete-confirm.md)）は画面のみで、API は追加しない。

## 共通の対象外

- 認証
- データベース永続化（ファイル / RDB）
- ページネーション / ソート / サーバ側検索
- CORS（Vite プロキシ経由のため不要）
- 同時起動用ライブラリ
