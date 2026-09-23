# テスト仕様: DB テーブル

## 対応設計書

[02-db-tables.md](../02-db-tables.md)

## 前提

- 正は `db/init.sql` と設計書
- 初回起動時に init SQL が流れること（ボリュームを消してから起動）

## テストケース

| ID | 種別 | 条件 | 期待結果 |
| --- | --- | --- | --- |
| DB-01 | 手動 | `\dt` でテーブル一覧を確認する | `departments` / `positions` / `employees` の 3 つがある |
| DB-02 | 手動 | `\d` で各テーブル定義を確認する | 3 テーブルすべてに `created_at` / `updated_at`（`TIMESTAMPTZ`）がある |
| DB-03 | 手動 | `\d departments` / `\d positions` | `valid_from` / `valid_to`（`DATE`）と期間の `CHECK` がある |
| DB-04 | 手動 | `\d employees` | `department_id` → `departments.id`、`position_id` → `positions.id` の FK がある |
| DB-05 | 手動 | 行を UPDATE する | `updated_at` がトリガーで更新される |
| DB-06 | 手動 | 初回起動後に件数を確認する | 各テーブルにシード 3 件がある |
| DB-07 | 手動 | 列型を確認する | `join_date` / `birth_date` / `valid_from` / `valid_to` は `DATE` |
| DB-08 | レビュー | スキーマを変更する | `db/init.sql` と設計書を同時に直している |

## 実行方法

```sh
docker compose down -v
docker compose up -d
docker compose exec -T db psql -U user -d fastify_app -c '\dt'
```
