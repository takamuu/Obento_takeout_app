class AddColumnUsers < ActiveRecord::Migration[6.1]
  def up
    add_column :users, :kana, :string
    add_column :users, :phone_number, :string
    add_column :users, :status, :integer, default: 0
    add_column :users, :stripe_id, :string
  end

  def down
    remove_column :users, :kana, :string
    remove_column :users, :phone_number, :string
    remove_column :users, :status, :integer, default: 0
    remove_column :users, :stripe_id, :string
  end
end
