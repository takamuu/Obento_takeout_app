class CreateFoods < ActiveRecord::Migration[6.1]
  def change
    create_table :foods do |t|
      t.references :restaurant,       null: false, foreign_key: true
      t.string     :name,             null: false
      t.text       :food_description, null: false
      t.integer    :price,            null: false
      t.integer    :sales_limit
      t.integer    :sales_status,     null: false 
      t.string     :image

      t.timestamps
    end

    add_index :foods, :name
  end
end
