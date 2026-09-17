# 従業員詳細 GET

## 目的

フロントの詳細・更新画面が呼ぶ `GET /api/employees/:id` に相当する API を提供する。

## 対象外

- 詳細画面からの削除
- 生年月日の作成・編集 API（表示用に返すだけ）
- 認証

## 参照するフロント設計

- [12-employee-detail.md](../../mui-crud-dashboard/.docs/12-employee-detail.md)
- [13-employee-edit.md](../../mui-crud-dashboard/.docs/13-employee-edit.md)

## パスパラメータ

| 名前 | 型 | 制約 |
| --- | --- | --- |
| id | 正の整数 | フロントの `parseEmployeeId()` と同じ。整数でない・1 未満は API を呼ばない |

不正な `id` が来た場合のサーバ応答は [08-api-error.md](./08-api-error.md) の 400。

## エンドポイント

| 項目 | 値 |
| --- | --- |
| メソッド | GET |
| Fastify パス | `/employees/:id` |
| フロントパス | `/api/employees/:id` |
| 成功 | 200 |
| 成功ボディ | `{ "employees": 従業員オブジェクト 1 件 }` |
| 未存在 | 404 |

### 成功例

```json
{
  "employees": {
    "id": 1,
    "name": "Edward Perry",
    "age": 25,
    "joinDate": "2025-07-16T00:00:00.000Z",
    "role": "Finance",
    "isFullTime": true,
    "birthDate": "2000-03-12T00:00:00.000Z"
  }
}
```

詳細画面は一覧項目に加えて `birthDate` を出す。シードの 3 件は `birthDate` を持つ。

`birthDate` が無い従業員は、キーを省略するか `null` にしない。省略時、フロントの表示は空文字になる。

### 失敗

| 状況 | ステータス | フロントの扱い |
| --- | --- | --- |
| `id` が正の整数でない | 400 | `load-employee` |
| 該当従業員がいない | 404 | `load-employee` |
| サーバエラー | 500 | `load-employee` |

フロントは `response.ok` が偽なら一律 `load-employee` にする。404 専用画面は出さない（フロント [09-api-error.md](../../mui-crud-dashboard/.docs/09-api-error.md) の対象外）。

## 受け入れ条件

- 存在する `id` で 200 と `{ "employees": { ... } }` を返す
- `employees` に一覧項目と `birthDate` が含まれる（シードデータ）
- 存在しない `id` で 404 を返す
- `{ "employee": ... }` やオブジェクト直返しにはしない
- UT は listen せず、Fastify の `inject` で通る
- `npm run test` が成功する

## 次の段階

追加は [05-employees-create.md](./05-employees-create.md) を参照する。
