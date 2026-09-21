# 従業員詳細 GET

## 目的

従業員 1 件を返す `GET /employees/:id` を提供する。

## 対象外

- 認証
- 呼び出し側 UI・クライアント実装

## パスパラメータ

| 名前 | 型 | 制約 |
| --- | --- | --- |
| id | 正の整数 | 整数でない、または 1 未満は 400 |

不正な `id` が来た場合のサーバ応答は [08-api-error.md](./08-api-error.md) の 400。

## エンドポイント

| 項目 | 値 |
| --- | --- |
| メソッド | GET |
| パス | `/employees/:id` |
| 成功 | 200 |
| 成功ボディ | `{ "employees": 従業員オブジェクト 1 件 }` |
| 未存在 | 404 |

### 成功レスポンス例（JSON）

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

DB シードの 3 件は `birth_date` を持つ。応答の `age` は **アプリ内**で `birthDate` から算出する。

`birthDate` が無い従業員は、キーを省略する（`null` にしない）。`age` も `birthDate` が無いときは省略する。

### 失敗レスポンス

| 状況 | ステータス |
| --- | --- |
| `id` が正の整数でない | 400 |
| 該当従業員がいない | 404 |
| サーバエラー | 500 |

## 受け入れ条件

- 存在する `id` で 200 と `{ "employees": { ... } }` を返す
- `employees` に一覧項目と `birthDate` が含まれる（シードデータ）
- 存在しない `id` で 404 を返す
- `{ "employee": ... }` やオブジェクト直返しにはしない
- UT は listen せず、Fastify の `inject` で通る
- `npm run test` が成功する

## 次の段階

追加は [05-employees-create.md](./05-employees-create.md) を参照する。
