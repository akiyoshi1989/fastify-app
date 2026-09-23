# テスト仕様: API エラー応答

## 対応設計書

[08-api-error.md](../08-api-error.md)

## 前提

- UT は listen せず Fastify の `inject` で行う
- 各エンドポイントの失敗ケースと共通形を検証する

## テストケース

| ID | 種別 | 条件 | 期待結果 |
| --- | --- | --- | --- |
| AE-01 | UT | 存在しない従業員の GET / PUT / DELETE | 404、`{ "message": "Not found" }` |
| AE-02 | UT | 不正なボディの POST / PUT | 400（ボディは `{ "message": "..." }`） |
| AE-03 | UT / レビュー | 成功・エラー応答 | この設計と各エンドポイント設計の形と一致する |
| AE-04 | UT | `npm run test` | 成功する |

## 実行方法

- UT: `npm run test`
