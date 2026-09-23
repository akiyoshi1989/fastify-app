# テスト仕様: Docker ローカル開発

## 対応設計書

[02-postgres.md](../02-postgres.md)

## 前提

- Docker / Compose が使えること
- スキーマをやり直す場合は `docker compose down -v` してから起動する
- UT はコンテナを起動せずホストで通す

## テストケース

| ID | 種別 | 条件 | 期待結果 |
| --- | --- | --- | --- |
| PG-01 | 手動 | `docker compose up --build` | `app` と `db` が起動する |
| PG-02 | 手動 | 起動後に `GET http://localhost:3000/health-check` | `{ "message": "success" }` |
| PG-03 | 手動 | `app` コンテナの環境変数を確認する | `DATABASE_URL` が `db` ホスト向けである |
| PG-04 | 手動 | 初回起動後に `employees` / `departments` / `positions` を確認する | 各テーブルにシード 3 件がある |
| PG-05 | 手動 / コード確認 | 従業員 API の読み書き先 | メモリではなく `employees` テーブルである |
| PG-06 | UT | ホストで `npm run test` | コンテナなしで成功する |

## 実行方法

- 手動: `docker compose up --build`
- UT: `npm run test`
