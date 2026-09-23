# テスト仕様: health check

## 対応設計書

[01-health-check.md](../01-health-check.md)

## 前提

- UT はサーバを listen せず、Fastify の `inject` で行う
- 手動確認は `docker compose up --build` 後にホストから HTTP で行う

## テストケース

| ID | 種別 | 条件 | 期待結果 |
| --- | --- | --- | --- |
| HC-01 | UT | `GET /health-check` を `inject` する | ステータス 200、ボディ `{ "message": "success" }` |
| HC-02 | 手動 | コンテナ起動後に `GET http://localhost:3000/health-check` | 同上 |

## 実行方法

- UT: `npm run test`
- 手動: `docker compose up --build` のあと上記 URL を叩く
