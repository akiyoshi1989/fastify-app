# テスト仕様: 従業員一覧 GET

## 対応設計書

[03-employees-list.md](../03-employees-list.md)

## 前提

- UT は listen せず Fastify の `inject` で行う
- リポジトリはモックまたはテスト用実装に差し替えてよい

## テストケース

| ID | 種別 | 条件 | 期待結果 |
| --- | --- | --- | --- |
| EL-01 | UT | `GET /employees` | 200、ボディ `{ "employees": [...] }` |
| EL-02 | UT / 手動 | 起動直後（シード投入後） | `employees` 配列が 3 件 |
| EL-03 | UT | 成功ボディのトップレベル | 配列ではない（オブジェクトで `employees` キーを持つ） |
| EL-04 | UT | クエリなしで `GET /employees` | 全件を返す |
| EL-05 | UT | `npm run test` | 成功する |

## 実行方法

- UT: `npm run test`
