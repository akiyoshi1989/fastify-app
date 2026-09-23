# テスト仕様: 従業員詳細 GET

## 対応設計書

[04-employees-detail.md](../04-employees-detail.md)

## 前提

- UT は listen せず Fastify の `inject` で行う

## テストケース

| ID | 種別 | 条件 | 期待結果 |
| --- | --- | --- | --- |
| ED-01 | UT | 存在する `id` で `GET /employees/:id` | 200、`{ "employees": { ... } }` |
| ED-02 | UT | シードの `id` で取得する | 一覧項目に加え `birthDate` が含まれる |
| ED-03 | UT | 存在しない `id` | 404 |
| ED-04 | UT | 成功ボディの形 | `{ "employee": ... }` やオブジェクト直返しではない |
| ED-05 | UT | `npm run test` | 成功する |

## 実行方法

- UT: `npm run test`
