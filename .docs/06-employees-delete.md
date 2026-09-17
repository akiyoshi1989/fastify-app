# 従業員削除 DELETE

## 目的

フロントの一覧行削除が呼ぶ `DELETE /api/employees/:id` に相当する API を提供する。

確認モーダルはフロントのみ（[11-employee-delete-confirm.md](../../mui-crud-dashboard/.docs/11-employee-delete-confirm.md)）。確定後にこの API を 1 回呼ぶ。

## 対象外

- 削除確認
- 楽観的更新
- 認証
- カスケード削除（関連リソースは無い）

## 参照するフロント設計

- [10-employee-delete.md](../../mui-crud-dashboard/.docs/10-employee-delete.md)
- [11-employee-delete-confirm.md](../../mui-crud-dashboard/.docs/11-employee-delete-confirm.md)

## パスパラメータ

| 名前 | 型 | 制約 |
| --- | --- | --- |
| id | 正の整数 | 詳細 GET と同じ |

## エンドポイント

| 項目 | 値 |
| --- | --- |
| メソッド | DELETE |
| Fastify パス | `/employees/:id` |
| フロントパス | `/api/employees/:id` |
| 成功 | 200 |
| 成功ボディ | `{ "employees": {} }` |
| 未存在 | 404 |

フロントの `deleteEmployee()` は成功時にボディを読まない。成功時も他と同様に `employees` キーで包み、値は空オブジェクトにする。

### 失敗

| 状況 | ステータス | フロントの扱い |
| --- | --- | --- |
| `id` が正の整数でない | 400 | `delete-employee` |
| 該当従業員がいない | 404 | `delete-employee` |
| サーバエラー | 500 | `delete-employee` |

## 受け入れ条件

- 存在する `id` の DELETE で 200 と `{ "employees": {} }` を返す
- 削除後の `GET /employees` からその行が消える
- 存在しない `id` で 404 を返し、他の行は変えない
- UT は listen せず、Fastify の `inject` で通る
- `npm run test` が成功する

## 次の段階

更新は [07-employees-update.md](./07-employees-update.md) を参照する。
