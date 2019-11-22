# ChatSpace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, add_index|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :groups_users
- has_many :users, through: :groups_users
- has_many :messages

## group_usersテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|references|foreign_key: true|
|user_id|references|foreign_key: true|
### Association
- belong_to :user
- belong_to :group


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|references|foreign_key: true|
|user_id|references|foreign_key: true|
### Association
- belong_to :user
- belong_to :group