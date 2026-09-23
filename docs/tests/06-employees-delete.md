# テスト仕様: 従業員削除 DELETE

## 対応設計書

[06-employees-delete.md](../06-employees-delete.md)

## 前提

- UT は listen せず Fastify の `inject` で行う

## テストケース

| ID | 種別 | 条件 | 期待結果 |
| --- | --- | --- | --- |
| EDel-01 | UT | 存在する `id` で `DELETE /employees/:id` | 200、`{ "employees": {} }` |
| EDel-02 | UT | 削除後に `GET /employees` | その行が消えている |
| EDel-03 | UT | 存在しない `id` で DELETE | 404。他の行は変わらない |
| EDel-04 | UT | `npm run test` | 成功する |

## 実行方法

- UT: `npm run test`
