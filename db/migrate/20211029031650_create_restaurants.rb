class CreateRestaurants < ActiveRecord::Migration[6.1]
  def change
    create_table :restaurants do |t|
      t.string   :name,           null: false, length: { maximum: 30 }
      t.text     :description,    null: false
      t.decimal  :fee,            null: false, default: 0, numericality: { greater_then: 0 }
      t.integer  :postal_code,    null: false
      t.integer  :prefecture_code
      t.string   :prefecture,     null: false
      t.string   :city,           null: false
      t.string   :block_building, null: false
      t.string   :phone_number,   null: false
      t.datetime :update_time,    null: false
      t.string   :image

      t.timestamps
    end

    add_index :restaurants, :name, unique: true
  end
end
