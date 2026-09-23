# テスト仕様: 従業員リソース共通

## 対応設計書

[02-employees-overview.md](../02-employees-overview.md)

## 前提

- ローカルでは Docker Compose で起動する
- 成功応答の包み方は各エンドポイント UT でも検証する

## テストケース

| ID | 種別 | 条件 | 期待結果 |
| --- | --- | --- | --- |
| EO-01 | 手動 | アプリを起動する | ポート `3000` で待ち受ける |
| EO-02 | UT / レビュー | 従業員オブジェクトの JSON | 設計書の項目・型と一致する |
| EO-03 | 手動 / UT | 起動直後の一覧 GET | DB シード 3 件分である |
| EO-04 | UT | 成功応答の形 | `{ "employees": ... }` で包む。配列直返しや `{ "employee": ... }` にしない |
| EO-05 | UT | `npm run test` | 成功する |

## 実行方法

- UT: `npm run test`
- 手動: `docker compose up --build`
