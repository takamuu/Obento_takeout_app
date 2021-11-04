class CreateTemporaryOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :temporary_orders do |t|
      t.references :food,       null: false, foreign_key: true
      t.references :restaurant, null: false, foreign_key: true
      t.references :cart,                    foreign_key: true
      t.integer    :count,      null: false, default: 0
      t.boolean    :active,     null: false, default: false

      t.timestamps
    end
  end
end
