# API エラー応答

## 目的

従業員 API の失敗時ステータスとボディ形をそろえる。

フロントはエラーボディを表示に使わない。`response.ok` が偽なら、呼び出し元ごとのコードで [ErrorPage](../../mui-crud-dashboard/.docs/09-api-error.md) を出す。

## 対象外

- フロントのフォーム項目バリデーション
- フロント専用の 404 画面
- 認証エラー

## 参照するフロント設計

- [09-api-error.md](../../mui-crud-dashboard/.docs/09-api-error.md)

## フロントが付けるコード

API はこれらの文字列を返さない。フロントの `EmployeeApiError` が HTTP 失敗をコードに変換する。

| 失敗した呼び出し | コード | 画面の表示文 |
| --- | --- | --- |
| GET `/api/employees` | `load-employees` | 従業員一覧を取得できませんでした |
| GET `/api/employees/:id` | `load-employee` | 従業員を取得できませんでした |
| POST `/api/employees` | `create-employee` | 従業員を追加できませんでした |
| PUT `/api/employees/:id` | `update-employee` | 従業員を更新できませんでした |
| DELETE `/api/employees/:id` | `delete-employee` | 従業員を削除できませんでした |

不正な `employeeId` でフロントが API を呼ばない場合の表示（「従業員 ID が無効です」）は画面側の話で、API の対象外。

## サーバのステータス

| 状況 | ステータス | 使う操作 |
| --- | --- | --- |
| パスの `id` が正の整数でない | 400 | GET 詳細 / PUT / DELETE |
| リクエスト JSON が不正、必須欠落、型・列挙不正 | 400 | POST / PUT |
| 指定 `id` の従業員がいない | 404 | GET 詳細 / PUT / DELETE |
| 想定外の失敗 | 500 | すべて |

成功は各エンドポイントの 200 / 201 のみ。フロントは 2xx 以外をすべて失敗として扱う。

## エラーボディ

JSON Server の `{ "message": "Not found" }` に合わせ、次の形にする。

```json
{
  "message": "Not found"
}
```

| ステータス | message の例 |
| --- | --- |
| 400 | `Bad request` |
| 404 | `Not found` |
| 500 | `Internal server error` |

フロントは `message` をユーザーに出さない。サーバログとデバッグ用。

## 受け入れ条件

- 存在しない従業員の GET / PUT / DELETE が 404 と `{ "message": "Not found" }` を返す
- 不正なボディの POST / PUT が 400 を返す
- 成功応答とエラー応答の形がこの設計と各エンドポイント設計に一致する
- UT は listen せず、Fastify の `inject` で通る
- `npm run test` が成功する
