# 従業員更新 PUT

## 目的

従業員 1 件を更新する `PUT /employees/:id` を提供する。

## 対象外

- 部分更新（PATCH）
- 楽観的更新
- 認証
- 呼び出し側 UI・クライアント実装

## パスパラメータ

| 名前 | 型 | 制約 |
| --- | --- | --- |
| id | 正の整数 | 詳細 GET と同じ |

パスの `id` を正とする。ボディに `id` があってもパスと食い違う場合はパスを採用する。

## エンドポイント

| 項目 | 値 |
| --- | --- |
| メソッド | PUT |
| パス | `/employees/:id` |
| 成功 | 200 |
| 成功ボディ | `{ "employees": 更新後の従業員オブジェクト }` |
| 未存在 | 404 |

全体置換とする。

### リクエスト（JSON）

`Content-Type: application/json`

```json
{
  "id": 1,
  "name": "Ada Lovelace",
  "age": 36,
  "joinDate": "2026-01-15T00:00:00.000Z",
  "role": "Development",
  "isFullTime": false,
  "birthDate": "2000-03-12T00:00:00.000Z"
}
```

| JSON キー | 型 | 制約 | DB / アプリ内 |
| --- | --- | --- | --- |
| name | string | 作成と同じ | 列 `name` |
| age | number | 作成と同じ | **DB には書かない。** 応答は `birthDate` から算出 |
| joinDate | string | 作成と同じ | 列 `join_date` |
| role | string | 作成と同じ | `department_id` へ解決 |
| isFullTime | boolean | 作成と同じ | 列 `is_full_time` |
| birthDate | string | 任意 | あれば列 `birth_date` を更新。無ければ **既存の DB 値を維持**（消す操作は提供しない） |
| id | number | 任意 | 保存する `id` はパスを使う |

### 成功レスポンス例（JSON）

```json
{
  "employees": {
    "id": 1,
    "name": "Ada Lovelace",
    "age": 36,
    "joinDate": "2026-01-15T00:00:00.000Z",
    "role": "Development",
    "isFullTime": false,
    "birthDate": "2000-03-12T00:00:00.000Z"
  }
}
```

### 失敗レスポンス

| 状況 | ステータス |
| --- | --- |
| `id` が正の整数でない | 400 |
| JSON が読めない / 必須欠落 / 型不正 | 400 |
| 該当従業員がいない | 404 |
| サーバエラー | 500 |

## 受け入れ条件

- 妥当な PUT で 200 と `{ "employees": { ... } }` を返す
- 更新後の一覧 GET・詳細 GET に反映される
- `birthDate` を送ったときはその値を保持する
- `birthDate` を省略したときは既存値を残す
- 存在しない `id` は更新せず 404 を返す
- 不正なボディは更新せず 400 を返す
- UT は listen せず、Fastify の `inject` で通る
- `npm run test` が成功する

## 次の段階

エラー応答の共通形は [08-api-error.md](./08-api-error.md) を参照する。
