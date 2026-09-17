# 従業員更新 PUT

## 目的

フロントの更新画面が呼ぶ `PUT /api/employees/:id` に相当する API を提供する。

## 対象外

- 詳細画面からの更新導線
- 生年月日の編集 UI（値は既存を保持して送る）
- 部分更新（PATCH）
- 楽観的更新
- 認証

## 参照するフロント設計

- [13-employee-edit.md](../../mui-crud-dashboard/.docs/13-employee-edit.md)

## パスパラメータ

| 名前 | 型 | 制約 |
| --- | --- | --- |
| id | 正の整数 | 詳細 GET と同じ |

パスの `id` を正とする。ボディに `id` があってもパスと食い違う場合はパスを採用する。

## エンドポイント

| 項目 | 値 |
| --- | --- |
| メソッド | PUT |
| Fastify パス | `/employees/:id` |
| フロントパス | `/api/employees/:id` |
| 成功 | 200 |
| 成功ボディ | 更新後の従業員オブジェクト |
| 未存在 | 404 |

全体置換とする。フロントは GET した従業員を土台に、フォーム項目と既存 `birthDate` を載せて送る。

### リクエスト

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

| 項目 | 型 | 制約 |
| --- | --- | --- |
| name | string | 作成と同じ |
| age | number | 作成と同じ |
| joinDate | string | 作成と同じ |
| role | string | 作成と同じ |
| isFullTime | boolean | 作成と同じ |
| birthDate | string | 任意。フロントは既存値を含める。無ければ既存の `birthDate` を残す |
| id | number | 任意。保存する `id` はパスを使う |

生年月日は画面では表示のみ。API はボディの `birthDate` があればそれを保存し、無ければ更新前の値を維持する。消す操作は提供しない。

### 成功例

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

### 失敗

| 状況 | ステータス | フロントの扱い |
| --- | --- | --- |
| `id` が正の整数でない | 400 | `update-employee` |
| JSON が読めない / 必須欠落 / 型不正 | 400 | `update-employee` |
| 該当従業員がいない | 404 | `update-employee` |
| サーバエラー | 500 | `update-employee` |

更新画面の初期表示失敗は GET 詳細の `load-employee`。PUT 失敗だけが `update-employee`。

## 受け入れ条件

- 妥当な PUT で 200 と更新後の従業員を返す
- 更新後の一覧 GET・詳細 GET に反映される
- `birthDate` を送ったときはその値を保持する
- `birthDate` を省略したときは既存値を残す
- 存在しない `id` は更新せず 404 を返す
- 不正なボディは更新せず 400 を返す
- UT は listen せず、Fastify の `inject` で通る
- `npm run test` が成功する

## 次の段階

エラー応答の共通形は [08-api-error.md](./08-api-error.md) を参照する。
