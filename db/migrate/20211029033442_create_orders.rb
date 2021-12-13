class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.references :user,                 null: false, foreign_key: true
      t.string     :rceipt_number,        null: false
      t.integer    :total_price,          null: false, default: 0
      t.integer    :consumption_tax,      null: false, default: 0
      t.integer    :progress_status,      null: false, default: 0
      
      t.timestamps
    end
  end
end
