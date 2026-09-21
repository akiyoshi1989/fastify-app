# health check エンドポイント

## 目的

Fastify サーバを起動し、疎通確認用のエンドポイントを用意する。

## 対象外

- 認証
- データベース
- CORS
- 追加のフレームワークやテストランナーの導入

## 技術スタック

| 用途 | 採用 |
| --- | --- |
| サーバ | Fastify |
| 言語 | TypeScript |
| 実行 | tsx |
| 単体テスト | Node.js 組み込みの `node:test` |

## 構成

- アプリ生成は `src/app.ts` の `buildApp()` に分離する
- 起動は `src/index.ts` が `listen` する
- ポートは `3000`

## エンドポイント

| メソッド | パス | ステータス | レスポンス JSON |
| --- | --- | --- | --- |
| GET | `/health-check` | 200 | `{ "message": "success" }` |

## 起動

1. `docker compose up --build` で Fastify コンテナを起動する
2. `GET http://localhost:3000/health-check` で疎通を確認する

ホストで試すときだけ `npm run dev` を使ってよい。UT はホストで `npm run test` する。

## 受け入れ条件

- `GET /health-check` が `{ "message": "success" }` を返す
- UT はサーバを listen せず、Fastify の `inject` で通る
- `npm run test` が成功する
