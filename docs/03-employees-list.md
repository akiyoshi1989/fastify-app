# 従業員一覧 GET

## 目的

従業員一覧を返す `GET /employees` を提供する。

## 対象外

- クエリによる検索・フィルタ・ソート
- ページネーション
- 認証
- 呼び出し側 UI・クライアント実装

API は全件を返す。

## エンドポイント

| 項目 | 値 |
| --- | --- |
| メソッド | GET |
| パス | `/employees` |
| 成功 | 200 |
| 成功ボディ | `{ "employees": 従業員オブジェクトの配列 }`（オブジェクト形は [02-employees-overview.md](./02-employees-overview.md)） |

### 成功レスポンス例（JSON）

```json
{
  "employees": [
    {
      "id": 1,
      "name": "Edward Perry",
      "age": 25,
      "joinDate": "2025-07-16T00:00:00.000Z",
      "role": "Finance",
      "isFullTime": true,
      "birthDate": "2000-03-12T00:00:00.000Z"
    }
  ]
}
```

- DB シードに `birth_date` がある行は、HTTP でも `birthDate` を含めてよい。
- 応答の `age` は **DB 列ではなくアプリ内で算出**する（[02-employees-overview.md](./02-employees-overview.md)）。
- 空のときは `{ "employees": [] }` を返す。

### 失敗レスポンス

サーバエラーは [08-api-error.md](./08-api-error.md) に従い、2xx 以外を返す。

## テスト仕様

[tests/03-employees-list.md](./tests/03-employees-list.md)

## 次の段階

1 件取得は [04-employees-detail.md](./04-employees-detail.md) を参照する。
