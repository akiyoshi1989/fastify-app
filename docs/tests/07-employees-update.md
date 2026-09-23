# テスト仕様: 従業員更新 PUT

## 対応設計書

[07-employees-update.md](../07-employees-update.md)

## 前提

- UT は listen せず Fastify の `inject` で行う

## テストケース

| ID | 種別 | 条件 | 期待結果 |
| --- | --- | --- | --- |
| EU-01 | UT | 妥当なボディで `PUT /employees/:id` | 200、`{ "employees": { ... } }` |
| EU-02 | UT | 更新後に一覧 GET・詳細 GET | 更新内容が反映されている |
| EU-03 | UT | `birthDate` を含めて PUT | その値が保持される |
| EU-04 | UT | `birthDate` を省略して PUT | 既存の `birthDate` が残る |
| EU-05 | UT | 存在しない `id` | 更新せず 404 |
| EU-06 | UT | 不正なボディ | 更新せず 400 |
| EU-07 | UT | `npm run test` | 成功する |

## 実行方法

- UT: `npm run test`
