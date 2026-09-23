# テスト仕様: 従業員追加 POST

## 対応設計書

[05-employees-create.md](../05-employees-create.md)

## 前提

- UT は listen せず Fastify の `inject` で行う

## テストケース

| ID | 種別 | 条件 | 期待結果 |
| --- | --- | --- | --- |
| EC-01 | UT | 妥当なボディで `POST /employees` | 201、`{ "employees": { ... } }`（採番済み） |
| EC-02 | UT | 作成後に `GET /employees` | `employees` 配列に追加行が含まれる |
| EC-03 | UT | 作成レスポンスの `id` | リクエストで指定せず、データベースが採番した値 |
| EC-04 | UT | 不正なボディ | 追加せず 400 |
| EC-05 | UT | `npm run test` | 成功する |

## 実行方法

- UT: `npm run test`
