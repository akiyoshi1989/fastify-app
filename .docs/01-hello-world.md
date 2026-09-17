# Hello World エンドポイント

## 目的

Fastify サーバを起動し、Hello World を返すエンドポイントを用意する。

## 対象外

- 認証
- データベース
- CORS
- 追加のフレームワークやテストランナーの導入

## 技術スタック

| 用途 | 採用 |
| --- | --- |
| HTTP サーバ | Fastify |
| 言語 | TypeScript |
| 実行 | tsx |
| 単体テスト | Node.js 組み込みの `node:test` |

## 構成

- アプリ生成は `src/app.ts` の `buildApp()` に分離する
- 起動は `src/index.ts` が `listen` する
- ポートは `3000`

## エンドポイント

| メソッド | パス | ステータス | レスポンス |
| --- | --- | --- | --- |
| GET | `/` | 200 | `{ "message": "Hello World" }` |

## 起動

1. `npm run dev` で開発サーバを起動する
2. `GET http://localhost:3000/` で Hello World を取得する

## 受け入れ条件

- `GET /` が `{ "message": "Hello World" }` を返す
- UT はサーバを listen せず、Fastify の `inject` で通る
- `npm run test` が成功する
