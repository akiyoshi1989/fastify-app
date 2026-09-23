# 従業員追加 POST

## 目的

従業員を追加する `POST /employees` を提供する。

## 対象外

- 編集
- 削除
- 認証
- 呼び出し側 UI・クライアント実装

## エンドポイント

| 項目 | 値 |
| --- | --- |
| メソッド | POST |
| パス | `/employees` |
| 成功 | 201 |
| 成功ボディ | `{ "employees": 採番済みの従業員オブジェクト }` |

リクエストボディの JSON を受け取る。`id` は PostgreSQL の IDENTITY が採番する（**DB**）。

### リクエスト（JSON）

`Content-Type: application/json`

```json
{
  "name": "Ada Lovelace",
  "age": 36,
  "joinDate": "2026-01-15T00:00:00.000Z",
  "role": "Development",
  "isFullTime": true
}
```

| JSON キー | 型 | 制約 | DB / アプリ内 |
| --- | --- | --- | --- |
| name | string | 前後空白を除いて 1 文字以上 | 列 `name` に保存（trim はアプリ内） |
| age | number | 正の整数。受け取ってよい | **DB には書かない。** 応答の `age` は `birthDate` から算出 |
| joinDate | string | ISO 8601（`YYYY-MM-DDT00:00:00.000Z`） | 日付部分を列 `join_date`（DATE）へ |
| role | string | `Market` / `Finance` / `Development` のみ | 対応する `departments.id` を `department_id` に保存 |
| isFullTime | boolean | — | 列 `is_full_time` |
| id | — | 受け取っても採番結果で上書き。クライアント指定は採用しない | IDENTITY |
| birthDate | string | 任意。無ければ送らなくてよい | あれば列 `birth_date` に保存。応答 `age` の算出元 |

不正なボディは 400 を返す。

### 成功レスポンス例（JSON）

```json
{
  "employees": {
    "id": 4,
    "name": "Ada Lovelace",
    "joinDate": "2026-01-15T00:00:00.000Z",
    "role": "Development",
    "isFullTime": true
  }
}
```

`id` はデータベースが採番する。シード最大が 3 なら次は 4。リクエスト例に `birthDate` が無いため、応答にも `age` / `birthDate` は含めない。`birthDate` を送ったときはそれから `age` を算出して返す。

`name` は保存前に trim する（**アプリ内**）。

### 失敗レスポンス

| 状況 | ステータス |
| --- | --- |
| JSON が読めない / 必須欠落 / 型不正 | 400 |
| サーバエラー | 500 |

## テスト仕様

[tests/05-employees-create.md](./tests/05-employees-create.md)

## 次の段階

削除は [06-employees-delete.md](./06-employees-delete.md) を参照する。
